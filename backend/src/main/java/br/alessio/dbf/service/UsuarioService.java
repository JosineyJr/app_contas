package br.alessio.dbf.service;

import br.alessio.dbf.model.Usuario;
import br.alessio.dbf.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final Logger log = LoggerFactory.getLogger(UsuarioService.class);
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {

        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario>  findAllList(){
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findOne(Long id) {
        log.debug("Request to get usuario : {}", id);
        return usuarioRepository.findById(id);
    }

    public void delete(Long id) {
        log.debug("Request to delete Tipo : {}", id);
        usuarioRepository.deleteById(id);
    }

    public Usuario save(Usuario usuario) {
        log.debug("Request to save Usuario : {}", usuario);
        usuario = usuarioRepository.save(usuario);
        return usuario;
    }

    public Optional<Usuario> findByEmail(String email) {
        log.debug("Request to get usuario By Email : {}", email);
        return usuarioRepository.findByEmail(email);
    }

    public Optional<Usuario> findUsuarioByEmailAndSenha(String email, String senha) {
        log.debug("Request to get usuario By Email and Senha : {}", email, senha);
        return usuarioRepository.findUsuarioByEmailAndSenha(email, senha);
    }


}
