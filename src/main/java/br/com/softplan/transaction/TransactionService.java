package br.com.softplan.transaction;

import br.com.softplan.balance.Balance;
import br.com.softplan.balance.BalanceRepository;
import br.com.softplan.dto.TransactionRequest;
import br.com.softplan.dto.TransactionResponse;
import br.com.softplan.exceptions.InsufficientBalanceException;
import br.com.softplan.exceptions.PayloadValidateException;
import br.com.softplan.utils.CustomerValidationsUtils;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.StringUtils;

@ApplicationScoped
public class TransactionService {

    @Inject
    TransactionRepository transactionRepository;

    @Inject
    BalanceRepository balanceRepository;

    @Inject
    CustomerValidationsUtils customerValidationsUtils;

    @Transactional
    public TransactionResponse createTransaction(Long id, TransactionRequest transactionRequest) {
        customerValidationsUtils.validateCustomer(id);
        validateRequest(transactionRequest);

        Transaction transactionEntity = TransactionMapper.toEntity(transactionRequest);
        transactionEntity.setCustomerId(id);
        transactionRepository.persist(transactionEntity);

        Balance balance = balanceRepository.findByCustomerId(id);

        if (isDebitTransaction(transactionRequest))
            balance = this.makeDebitTransaction(balance, transactionRequest);
        else
            balance = this.makeReceivableTransaction(balance, transactionRequest);

        balanceRepository.persist(balance);

        return new TransactionResponse(balance.getLimite(), balance.getTotal());
    }

    public boolean isDebitTransaction(TransactionRequest transactionRequest) {
        return transactionRequest.tipo().getType().equalsIgnoreCase("D");
    }

    public Balance makeDebitTransaction(Balance balance, TransactionRequest transactionRequest) {
        validateInsufficientFounds(balance, transactionRequest);
        balance.setTotal(balance.getTotal().subtract(transactionRequest.valor()));
        return balance;
    }

    public Balance makeReceivableTransaction(Balance balance, TransactionRequest transactionRequest) {
        validateInsufficientFounds(balance, transactionRequest);
        balance.setTotal(transactionRequest.valor().add(balance.getTotal()));
        return balance;
    }

    public void validateInsufficientFounds(Balance balance, TransactionRequest transactionRequest) {
        var result = transactionRequest.valor().compareTo(balance.getTotal().add(balance.getLimite()));
        if (result > 0)
            throw new InsufficientBalanceException(422, "Insufficient Found");
    }

    public void validateRequest(TransactionRequest transactionRequest) {
        if (StringUtils.isBlank(transactionRequest.descricao()) || transactionRequest.descricao().length() > 10) {
            throw new PayloadValidateException(422, "Description field outside specifications");
        }

        if (!transactionRequest.tipo().getType().equalsIgnoreCase("D")
                && !transactionRequest.tipo().getType().equalsIgnoreCase("R")) {
            throw new PayloadValidateException(422, "Type field outside specifications");
        }
    }
}
