import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Ocorrencia, TipoOcorrencia } from '../models/ocorrencia.model';

const CHAVE = 'ocorrencias';

@Injectable({ providedIn: 'root' })
export class StorageService {

  async listar(): Promise<Ocorrencia[]> {
    const { value } = await Preferences.get({ key: CHAVE });
    return value ? JSON.parse(value) as Ocorrencia[] : [];
  }

  async listarPorTipo(tipo: TipoOcorrencia): Promise<Ocorrencia[]> {
    return (await this.listar()).filter(o => o.tipo === tipo && !o.resolvido);
  }

  async buscarPorId(id: string): Promise<Ocorrencia | undefined> {
    return (await this.listar()).find(o => o.id === id);
  }

  async salvar(item: Ocorrencia): Promise<void> {
    const lista = await this.listar();
    const i = lista.findIndex(o => o.id === item.id);
    if (i >= 0) { lista[i] = item; } else { lista.unshift(item); }
    await this.persistir(lista);
  }

  async remover(id: string): Promise<void> {
    const lista = (await this.listar()).filter(o => o.id !== id);
    await this.persistir(lista);
  }

  async marcarResolvido(id: string): Promise<void> {
    const item = await this.buscarPorId(id);
    if (item) {
      item.resolvido = true;
      await this.salvar(item);
    }
  }

  novoId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  private async persistir(lista: Ocorrencia[]): Promise<void> {
    await Preferences.set({ key: CHAVE, value: JSON.stringify(lista) });
  }
}