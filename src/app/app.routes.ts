import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [
    {
    path: '', //Chenmin racine
    component: LoginComponent,
    pathMatch: 'full' //Redirection ou correspondance complète pour la racine 
},
{
    path: 'accueil',
    component: AcceuilComponent,
    pathMatch: 'full' //Redirection ou correspondance complète pour la racine
},
{
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    pathMatch: 'full' //Redirection ou correspondance complète pour la racine
}
]