import { RenderMode, ServerRoute } from '@angular/ssr';
import donneesPc from './data/donnees-pc.json';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'produit/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      (donneesPc as unknown[]).map((_, id) => ({ id: String(id) })),
  },
  // Pages dépendantes du panier (localStorage) : rendu côté client uniquement.
  { path: 'cart', renderMode: RenderMode.Client },
  { path: 'paiement', renderMode: RenderMode.Client },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
