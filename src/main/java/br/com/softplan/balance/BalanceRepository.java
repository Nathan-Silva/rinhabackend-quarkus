package br.com.softplan.balance;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class BalanceRepository implements PanacheRepository<Balance> {

    public Balance findByCustomerId(Long customerId){
        return find("customerId", customerId).firstResult();
    }
}
