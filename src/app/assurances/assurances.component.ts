import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { assurance, assurancesService } from '../services/assurances/assurances.service'; 
import { AuthService } from '../services/auth.service'; // Assurez-vous que le chemin est correct
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SharedheaderComponent } from '../sharedheader/sharedheader.component'; // Assurez-vous que le chemin est correct  


@Component({
  selector: 'app-assurance-management',
  templateUrl: './assurances.component.html',
  styleUrls: ['./assurances.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SharedheaderComponent],
  standalone: true 
})

export class AssurancesComponent implements OnInit {
    assurances: any[] = [];
    utilisateurs: any[] = []; 
    vehicules: any[] = [];
    assuranceForm: FormGroup;
    selectedassurance: assurance | null = null;
    hoveredassurance: number | null = null;
    isCreating: boolean = false; 
    currentUser: any = null;

  constructor(private fb: FormBuilder, private assurancesService: assurancesService, private http: HttpClient, private authService: AuthService) {
    this.assuranceForm = this.fb.group({
      numero_police: ['', Validators.required],
      vehicule_id: ['', Validators.required],
      utilisateur_id: ['', Validators.required],
      assureur: [''],
      type_assurance: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      cout_annuel: [0, [Validators.required, Validators.min(0)]],
    });
  }

  loadUtilisateurs(): void {
    const token = localStorage.getItem('token');
    const headers = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  
    this.http.get<any[]>('http://localhost:3000/a/list', headers).subscribe({
      next: (data) => {
        this.utilisateurs = data;
        console.log('Utilisateurs chargés:', data); // Vérifie que les utilisateurs sont bien récupérés ici
      },
      error: (err) => console.error('Erreur lors du chargement des contrats d\'assurance', err)
    });
  }

  ngOnInit(): void {
    this.loadassurances();
    this.loadUtilisateurs(); 

    this.currentUser = this.authService.getCurrentUser(); 
    console.log('Utilisateur connecté :', this.currentUser);
  }

  loadassurances(): void {
    this.assurancesService.getassurances().subscribe({
      next: (assurances) => {
        this.assurances = assurances.sort((a, b) => a.id! - b.id!); // Tri local sur le frontend
      },
      error: (err) => {
        console.error('Erreur lors du chargement des assurances:', err);
        alert('Erreur lors du chargement des assurances');
      }
    });
  }

  startCreating(): void {
    this.resetForm();
    this.isCreating = true;
  }

  editassurance(assurance: assurance): void {
    this.selectedassurance = assurance;
    this.assuranceForm.patchValue(assurance);
    this.isCreating = true; // Affiche le formulaire en mode édition
  }

  deleteassurance(id: number): void {
    if (confirm('Supprimer ce contrat d\'assurance ?')) {
      this.assurancesService.deleteassurance(id).subscribe({
        next: () => this.loadassurances(),
        error: (err) => console.error('Erreur suppression:', err)
      });
    }
  }

  submitForm(): void {
    if (this.assuranceForm.valid) {
        const formData = this.assuranceForm.value;

      // Conversion de utilisateurId en nombre
      formData.utilisateur_id = +formData.utilisateur_id; // Utilise le + pour convertir en nombre

        console.log('Données envoyées:', formData);

        // Conversion des dates au format ISO
        if (formData.dmec) formData.dmec = new Date(formData.dmec).toISOString();
        if (formData.date_achat) formData.date_achat = new Date(formData.date_achat).toISOString();

        console.log('Données envoyées:', JSON.stringify(formData, null, 2));
      
        if (this.selectedassurance) {
          // Demander confirmation avant la mise à jour
          if (confirm('Confirmez-vous la modification de ce contrat d\'assurance ?')) {
            this.assurancesService.updateassurance(this.selectedassurance.id!, formData).subscribe({
              next: () => {
                this.loadassurances();
                // Une fois les assurances récupérés, on les trie par ID croissant
                this.assurances = [...this.assurances].sort((a, b) => a.id! - b.id!);
                this.resetForm();
                alert('Contrzt d\'assurance mis à jour avec succès !');
              },
              error: (err) => {
                console.error('Erreur lors de la mise à jour:', err);
                alert('Erreur lors de la mise à jour du contrat d\'assurance');
              }
            });
          }
        } else {
          this.assurancesService.createassurance(formData).subscribe({
            next: (serverResponse) => {
              console.log('Réponse du serveur:', serverResponse);
              this.assurances = [...this.assurances, serverResponse.assuranceResponse].sort((a, b) => a.id! - b.id!); // Tri après ajout
              this.resetForm();
              alert('Contrat d\'assurance créé avec succès!');
            },
          error: (err) => {
            console.group('Erreur détaillée');
            console.error('Statut:', err.status);
            console.error('Message:', err.message);
            console.error('URL:', err.url);
            console.error('Erreur complète:', err);
            console.groupEnd();
        
            let errorMessage = 'Erreur lors de la création';
            if (err.error?.message) {
              errorMessage += `: ${err.error.message}`;
            } else if (err.message) {
              errorMessage += `: ${err.message}`;
            }
        
            alert(errorMessage);
          }
        });
      }
    }
  }

  resetForm(): void {
    this.assuranceForm.reset();
    this.selectedassurance = null;
    this.isCreating = false;
  }

}