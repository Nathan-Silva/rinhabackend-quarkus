package br.com.softplan.transaction;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "customer_id")
    Long customerId;

    BigInteger valor;

    String tipo;

    String descricao;

    @Builder.Default
    @Column(name = "realizada_em")
    LocalDateTime createDate = LocalDateTime.now();
}
