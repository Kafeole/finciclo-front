import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { LibDTO } from '../shared/lib-dto';

import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import { config } from 'rxjs';
import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/typings/scroll/scroll-strategy';
import { MatListOption, MatSelectionList, MatOption, MatPaginator, MatTableDataSource } from '@angular/material';
import { GuardsCheckStart } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { compileBaseDefFromMetadata } from '@angular/compiler';
import { ProyectoDto } from '../shared/proyecto-dto';


const THEME = 'ace/theme/cobalt';
const COBALT = 'ace/theme/cobalt';
const MONOKAI = 'ace/theme/monokai';
const LANGJ = 'ace/mode/javascript';
const LANGH = 'ace/mode/html';
const LANGC = 'ace/mode/css';
const LANGJSON = 'ace/mode/json';
const FONTS = '';
const FONTT = '';


@Component({
  selector: 'app-editores',
  templateUrl: './editores.component.html',
  styleUrls: ['./editores.component.css']
})
export class EditoresComponent implements AfterViewInit {

  constructor(
    public restApi: RestApiService,
  ){}

  @ViewChild('codeEditorH') private codeEditorH: ElementRef;
  @ViewChild('codeEditorC') private codeEditorC: ElementRef;
  @ViewChild('codeEditorJ') private codeEditorJ: ElementRef;
  @ViewChild('codeEditorD') private codeEditorD: ElementRef;

  dataSource = new MatTableDataSource();

  private codeH: ace.Ace.Editor;
  private codeJ: ace.Ace.Editor;
  private codeC: ace.Ace.Editor;
  private codeD: ace.Ace.Editor;
  private editorBeautify;
  public notImported: boolean = true;
  librerias: any = [];
  libreriasProyecto: any = [];
  calledLib: string[] = [];
  selectedOptions: any = [];
  selectedProyecto:any=[];
  aImportar: string = '';
  scriptsaEliminar: any = [];
  listadoProyectos: any = [];
  newlibruta: string;
  newlibnombre: string;
  currentProyectoName: string;
  currentProyectoId: string;
  quiereimportar: string;

  sino = [
    {'op': 'Si', 'checked': true},
    {'op': 'No', 'checked': false}
  ];

  columnsToDisplay: string[] = [ 'nombre' , 'import', 'edit', 'del'];


  ngAfterViewInit() {

    this.currentProyectoName = '';
    this.currentProyectoId = '';
    this.quiereimportar = this.sino[1].op;

    this.configHTML();
    this.configCSS();
    this.configJS();
    this.configDATA();
    this.configLIB();
    this.configProy();

  }

  configHTML() {
    const element = this.codeEditorH.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.codeH = ace.edit(element, editorOptions);
    this.codeH.setTheme(THEME);
    this.codeH.getSession().setMode(LANGH);
    this.codeH.setShowFoldWidgets(true);
    this.editorBeautify = ace.require('ace/ext/beautify');
  }

  configCSS() {
    const element = this.codeEditorC.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.codeC = ace.edit(element, editorOptions);
    this.codeC.setTheme(THEME);
    this.codeC.getSession().setMode(LANGC);
    this.codeC.setShowFoldWidgets(true);
    this.editorBeautify = ace.require('ace/ext/beautify');
  }

  configJS() {
    const element = this.codeEditorJ.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.codeJ = ace.edit(element, editorOptions);
    this.codeJ.setTheme(THEME);
    this.codeJ.getSession().setMode(LANGJ);
    this.codeJ.setShowFoldWidgets(true);
    this.editorBeautify = ace.require('ace/ext/beautify');
  }

  configDATA() {
    const element = this.codeEditorD.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.codeD = ace.edit(element, editorOptions);
    this.codeD.setTheme(MONOKAI);
    this.codeD.setValue('[];');
    this.codeD.getSession().setMode(LANGJSON);
    this.codeD.setShowFoldWidgets(true);
    this.editorBeautify = ace.require('ace/ext/beautify');
  }

  configLIB() {

    this.getScripts();
  }

