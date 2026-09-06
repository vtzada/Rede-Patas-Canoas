import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {

  private storage = inject(StorageService);

  async ngOnInit() {
    await this.storage.salvar({
      id: 'o',
      tipo: 'perdido',
      nome: 'Thor',
      especie: 'cao',
      porte: 'medio',
      cor: 'caramelo',
      descricao: 'coleira azul',
      foto: '',
      lat: -29.9177,
      lng: -51.1836,
      referencia: 'perto do La Salle',
      contato: '51999999999',
      data: new Date().toISOString(),
      resolvido: false
    });

    console.log('OCORRENCIAS:', await this.storage.listar());
  }
}