package com.cadastro.controller;

import com.cadastro.model.Pessoa;
import com.cadastro.repository.PessoaRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/pessoas")
@CrossOrigin(origins = "*")
public class PessoaController {
    
    @Autowired
    private PessoaRepository pessoaRepository;
    
    @PostMapping
    public ResponseEntity<?> cadastrarPessoa(@Valid @RequestBody Pessoa pessoa) {
        try {
            // Verificar se CPF já existe
            if (pessoaRepository.existsByCpf(pessoa.getCpf())) {
                Map<String, String> erro = new HashMap<>();
                erro.put("error", "CPF já cadastrado no sistema");
                return ResponseEntity.badRequest().body(erro);
            }
            
            Pessoa pessoaSalva = pessoaRepository.save(pessoa);
            return ResponseEntity.status(HttpStatus.CREATED).body(pessoaSalva);
            
        } catch (Exception e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("error", "Erro ao cadastrar pessoa: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Pessoa>> listarPessoas() {
        try {
            List<Pessoa> pessoas = pessoaRepository.findAllOrderByNome();
            return ResponseEntity.ok(pessoas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPessoa(@PathVariable Long id) {
        try {
            return pessoaRepository.findById(id)
                    .map(pessoa -> ResponseEntity.ok(pessoa))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("error", "Erro ao buscar pessoa");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
        }
    }
}