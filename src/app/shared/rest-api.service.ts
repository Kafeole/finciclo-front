import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HtmlDTO } from '../shared/html-dto';
import { CssDTO } from '../shared/css-dto';
import { JsDTO } from '../shared/js-dto';
import { DatoDTO } from '../shared/dato-dto';
import { LibDTO } from '../shared/lib-dto';
import { ProyectoDto} from '../shared/proyecto-dto';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

      // Define API
  apiURL = 'http://localhost:8090';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options - Cabeceras
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpOptionsString = {
    headers: new HttpHeaders({
      responseType: 'text'
    })
  }

  // PROVEEDOR

  // HttpClient API get() method => Fetch html list
  getHtmls(): Observable<HtmlDTO> {
    return this.http.get<HtmlDTO>(this.apiURL + '/html/all')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch html
  getHtml(id): Observable<HtmlDTO> {
    return this.http.get<HtmlDTO>(this.apiURL + '/html/id/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch html by nombre
  getHtmlByNombre(nombre): Observable<HtmlDTO> {
    return this.http.get<HtmlDTO>(this.apiURL + '/html/nombre/' + nombre)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API post() method => Create html
  createHtml(html): Observable<HtmlDTO> {
    return this.http.post<HtmlDTO>(this.apiURL + '/html/add', JSON.stringify(html), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API put() method => Update html
  updateHtml(id, html): Observable<HtmlDTO> {
    return this.http.put<HtmlDTO>(this.apiURL + '/html/update/' + id, JSON.stringify(html), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete html
  deleteHtml(id){
    return this.http.delete<HtmlDTO>(this.apiURL + '/html/delete/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

    ///////////////////////////////////////////////////////////
  // PROYECTO

  // HttpClient API get() method => Fetch css list
  getCssDTOs(): Observable<CssDTO> {
    return this.http.get<CssDTO>(this.apiURL + '/csss/all')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch css
  getCssDTO(id): Observable<CssDTO> {
    return this.http.get<CssDTO>(this.apiURL + '/csss/id' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch csss by nombre
  getCssDTOByNombre(nombre): Observable<CssDTO> {
    return this.http.get<CssDTO>(this.apiURL + '/csss/nombre/' + nombre)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API post() method => Create css
  createCssDTO(css): Observable<CssDTO> {
    return this.http.post<CssDTO>(this.apiURL + '/csss/add', JSON.stringify(css), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API put() method => Update css
  updateCssDTO(id, css): Observable<CssDTO> {
    return this.http.put<CssDTO>(this.apiURL + '/CssDTOs/update/' + id, JSON.stringify(css), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete css
  deleteCssDTO(id){
    return this.http.delete<CssDTO>(this.apiURL + '/csss/delete/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

   ///////////////////////////////////////////////////
  // JsDTO

  // HttpClient API get() method => Fetch js list
  getJsDTOs(): Observable<JsDTO> {
    return this.http.get<JsDTO>(this.apiURL + '/jss/all')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch js
  getJsDTO(id): Observable<JsDTO> {
    return this.http.get<JsDTO>(this.apiURL + '/jss/id/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch jss by nombre
  getJsDTOByNombre(nombre): Observable<JsDTO> {
    return this.http.get<JsDTO>(this.apiURL + '/jss/nombre/' + nombre)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API post() method => Create js
  createJsDTO(js): Observable<JsDTO> {
    return this.http.post<JsDTO>(this.apiURL + '/jss/add', JSON.stringify(js), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // HttpClient API put() method => Update js
  updateJsDTO(id, js): Observable<JsDTO> {
    return this.http.put<JsDTO>(this.apiURL + '/jss/update/' + id, JSON.stringify(js), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete js
  deleteJsDTO(id){
    return this.http.delete<JsDTO>(this.apiURL + '/jss/delete/' + id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

   ////////////////////////////////////////////////////////////////
  // DatoDTO

  // HttpClient API get() method => Fetch dato list
  getDatoDTOs(): Observable<DatoDTO> {
    return this.http.get<DatoDTO>(this.apiURL + '/datos/all')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch dato
  getDatoDTO(id): Observable<DatoDTO> {
    return this.http.get<DatoDTO>(this.apiURL + '/datos/id/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch datos by nombre
  getDatoDTOByNombre(nombre): Observable<DatoDTO> {
    return this.http.get<DatoDTO>(this.apiURL + '/datos/nombre/' + nombre)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API post() method => Create dato
  createDatoDTO(dato): Observable<DatoDTO> {
    return this.http.post<DatoDTO>(this.apiURL + '/datos/add', JSON.stringify(dato), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // HttpClient API put() method => Update dato
  updateDatoDTO(id, dato): Observable<DatoDTO> {
    return this.http.put<DatoDTO>(this.apiURL + '/datos/update/' + id, JSON.stringify(dato), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete dato
  deleteDatoDTO(id){
    return this.http.delete<DatoDTO>(this.apiURL + '/datos/delete/' + id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

   ////////////////////////////////////////////////////////////////
  // LibDTO

  // HttpClient API get() method => Fetch dato list
  getLibDTOs(): Observable<LibDTO> {
    return this.http.get<LibDTO>(this.apiURL + '/libs/all')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch dato list
  // getLibDTOsNombre(): Observable<string> {
  //   return this.http.(this.apiURL + '/libs/all')
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  // HttpClient API get() method => Fetch dato
  getLibDTO(id): Observable<LibDTO> {
    return this.http.get<LibDTO>(this.apiURL + '/libs/id/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch datos by nombre
  getLibDTOByNombre(nombre): Observable<LibDTO> {
    return this.http.get<LibDTO>(this.apiURL + '/libs/nombre/' + nombre)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API post() method => Create dato
  createLibDTO(lib: Map<string, string>) {
    return this.http.post<LibDTO>(this.apiURL + '/libs/add', JSON.stringify(lib), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // HttpClient API put() method => Update dato
  updateLibDTO(id, lib): Observable<LibDTO> {
    return this.http.put<LibDTO>(this.apiURL + '/libs/update/' + id, JSON.stringify(lib), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete dato
  deleteLibDTO(id){
    return this.http.delete<LibDTO>(this.apiURL + '/libs/delete/' + id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  ////////////////////////////////////////////////////////////////
  // ProyectoDTO

  // HttpClient API get() method => Fetch dato list
  getProyectoDTOs(): Observable<ProyectoDto> {
    return this.http.get<ProyectoDto>(this.apiURL + '/proyectos/all')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch dato
  getProyectoDTO(id): Observable<ProyectoDto> {
    return this.http.get<ProyectoDto>(this.apiURL + '/proyectos/id/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch datos by nombre
  getProyectoDTOByNombre(nombre): Observable<ProyectoDto> {
    return this.http.get<ProyectoDto>(this.apiURL + '/proyectos/nombre/' + nombre)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API post() method => Create dato
  createProyectoDTO(pro: Map<string, any>){
    return this.http.post(this.apiURL + '/proyectos/add/' , pro, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // HttpClient API put() method => Update mombre de proyecto
  updateProyectoDTONombre(id, proy:Map<string, any>) {
    return this.http.put<ProyectoDto>(this.apiURL + '/proyectos/updatenombre/' + id, JSON.stringify(proy), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // HttpClient API put() method => Update arhcivos de proyecto
  updateProyectoDTOAll(id, proy): Observable<ProyectoDto> {
    return this.http.put<ProyectoDto>(this.apiURL + '/proyectos/updateall/' + id, proy, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete dato
  deleteProyectoDTO(id){
    return this.http.delete<ProyectoDto>(this.apiURL + '/proyectos/delete/' + id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }


  ////////////////////////////////////////////////////////////////
  // MidwayDTO

  deleteLibsOfProyectoDTO(identpro, identlib){
    return this.http.delete(this.apiURL + '/midway/deletelibs/' + identpro + '/' + identlib, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // HttpClient API put() method => Update midway
  createMidwayDTO(ident, mid: Map<string, string>){
    return this.http.post(this.apiURL + '/midway/add/'+ ident , mid, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
