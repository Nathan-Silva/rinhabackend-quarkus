package br.com.softplan.dto;

import java.math.BigInteger;
import java.time.LocalDateTime;

public record ExtractTransactionResponse(
        BigInteger valor,

        String tipo,

        String descricao,

        LocalDateTime realizada_em
) {
}
