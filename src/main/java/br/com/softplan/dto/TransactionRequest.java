package br.com.softplan.dto;


import br.com.softplan.transaction.TransactionType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigInteger;

public record TransactionRequest(
        @NotNull
        BigInteger valor,

        @NotNull
        TransactionType tipo,

        @NotNull
        String descricao
) {

}
