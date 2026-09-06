import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({ providedIn: 'root' })
export class FotoService {

  async capturar(): Promise<string> {
    try {
      const foto = await Camera.getPhoto({
        quality: 50,
        width: 800,
        allowEditing: false,
        correctOrientation: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt
      });
      return foto.base64String ?? '';
    } catch {
      return '';
    }
  }

  paraExibicao(base64: string): string {
    return base64 ? `data:image/jpeg;base64,${base64}` : '';
  }
}