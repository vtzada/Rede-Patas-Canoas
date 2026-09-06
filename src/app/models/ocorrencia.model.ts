export type TipoOcorrencia = 'perdido' | 'encontrado' | 'adocao'; 
export interface Ocorrencia { 
    id: string; 
    tipo: TipoOcorrencia;
    nome: string;
    especie: 'cao' | 'gato' | 'outro'; 
    porte: 'pequeno' | 'medio' | 'grande'; 
    cor: string; 
    descricao: string; 
    foto: string; // base64 comprimido 
    lat: number;
    lng: number;
    referencia: string;   // "perto do La Salle" 
    contato: string; 
    data: string;         // ISO
    resolvido: boolean; 
}