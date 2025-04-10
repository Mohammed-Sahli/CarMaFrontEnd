import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { AssurancesComponent } from './assurances/assurances.component';
import { ControlesComponent } from './controles/controles.component';
import { ConsommablesComponent } from './consommables/consommables.component';
import { EntrerepsComponent } from './entrereps/entrereps.component';
import { AdminComponent } from './admin/admin.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';

export const routes: Routes = [
    {
    path: '', //Chenmin racine
    component: LoginComponent,
    pathMatch: 'full' //Redirection ou correspondance complète pour la racine 
},

{
    path: 'accueil',
    component: AccueilComponent,
    pathMatch: 'full' //Redirection ou correspondance complète pour la racine
},

{
    path: 'utilisateurs',
    component: UtilisateursComponent,
    pathMatch: 'full' //Redirection ou correspondance complète pour la racine
},

{
    path: 'vehicules',
    component: VehiculesComponent,
    pathMatch: 'full' //Redirection ou correspondance complète pour la racine
},

{
    path: 'assurances',
    component: AssurancesComponent,
    pathMatch: 'full' //Redirection ou correspondance complète pour la racine
},

{
    path: 'controles',
    component: ControlesComponent,
    pathMatch: 'full' //Redirection ou correspondance complète pour la racine
},

{
    path: 'consommables',
    component: ConsommablesComponent,
    pathMatch: 'full' //Redirection ou correspondance complète pour la racine
},

{
    path: 'entrereps',
    component: EntrerepsComponent,
    pathMatch: 'full' //Redirection ou correspondance complète pour la racine
},

{
    path: 'admin',
    component: AdminComponent,
    pathMatch: 'full' //Redirection ou correspondance complète pour la racine
},

{
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    pathMatch: 'full' //Redirection ou correspondance complète pour la racine
}
]