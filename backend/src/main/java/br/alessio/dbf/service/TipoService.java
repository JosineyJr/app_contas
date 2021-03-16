package br.alessio.dbf.service;
import org.springframework.stereotype.Service;
import br.alessio.dbf.repository.TipoRepository;
import br.alessio.dbf.model.Tipo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;

@Service
public class TipoService {
    private final Logger log = LoggerFactory.getLogger(TipoService.class);
    private final TipoRepository tipoRepository;

    public TipoService(TipoRepository tipoRepository){

        this.tipoRepository = tipoRepository;
    }

    public List<Tipo> findAllList(){
        return tipoRepository.findAll();
    }

    public Optional<Tipo> findOne(Long id) {
        log.debug("Request to get Tipo : {}", id);
        return tipoRepository.findById(id);
    }


    public void delete(Long id) {
        log.debug("Request to delete Tipo : {}", id);
        tipoRepository.deleteById(id);
    }

    public Tipo save(Tipo tipo) {
        log.debug("Request to save Tipo : {}", tipo);
        tipo = tipoRepository.save(tipo);
        return tipo;
    }
}
