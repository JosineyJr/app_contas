package br.alessio.dbf.web.rest;

import br.alessio.dbf.model.Conta;
import br.alessio.dbf.service.ContaService;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/public/contas")
@Api(value = "contas", tags = "Atividade 07 - Contas")
public class ContaResource {

    private final Logger log = LoggerFactory.getLogger(ContaResource.class);

    private final ContaService contaService;

    public ContaResource(ContaService contaService) {
        this.contaService = contaService;
    }

    /**
     * {@code DELETE  /contas/:id} : delete pelo "id" conta.
     *
     * @param id o id do contas que será delete.
     * @return o {@link ResponseEntity} com status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConta(@PathVariable Long id) {
        log.debug("REST request to delete conta : {}", id);

        contaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * {@code GET  /contas/:id} : get the "id" conta.
     *
     * @param id o id do conta que será buscado.
     * @return o {@link ResponseEntity} com status {@code 200 (OK)} e no body o conta, ou com status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Conta> getConta(@PathVariable Long id) {
        log.debug("REST request to get Conta : {}", id);
        Optional<Conta> conta = contaService.findOne(id);
        if(conta.isPresent()) {
            return ResponseEntity.ok().body(conta.get());
        }else{
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/")
    public ResponseEntity<List<Conta>> getContas(){
        List<Conta> lista = contaService.findAllList();
        if(lista.size() > 0) {
            return ResponseEntity.ok().body(lista);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * {@code GET  /contas/usuarios/:id} : get the contas por usuário.
     */

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Conta>> getContasByUsuario(@PathVariable Long id){
        log.debug("REST request to get Conta By id do Usuario : {}", id);

        List<Conta> lista = contaService.findAllByUsuarioId(id);
        if(lista.size() > 0) {
            return ResponseEntity.ok().body(lista);
        }else{
            return ResponseEntity.noContent().build();
        }

    }


    /**
     * {@code PUT  /contas} : Atualiza um conta existenteUpdate.
     *
     * @param conta o conta a ser atulizado.
     * @return o {@link ResponseEntity} com status {@code 200 (OK)} e no corpo o conta atualizado,
     * ou com status {@code 400 (Bad Request)} se o conta não é válido,
     * ou com status {@code 500 (Internal Server Error)} se o conta não pode ser atualizado.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/")
    public ResponseEntity<Conta> updateConta(@Valid @RequestBody Conta conta) throws URISyntaxException {
        log.debug("REST request to update Conta : {}", conta);
        if (conta.getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid Conta id null");
        }
        Conta result = contaService.save(conta);
        return ResponseEntity.ok()
                .body(result);
    }

    /**
     * {@code POST  /} : Create a new conta.
     *
     * @param conta the conta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new conta, or with status {@code 400 (Bad Request)} if the conta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/")
    public ResponseEntity<Conta> createConta(@Valid @RequestBody Conta conta) throws URISyntaxException {
        log.debug("REST request to save Conta : {}", conta);
        if (conta.getId() != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Uma nova Conta não pode ter um ID");
        }
        Conta result = contaService.save(conta);
        return ResponseEntity.created(new URI("/api/contas/" + result.getId()))
                .body(result);
    }
}
