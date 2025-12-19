import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', redirectTo: 'inicio', pathMatch: 'full' },

    {
        path: 'inicio', 
        loadComponent: () => import('./features/cumple-geri/cumple-geri.component') 
            .then(m => m.CumpleGeriComponent)
    }

];
