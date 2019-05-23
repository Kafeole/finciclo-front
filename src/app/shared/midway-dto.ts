import { ProyectoDto} from './proyecto-dto';
import { LibDTO } from './lib-dto';

export class MidwayDto {
  ident: number;
  proyecto: ProyectoDto;
  lib: LibDTO;
}
