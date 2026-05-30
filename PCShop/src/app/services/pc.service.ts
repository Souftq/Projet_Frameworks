import { Injectable } from '@angular/core';
import { Pc, PcData } from '../models/pc.model';
import donneesPc from '../data/donnees-pc.json';

@Injectable({ providedIn: 'root' })
export class PcService {
  private readonly pcs: Pc[] = (donneesPc as unknown as PcData[]).map((pc, id) => ({ ...pc, id }));

  getAll(): Pc[] {
    return this.pcs;
  }

  getById(id: number): Pc | undefined {
    return this.pcs.find(pc => pc.id === id);
  }

  /** PC d'un même type, en excluant celui passé en paramètre. */
  getSimilaires(pc: Pc, limite = 3): Pc[] {
    return this.pcs
      .filter(p => p.type === pc.type && p.id !== pc.id)
      .slice(0, limite);
  }
}
