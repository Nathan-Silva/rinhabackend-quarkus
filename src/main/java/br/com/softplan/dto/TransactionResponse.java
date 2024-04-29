package br.com.softplan.dto;

import java.math.BigInteger;

public record TransactionResponse(
        BigInteger limite,

        BigInteger saldo
) {
}
