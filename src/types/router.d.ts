// src/types/router.d.ts
import 'vue-router';

declare module 'vue-router' {
  interface RouteLocationNormalized {
    state?: { // Aggiungi il tipo della tua struttura dello stato
      user?: {
        id: string;
        userName: string;
        password: string;
        email:string;
        company:string;
        activationDate:Date;
        enabled: boolean;
      };
    };
  }
}
