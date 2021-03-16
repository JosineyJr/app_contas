package br.alessio.dbf.service;

import br.alessio.dbf.model.Pessoa;
import br.alessio.dbf.repository.PessoaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {

    private final Logger log = LoggerFactory.getLogger(PessoaService.class);

    private final PessoaRepository pessoaRepository;

    public PessoaService(PessoaRepository pessoaRepository){

        this.pessoaRepository = pessoaRepository;
    }

    public List<Pessoa>  findAllList(){
        return pessoaRepository.findAll();
    }

    public Optional<Pessoa> findOne(Long id) {
        log.debug("Request to get Pessoa : {}", id);
        return pessoaRepository.findById(id);
    }

    public Optional<Pessoa> findByCpf(String cpf) {
        log.debug("Request to get Pessoa By Cpf : {}", cpf);
        return pessoaRepository.findByCpf(cpf);
    }

    public void delete(Long id) {
        log.debug("Request to delete Pessoa : {}", id);
        pessoaRepository.deleteById(id);
    }

    public Pessoa save(Pessoa pessoa) {
        log.debug("Request to save Pessoa : {}", pessoa);
        pessoa = pessoaRepository.save(pessoa);
        return pessoa;
    }

}
