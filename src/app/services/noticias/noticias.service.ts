import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  //url API base
  BASEAPI: string = 'http://localhost:3000/api/v1/';
  NEWSAPI: string = 'news/';
  NEWSTOPAPI: string = 'top/';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }
  //Listar noticias
  getNews() {
    return this.http.get(this.BASEAPI + this.NEWSAPI);
  }
  //Listar ultimas noticias
  getLastNews() {
    return this.http.get(this.BASEAPI + this.NEWSAPI + this.NEWSTOPAPI);
  }
  //Agregar noticias
  addNews(news: any): Observable<any> {
    return this.http.post(this.BASEAPI + this.NEWSAPI, news);
  }
  //Editar noticias
  editNews(not_codigo: any, news: any): Observable<any> {
    return this.http.patch(this.BASEAPI + this.NEWSAPI + not_codigo, news);
  }
  //Eliminar noticias
  deleteNews(not_codigo: any): Observable<any> {
    return this.http.delete(this.BASEAPI + this.NEWSAPI + not_codigo);
  }
}
