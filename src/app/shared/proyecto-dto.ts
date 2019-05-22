import { HtmlDTO } from './html-dto';
import { CssDTO } from './css-dto';
import { JsDTO } from './js-dto';
import { DatoDTO } from './dato-dto';
import { LibDTO } from './lib-dto';

export class ProyectoDto {

    constructor(){

    }

    ident: number;
    html: HtmlDTO;
    css: CssDTO;
    script: JsDTO;
    dato: DatoDTO;
    nombre: string;
}
