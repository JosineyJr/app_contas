package br.alessio.dbf.web.rest;

import br.alessio.dbf.model.Tipo;

import br.alessio.dbf.service.TipoService;
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
@RequestMapping("/public/tipos")
@Api(value = "tipos", tags = "Atividade 07 - Tipos")
public class TipoResource {

    private final Logger log = LoggerFactory.getLogger(TipoResource.class);

    private final TipoService tipoService;

    public TipoResource(TipoService tipoService) {
        this.tipoService = tipoService;
    }

    /**
     * {@code DELETE  /tipos/:id} : delete pelo "id" tipo.
     *
     * @param id o id do tipos que será delete.
     * @return o {@link ResponseEntity} com status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipo(@PathVariable Long id) {
        log.debug("REST request to delete tipo : {}", id);

        tipoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * {@code GET  /tipos/:id} : get the "id" tipo.
     *
     * @param id o id do tipo que será buscado.
     * @return o {@link ResponseEntity} com status {@code 200 (OK)} e no body o tipo, ou com status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Tipo> getTipo(@PathVariable Long id) {
        log.debug("REST request to get Tipo : {}", id);
        Optional<Tipo> tipo = tipoService.findOne(id);
        if(tipo.isPresent()) {
            return ResponseEntity.ok().body(tipo.get());
        }else{
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/")
    public ResponseEntity<List<Tipo>> getTipos(){
        List<Tipo> lista = tipoService.findAllList();
        if(lista.size() > 0) {
            return ResponseEntity.ok().body(lista);
        }else{
            return ResponseEntity.notFound().build();
        }
    }


    /**
     * {@code PUT  /tipos} : Atualiza um tipo existenteUpdate.
     *
     * @param tipo o tipo a ser atulizado.
     * @return o {@link ResponseEntity} com status {@code 200 (OK)} e no corpo o tipo atualizado,
     * ou com status {@code 400 (Bad Request)} se o tipo não é válido,
     * ou com status {@code 500 (Internal Server Error)} se o tipo não pode ser atualizado.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/")
    public ResponseEntity<Tipo> updateTipo(@Valid @RequestBody Tipo tipo) throws URISyntaxException {
        log.debug("REST request to update Tipo : {}", tipo);
        if (tipo.getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid Tipo id null");
        }
        Tipo result = tipoService.save(tipo);
        return ResponseEntity.ok()
                .body(result);
    }

    /**
     * {@code POST  /} : Create a new tipo.
     *
     * @param tipo the tipo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipo, or with status {@code 400 (Bad Request)} if the tipo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/")
    public ResponseEntity<Tipo> createTipo(@Valid @RequestBody Tipo tipo) throws URISyntaxException {
        log.debug("REST request to save Tipo : {}", tipo);
        if (tipo.getId() != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Um novo tipo não pode terum ID");
        }
        Tipo result = tipoService.save(tipo);
        return ResponseEntity.created(new URI("/api/tipos/" + result.getId()))
                .body(result);
    }

}
