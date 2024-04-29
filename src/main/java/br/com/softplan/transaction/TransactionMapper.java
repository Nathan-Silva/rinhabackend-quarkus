package br.com.softplan.transaction;

import br.com.softplan.dto.TransactionRequest;

public class TransactionMapper {

    public static Transaction toEntity(TransactionRequest transactionRequest){
        return Transaction.builder()
                .valor(transactionRequest.valor())
                .tipo(transactionRequest.tipo().getType())
                .descricao(transactionRequest.descricao())
                .build();
    }

}
