package br.alessio.dbf.web.rest;

import br.alessio.dbf.service.UsuarioService;
import br.alessio.dbf.model.Usuario;
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
@RequestMapping("/public/usuarios")
@Api(value = "usuarios", tags = "Atividade 07 - Usuarios")
public class UsuarioResource {

    private final Logger log = LoggerFactory.getLogger(UsuarioResource.class);

    private final UsuarioService usuarioService;

    public UsuarioResource(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }


    /**
     * {@code PUT  /} : Atualiza um usuario existente Update.
     *
     * @param usuario o usuario a ser atulizado.
     * @return o {@link ResponseEntity} com status {@code 200 (OK)} e no corpo o usuario atualizado,
     * ou com status {@code 400 (Bad Request)} se o usuario não é válido,
     * ou com status {@code 500 (Internal Server Error)} se o usuario não pode ser atualizado.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/")
    public ResponseEntity<Usuario> updateUsuario(@Valid @RequestBody Usuario usuario) throws URISyntaxException {
        log.debug("REST request to update Usuario : {}", usuario);
        if (usuario.getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid usuario id null");
        }
        Usuario result = usuarioService.save(usuario);
        return ResponseEntity.ok()
                .body(result);
    }

    /**
     * {@code POST  /} : Create a new usuario.
     *
     * @param usuario the usuario to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new usuario, or with status {@code 400 (Bad Request)} if the usuario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/")
    public ResponseEntity<Usuario> createUsuario(@Valid @RequestBody Usuario usuario) throws URISyntaxException {
        log.debug("REST request to save Usuario : {}", usuario);
        if (usuario.getId() != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Um novo usuario não pode terum ID");
        }
        Usuario result = usuarioService.save(usuario);
        return ResponseEntity.created(new URI("/api/usuarios/" + result.getId()))
                .body(result);
    }

    /**
     * {@code DELETE  /usuarios/:id} : delete pelo "id" usuario.
     *
     * @param id o id do usuarios que será delete.
     * @return o {@link ResponseEntity} com status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        log.debug("REST request to delete usuario : {}", id);

        usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * {@code GET  /usuarios/:id} : get the "id" usuario.
     *
     * @param id o id do usuario que será buscado.
     * @return o {@link ResponseEntity} com status {@code 200 (OK)} e no body o usuario, ou com status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuario(@PathVariable Long id) {
        log.debug("REST request to get Usuario : {}", id);
        Optional<Usuario> usuario = usuarioService.findOne(id);
        if(usuario.isPresent()) {
            return ResponseEntity.ok().body(usuario.get());
        }else{
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/")
    public ResponseEntity<List<Usuario>> getUsuarios(){
        List<Usuario> lista = usuarioService.findAllList();
        if(lista.size() > 0) {
            return ResponseEntity.ok().body(lista);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * {@code GET  /usuarios/:email/exists} : get the "email" usuario.
     *
     * @param email o email do usuario que será buscado.
     * @return o {@link ResponseEntity} com status {@code 200 (OK)}, ou com status {@code 204 (Not Found)}.
     */

    @GetMapping("/{email}/exists")
    public ResponseEntity<Boolean> isExisting(@PathVariable String email){
        log.debug("REST request to get usuario By email : {}", email);

        if(usuarioService.findByEmail(email).isPresent()) {
            return ResponseEntity.ok().body(Boolean.TRUE);
        }else{
            return ResponseEntity.noContent().build();
        }

    }

    @GetMapping("/{email}/{senha}")
    public ResponseEntity<Usuario> authenticateUsuario(@PathVariable  String email, @PathVariable String senha) throws URISyntaxException {
        log.debug("REST request to registrar usuario Usuario : {}", email, senha);
        Optional<Usuario> usuario = usuarioService.findUsuarioByEmailAndSenha(email, senha);

        if(usuario.isPresent()) {
            return ResponseEntity.ok().body(usuario.get());
        }else{
            return ResponseEntity.notFound().build();
        }

    }


}
