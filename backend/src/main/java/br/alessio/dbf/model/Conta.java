package br.alessio.dbf.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "conta")
public class Conta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao", length = 255)
    @Length(min = 5, message = "*A descrição deve ter pelo menos 5 characteres")
    @NotEmpty(message = "*Por favor digite uma descrição")
    private String descricao;

    @Column(name = "dataVencimento")
    private Instant dataVencimento;

    @Column(name = "valor")
    @NotNull(message = "*Por favor digite um valor")
    private double valor;

    @Column(name = "situacao")
    @NotNull(message = "*Por favor digite a situação")
    private boolean situacao;

    @JoinColumn(name="idTipo")
    @ManyToOne
    private Tipo tipo;

    @JoinColumn(name="idUsuario")
    @ManyToOne
    private Usuario usuario;
}
