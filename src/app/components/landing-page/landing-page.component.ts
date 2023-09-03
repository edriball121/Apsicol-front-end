import { Component, OnInit } from '@angular/core';
import { NoticiasService } from './../../services/noticias/noticias.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: [ './landing-page.component.css' ]
})
export class LandingPageComponent implements OnInit {
  TopNews: any;
  constructor(private NewsService: NoticiasService) { }

  ngOnInit(): void {
    //llamar la lista de noticias
    this.getTopNews();
  }
  getTopNews() {
    //listar ultimas 5 noticias
    this.NewsService.getLastNews().subscribe(respuesta => {
      this.TopNews = respuesta;
    })
  }
}


