package br.alessio.dbf.service;

import br.alessio.dbf.model.Conta;
import br.alessio.dbf.model.Pessoa;
import br.alessio.dbf.repository.ContaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContaService {
    private final Logger log = LoggerFactory.getLogger(ContaService.class);
    private final ContaRepository contaRepository;

    public ContaService(ContaRepository contaRepository) {
        this.contaRepository = contaRepository;
    }

    public List<Conta> findAllList(){
        return contaRepository.findAll();
    }

    public Optional<Conta> findOne(Long id) {
        log.debug("Request to get Conta : {}", id);
        return contaRepository.findById(id);
    }

    public List<Conta> findAllByUsuarioId(Long id) {
        log.debug("Request to get Contas By id do Usuario : {}", id);
        return contaRepository.findAllByUsuarioId(id);
    }

    public void delete(Long id) {
        log.debug("Request to delete Conta : {}", id);
        contaRepository.deleteById(id);
    }

    public Conta save(Conta conta) {
        log.debug("Request to save Conta : {}", conta);
        conta = contaRepository.save(conta);
        return conta;
    }

}
