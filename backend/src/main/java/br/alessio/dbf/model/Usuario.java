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

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome", length = 255)
    @Length(min = 5, message = "*O Nome deve ter pelo menos 5 characteres")
    @NotEmpty(message = "*Por favor digite um Nome")
    private String nome;

    @Column(name = "email", length = 255)
    @Email(message = "*Por favor digite um email válido")
    private String email;

    @Column(name = "senha", length = 255)
    @Length(min = 5, message = "*A senha deve ter mais de 5 characteres")
    @NotEmpty(message = "*Por favor digite uma senha")
    private String senha;
}
