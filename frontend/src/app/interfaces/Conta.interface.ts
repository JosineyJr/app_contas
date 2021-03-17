import { Tipo } from './Tipo.interface';
import { Usuario } from './Usuario.interface';

export interface Conta {
  dataVencimento: string;
  descricao: string;
  id: number;
  situacao: boolean;
  tipo: Tipo;
  usuario: Usuario;
  valor: number;
}
