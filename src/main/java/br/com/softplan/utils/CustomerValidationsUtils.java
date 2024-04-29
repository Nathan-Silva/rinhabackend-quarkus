package br.com.softplan.utils;

import br.com.softplan.exceptions.CustomerNotFoundException;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CustomerValidationsUtils {

    public void validateCustomer(Long id) {
        if (id < 1 || id > 5)
            throw new CustomerNotFoundException(404, "Customer Not Found");
    }
}
