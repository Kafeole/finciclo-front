import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as ace from 'ace-builds'; 
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import { config } from 'rxjs';



const THEME = 'ace/theme/cobalt'; 
const COBALT = 'ace/theme/cobalt'; 
const MONO = 'ace/theme/monokai'; 
const LANGJ = 'ace/mode/javascript';
const LANGH = 'ace/mode/javascript';
const LANGC = 'ace/mode/javascript';


@Component({
  selector: 'app-editores',
  templateUrl: './editores.component.html',
  styleUrls: ['./editores.component.css']
})
export class EditoresComponent implements OnInit {

  @ViewChild('codeEditorH') private codeEditorH: ElementRef;
  @ViewChild('codeEditorC') private codeEditorC: ElementRef;
  @ViewChild('codeEditorJ') private codeEditorJ: ElementRef;

  private codeH: ace.Ace.Editor;
  private codeJ: ace.Ace.Editor;
  private codeC: ace.Ace.Editor;
  private editorBeautify;

  constructor() { }

  ngOnInit() {

    this.configHTML();
    this.configCSS();
    this.configJS();
    
  }

  configHTML(){
    const element = this.codeEditorH.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.codeH = ace.edit(element, editorOptions);
    this.codeH.setTheme(THEME);
    this.codeH.getSession().setMode(LANGH);
    this.codeH.setShowFoldWidgets(true);
    // hold reference to beautify extension
    this.editorBeautify = ace.require('ace/ext/beautify');
  }

  configCSS(){
    const element = this.codeEditorC.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.codeC = ace.edit(element, editorOptions);
    this.codeC.setTheme(MONO);
    this.codeC.getSession().setMode(LANGC);
    this.codeC.setShowFoldWidgets(true);
    // hold reference to beautify extension
    this.editorBeautify = ace.require('ace/ext/beautify');
  }

  configJS(){
    const element = this.codeEditorJ.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.codeJ = ace.edit(element, editorOptions);
    this.codeJ.setTheme(THEME);
    this.codeJ.getSession().setMode(LANGJ);
    this.codeJ.setShowFoldWidgets(true);
    // hold reference to beautify extension
    this.editorBeautify = ace.require('ace/ext/beautify');
  }


  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
        highlightActiveLine: true,
        minLines: 14,
        maxLines: Infinity,
    };
    const extraEditorOptions = { enableBasicAutocompletion: true };
    return Object.assign(basicEditorOptions, extraEditorOptions);
  }

     /**
   * @description
   *  beautify the editor content, rely on Ace Beautify extension.
   */
  public beautifyContent(): void {
    if (this.codeEditorH && this.codeEditorC && this.codeEditorJ && this.editorBeautify) {
        const sessionH = this.codeH.getSession();
        this.editorBeautify.beautify(sessionH);
        const sessionC = this.codeC.getSession();
        this.editorBeautify.beautify(sessionC);
        const sessionJ = this.codeJ.getSession();
        this.editorBeautify.beautify(sessionJ);
    }
  }

  compile() {
    // var html = document.getElementById("html");
    // var css = document.getElementById("css");
    // var js = document.getElementById("js");

    var html = this.codeH.getValue();
    var css = this.codeC.getValue();
    var js = this.codeJ.getValue();

     var element = document.getElementById("code") as HTMLIFrameElement;
     var code = element.contentWindow.document;
     const de3 = '<script src="https://d3js.org/d3.v5.js"></script>'
     
    // document.body.onkeyup = function() {
      code.open();
      code.writeln(

          de3+
          html+
            "<style>" +
           css+
          "</style>" +
           "<script>" +
           js+
          "</script>"
           
          
      );
      code.close();
    // };
  }

}
