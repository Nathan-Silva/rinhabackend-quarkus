package br.com.softplan.balance;

import br.com.softplan.dto.BalanceResponse;
import br.com.softplan.dto.ExtractResponse;
import br.com.softplan.dto.ExtractTransactionResponse;
import br.com.softplan.transaction.TransactionRepository;
import br.com.softplan.utils.CustomerValidationsUtils;
import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@ApplicationScoped
public class BalanceService {

    @Inject
    TransactionRepository transactionRepository;

    @Inject
    BalanceRepository balanceRepository;

    @Inject
    CustomerValidationsUtils customerValidationsUtils;


    public ExtractResponse getExtract(Long customerId) {
        customerValidationsUtils.validateCustomer(customerId);

        var balance = balanceRepository.findByCustomerId(customerId);
        var transactionList = transactionRepository.find("customerId", Sort.by("id").descending(), customerId).page(Page.ofSize(10));

        return new ExtractResponse(
                new BalanceResponse(balance.getTotal(), LocalDateTime.now(), balance.getLimite()),
                transactionList.stream()
                        .map(transaction -> new ExtractTransactionResponse(transaction.getValor(), transaction.getTipo(), transaction.getDescricao(), transaction.getCreateDate()))
                        .collect(Collectors.toList())
        );
    }
}