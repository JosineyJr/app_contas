package br.alessio.dbf.repository;

import br.alessio.dbf.model.Conta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContaRepository extends JpaRepository<Conta, Long> {

    List<Conta> findAllByUsuarioId(Long id);

}
