import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';
import { Ocorrencia } from '../models/ocorrencia.model';

const RAIO_ALERTA_KM = 5;

@Injectable({ providedIn: 'root' })
export class NotificacaoService {

  private get disponivel(): boolean {
    return Capacitor.isNativePlatform();
  }

  async pedirPermissao(): Promise<boolean> {
    if (!this.disponivel) { return false; }
    const r = await LocalNotifications.requestPermissions();
    return r.display === 'granted';
  }

  async alertarProximidade(o: Ocorrencia, distanciaKm: number): Promise<void> {
    if (distanciaKm > RAIO_ALERTA_KM) { return; }

    const titulo = o.tipo === 'adocao'
      ? 'Pet para adocao perto de voce'
      : 'Pet perdido perto de voce';
    const corpo = `${o.nome} · ${o.especie} · ${distanciaKm.toFixed(1)} km`;

    if (!this.disponivel) {
      console.log('[notificacao simulada]', titulo, corpo);
      return;
    }

    await LocalNotifications.schedule({
      notifications: [{
        id: Date.now() % 100000,
        title: titulo,
        body: corpo,
        schedule: { at: new Date(Date.now() + 2000) }
      }]
    });
  }
}