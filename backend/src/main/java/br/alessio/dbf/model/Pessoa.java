package br.alessio.dbf.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "pessoa")
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome", length = 255)
    @Length(min = 5, message = "*Seu Nome ter pelo menos 5 characteres")
    @NotEmpty(message = "*Por favor digite um Nome")
    private String nome;

    @Column(name = "data_nascimento")
    private Instant dataNascimento;

    @Column(name = "cpf")
    @CPF(message = "*Por favor digite um cpf válido")
    @NotEmpty(message = "*Por favor digite um cpf")
    private String cpf;

    @Column(name = "telefone", length = 20)
    @Length(min = 5, message = "*Sua password deve ter mais de 5 characteres")
    @NotEmpty(message = "*Por favor digite sua password")
    private String telefone;

    @Column(name = "end_cep", length = 20)
    private String cep;

    @Column(name = "end_rua", length = 255)
    private String rua;

    @Column(name = "end_bairro", length = 127)
    private String bairro;

    @Column(name = "end_cidade", length = 127)
    private String cidade;

    @Column(name = "end_UF", length = 3)
    private String uf;

}
