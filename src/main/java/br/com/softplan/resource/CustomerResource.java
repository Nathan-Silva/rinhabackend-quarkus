package br.com.softplan.resource;

import br.com.softplan.balance.BalanceService;
import br.com.softplan.dto.TransactionRequest;
import br.com.softplan.transaction.TransactionService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("clientes")
@ApplicationScoped
public class CustomerResource {

    static final Logger LOGGER = LoggerFactory.getLogger(CustomerResource.class);

    @Inject
    TransactionService transactionService;

    @Inject
    BalanceService balanceService;

    @POST
    @Path("{id}/transacoes")

    @Consumes(MediaType.APPLICATION_JSON)
    public Response createTransaction(@PathParam("id") Long id, @Valid @RequestBody TransactionRequest transactionRequest) {
        LOGGER.info("Request received for createTransaction: id={}, body={}", id, transactionRequest);
        return Response.status(Response.Status.OK).entity(transactionService.createTransaction(id, transactionRequest)).build();
    }

    @GET
    @Path("{id}/extrato")
    public Response getExtract(@PathParam("id") Long id) {
        LOGGER.info("Request received for getExtract: id={}", id);
        return Response.status(Response.Status.OK).entity(balanceService.getExtract(id)).build();
    }
}
