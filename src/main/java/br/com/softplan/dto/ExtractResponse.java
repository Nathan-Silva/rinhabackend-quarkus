package br.com.softplan.dto;

import java.util.List;

public record ExtractResponse(
        BalanceResponse saldo,

        List<ExtractTransactionResponse> ultimas_transacoes
) {
}
