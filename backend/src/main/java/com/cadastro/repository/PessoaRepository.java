package com.cadastro.repository;

import com.cadastro.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
    
    Optional<Pessoa> findByCpf(String cpf);
    
    @Query("SELECT p FROM Pessoa p ORDER BY p.nome ASC")
    List<Pessoa> findAllOrderByNome();
    
    boolean existsByCpf(String cpf);
}