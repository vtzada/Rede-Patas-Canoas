import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

export interface Coordenada {
  lat: number;
  lng: number;
}

const PADRAO: Coordenada = { lat: -29.9177, lng: -51.1836 };

@Injectable({ providedIn: 'root' })
export class LocalService {

  async posicaoAtual(): Promise<Coordenada> {
    try {
      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });
      return { lat: pos.coords.latitude, lng: pos.coords.longitude };
    } catch {
      return PADRAO;
    }
  }

  distanciaKm(a: Coordenada, b: Coordenada): number {
    const R = 6371;
    const dLat = this.rad(b.lat - a.lat);
    const dLng = this.rad(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 +
              Math.cos(this.rad(a.lat)) * Math.cos(this.rad(b.lat)) *
              Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }

  formatarDistancia(km: number): string {
    return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
  }

  private rad(graus: number): number {
    return graus * Math.PI / 180;
  }
}