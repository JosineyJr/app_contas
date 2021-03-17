import { Tipo } from './Tipo.interface';
import { Usuario } from './Usuario.interface';

export interface Conta {
  dataVencimento: Date;
  descricao: string;
  id: number;
  situacao: boolean;
  tipo: Tipo;
  usuario: Usuario;
  valor: Number;
}