  configProy() {

    this.getProyectos();
  }


  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
        highlightActiveLine: true,
        minLines: 16,
        maxLines: Infinity,
        vScrollBarAlwaysVisible: false,
        fontSize: 14,
        fontFamily: 'Consolas',
    };
    const extraEditorOptions = { enableBasicAutocompletion: true };
    return Object.assign(basicEditorOptions, extraEditorOptions);
  }


  public beautifyContent(): void {
    if (this.codeEditorH && this.codeEditorC && this.codeEditorJ && this.editorBeautify) {
        const sessionH = this.codeH.getSession();
        this.editorBeautify.beautify(sessionH);
        const sessionC = this.codeC.getSession();
        this.editorBeautify.beautify(sessionC);
        const sessionJ = this.codeJ.getSession();
        this.editorBeautify.beautify(sessionJ);
        const sessionD = this.codeD.getSession();
        this.editorBeautify.beautify(sessionD);
    }
  }

  getScripts() {
    return this.restApi.getLibDTOs().subscribe((data) => {
        this.librerias = data;
      });
  }

  getProyectos() {
    return this.restApi.getProyectoDTOs().subscribe((data) => {
        this.listadoProyectos = data;
        this.dataSource = new MatTableDataSource(this.listadoProyectos);
      });
  }


  /**
   * Evento cuando selecionas una lib del repositorio para correrla junto
   * al proyecto actual o añadirsela a posteriori con el submit
   */
  onSelection(e, v) {
    this.calledLib = [];
    this.aImportar = '';
    for(let val of v){
          this.calledLib.push(val.value);
          this.aImportar = this.aImportar + ' ' + val.value;
      }
  }

  /**
   * 
   * Boton de run
   */
  compile() {

    var html = this.codeH.getValue();
    var css = this.codeC.getValue();
    var js = this.codeJ.getValue();
    var datos = this.codeD.getValue();

    var element = document.getElementById('code') as HTMLIFrameElement;
    var code = element.contentWindow.document;

    // d3 v3 : <script src="//d3js.org/d3.v3.min.js"></script>
    // d3 v5 : <script src="https://d3js.org/d3.v5.js"></script>
    console.log(this.aImportar);

    // document.body.onkeyup = function() {
    code.open();
    code.writeln(
           this.aImportar +
           html +
          '<style>' +
               css +
          '</style>' +
          '<script>' +
              'var datosJson=' + datos + '\n' +
               js +
          '</script>'
      );
    code.close();
    // };
  }

  /**
   * Boton de guardar nuevo proyecto
   */
  subir() {

   var html = this.codeH.getValue();
   var css = this.codeC.getValue();
   var js = this.codeJ.getValue();
   var dato = this.codeD.getValue();

   var mapaImps = new Map();
   var count = 0;
   for(let imp of this.calledLib){
      mapaImps[count] = imp;
      count++;
   }

   let proyecto = new Map();

   proyecto['html'] =  {1: html};
   proyecto['css'] = {1: css};
   proyecto['script'] = {1: js};
   proyecto['dato'] =  {1: dato};
   proyecto['imports'] =  mapaImps;

   if (window.confirm('Confirmar subida de proyecto?')) {
      this.restApi.createProyectoDTO(proyecto).subscribe(data => {
       });
      }

    }

  onDelete(modelo: ProyectoDto){
      if(modelo.ident != null){
        if (window.confirm('Confirmar ?')) {
          this.restApi.deleteProyectoDTO(modelo.ident).subscribe(data => {
            this.dataSource.data = this.dataSource.data.filter(i => i !== modelo);
         });
      }
    }
  }

  /**
   * Importacion desde la tabla en la tab de Opciones
   * @param modelo
   */
  onImport(modelo: ProyectoDto){


    if (window.confirm('Confirmar importación?')) {

      this.configProy();

      this.aImportar = '';
      this.notImported = false;
      var proyecto =  this.listadoProyectos.find(x => x.ident === modelo.ident);
      this.currentProyectoId = modelo.ident.toString();
      this.currentProyectoName = modelo.nombre;
      this.scriptsaEliminar = [];

      if (proyecto.modeloHtml != null) {
        this.codeH.setValue(proyecto.modeloHtml.valor);
      }
      if (proyecto.modeloCss != null) {
        this.codeC.setValue(proyecto.modeloCss.valor);
      }
      if (proyecto.modeloJs != null) {
        this.codeJ.setValue(proyecto.modeloJs.valor);
      }
      if (proyecto.modeloDato != null) {
        this.codeD.setValue(proyecto.modeloDato.valor);
      }else{
        this.codeD.setValue('[];');
      }

      this.libreriasProyecto = [];
      if (proyecto.librerias != null) {
        for (let libP of proyecto.librerias) {
         // console.log(libP);
          this.libreriasProyecto.push(libP);
          this.aImportar = this.aImportar + ' \n' + libP.valor;
        }
        
      }
     // console.log(this.aImportar);
      this.compile();
      this.codeJ.selection.moveCursorFileStart(); // deselecciona el texto
      this.codeH.selection.moveCursorFileStart();
      this.codeC.selection.moveCursorFileStart();
      this.scriptsaEliminar = [];
    }
  }

  /**
   * Updatea el html, css, javascript y json del proyecto pero no las libs
   */
  onUpdateCodigos(){
    var html = this.codeH.getValue();
    var css = this.codeC.getValue();
    var js = this.codeJ.getValue();
    var dato = this.codeD.getValue();
    let proyecto = new Map();
 
    proyecto['html'] =  {1: html};
    proyecto['css'] = {1: css};
    proyecto['script'] = {1: js};
    proyecto['dato'] =  {1: dato};
 
    if (window.confirm('Confirmar subida de proyecto?')) {
        this.restApi.updateProyectoDTOAll(this.currentProyectoId, proyecto).subscribe(data => {
        });
       }
  }

  onEdit(modelo) {

    let proyecto = new Map();

    proyecto['ident'] = {1: modelo.ident};
    proyecto['nombre'] =  {1: modelo.nombre};
    proyecto['html'] =  {1: this.checkHtml(modelo)};
    proyecto['css'] =  {1: this.checkCss(modelo)};
    proyecto['script'] = {1: this.checkScript(modelo)};
    proyecto['dato'] =  {1: this.checkDato(modelo)};

    var mapalib = new Map();
    for(let val of modelo.librerias){
      mapalib[val.nombre] = val.valor;
    }
    console.log(mapalib);
    proyecto['librerias'] =  mapalib;

    this.updateProyecto( modelo.ident, proyecto);
  }

  updateProyecto(id, unmod: Map<string, string>) {
    if (window.confirm('Confirmar ?')) {
      this.restApi.updateProyectoDTONombre(id, unmod).subscribe(data => {

       });
      }
   }

  checkHtml(modelo){
     if(modelo.modeloHtml == null){
       return  null;
     } else if(Object.prototype.hasOwnProperty.call(modelo.modeloHtml, 'ident')){
       return  modelo.modeloHtml.ident;
     }
    }

    checkCss(modelo){
      if(modelo.modeloCss == null){
        return  null;
      } else if(Object.prototype.hasOwnProperty.call(modelo.modeloCss, 'ident')){
        return  modelo.modeloCss.ident;
      }
     }

     checkScript(modelo){
      if(modelo.modeloJs == null){
        return  null;
      } else if(Object.prototype.hasOwnProperty.call(modelo.modeloJs, 'ident')){
        return  modelo.modeloJs.ident;
      }
     }

     checkDato(modelo){
      if(modelo.modeloDato == null){
        return  null;
      } else if(Object.prototype.hasOwnProperty.call(modelo.modeloDato, 'ident')){
        return  modelo.modeloDato.ident;
      }
     }

    checkImports(modelo){
      if(modelo.imports == null){
        return  null;
      } else {
        return modelo.imports;
      }

    }

    /**
     * Añade una libreria a t_lib
     */
    addLib() {

        var libaanadir = new Map();
        libaanadir['valor'] = this.newlibruta;
        libaanadir['nombre'] = this.newlibnombre;
        libaanadir['proyecto'] = this.currentProyectoId;
        libaanadir['deseo'] = this.quiereimportar;

        if (window.confirm('Confirmar ?')) {
           this.restApi.createLibDTO(libaanadir).subscribe(data => {

         });
        }

    }

  onSelectiondelProyecto(e, v) {
      this.scriptsaEliminar = [];
      for(let lib of v){
          console.log(lib);
          console.log(lib.ident);
          this.scriptsaEliminar.push(lib.value);
       }
  }

  removeLib() {
    if (window.confirm('Confirmar ?')) {
      console.log(this.scriptsaEliminar);
      for(let id of this.scriptsaEliminar){
        this.restApi.deleteLibsOfProyectoDTO(this.currentProyectoId, id).subscribe(data => {
        });
      }
      this.scriptsaEliminar = [];
    }
  }



  updateLib(){
    var mapaImps = new Map();
    var count = 0;
    for(let imp of this.calledLib){
       mapaImps[count] = imp;
       count++;
    }
    this.restApi.createMidwayDTO(this.currentProyectoId, mapaImps).subscribe(data => {
        });

  }

  recarga(){

   // window.location.reload();
   this.codeH.setValue('');
   this.codeJ.setValue('');
   this.codeC.setValue('');
   this.codeD.setValue('[];');

   var element = document.getElementById('code') as HTMLIFrameElement;
   var code = element.contentWindow.document;
   element.src = "about:blank";
   this.notImported = true;
   this.currentProyectoName = '';
   this.currentProyectoId = '';
   this.quiereimportar = this.sino[1].op;
   this.libreriasProyecto = [];

   this.configHTML();
   this.configCSS();
   this.configJS();
   this.configDATA();
   this.configLIB();
   this.configProy();

  }

}


