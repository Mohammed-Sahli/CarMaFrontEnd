import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Vehicule, VehiculesService } from '../services/vehicules/vehicules.service'; 
import { AuthService } from '../services/auth.service'; // Assurez-vous que le chemin est correct
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SharedheaderComponent } from '../sharedheader/sharedheader.component'; // Assurez-vous que le chemin est correct  


@Component({
  selector: 'app-vehicule-management',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SharedheaderComponent],
  standalone: true 
})

export class VehiculesComponent implements OnInit {
    vehicules: Vehicule[] = [];
    utilisateurs: any[] = []; // Replace 'any' with the correct type once defined or imported
    vehiculeForm: FormGroup;
    selectedVehicule: Vehicule | null = null;
    hoveredVehicule: number | null = null;
    isCreating: boolean = false; // Ajoutez cette ligne
    currentUser: any = null;

  constructor(private fb: FormBuilder, private vehiculesService: VehiculesService, private http: HttpClient, private authService: AuthService) {
    this.vehiculeForm = this.fb.group({
      immat: ['', Validators.required],
      numero_chassis: ['', Validators.required],
      marque: ['', Validators.required],
      modele: [''],
      carburant: ['', Validators.required],
      dmec: ['', Validators.required],
      date_achat: ['', Validators.required],
      prix_achat: [0, [Validators.required, Validators.min(0)]],
      kilometrage_achat: [0, [Validators.required, Validators.min(0)]],
      utilisateur_id: ['', Validators.required], // 👈 ici
    });
  }

  loadUtilisateurs(): void {
    const token = localStorage.getItem('token');
    const headers = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  
    this.http.get<any[]>('http://localhost:3000/auth/list', headers).subscribe({
      next: (data) => {
        this.utilisateurs = data;
        console.log('Utilisateurs chargés:', data); // Vérifie que les utilisateurs sont bien récupérés ici
      },
      error: (err) => console.error('Erreur lors du chargement des utilisateurs:', err)
    });
  }

  ngOnInit(): void {
    this.loadVehicules();
    this.loadUtilisateurs(); 

    this.currentUser = this.authService.getCurrentUser(); 
    console.log('Utilisateur connecté :', this.currentUser);
  
  }

  loadVehicules(): void {
    this.vehiculesService.getVehicules().subscribe({
      next: (vehicules) => {
        this.vehicules = vehicules.sort((a, b) => a.id! - b.id!); // Tri local sur le frontend
      },
      error: (err) => {
        console.error('Erreur lors du chargement des véhicules:', err);
        alert('Erreur lors du chargement des véhicules');
      }
    });
  }

  startCreating(): void {
    this.resetForm();
    this.isCreating = true;
  }

  editVehicule(vehicule: Vehicule): void {
    this.selectedVehicule = vehicule;
    this.vehiculeForm.patchValue(vehicule);
    this.isCreating = true; // Affiche le formulaire en mode édition
  }

  deleteVehicule(id: number): void {
    if (confirm('Supprimer ce véhicule ?')) {
      this.vehiculesService.deleteVehicule(id).subscribe({
        next: () => this.loadVehicules(),
        error: (err) => console.error('Erreur suppression:', err)
      });
    }
  }

  submitForm(): void {
    if (this.vehiculeForm.valid) {
        const formData = this.vehiculeForm.value;

      // Conversion de utilisateurId en nombre
      formData.utilisateur_id = +formData.utilisateur_id; // Utilise le + pour convertir en nombre

        console.log('Données envoyées:', formData);

        // Conversion des dates au format ISO
        if (formData.dmec) formData.dmec = new Date(formData.dmec).toISOString();
        if (formData.date_achat) formData.date_achat = new Date(formData.date_achat).toISOString();

        console.log('Données envoyées:', JSON.stringify(formData, null, 2));
      
        if (this.selectedVehicule) {
          // Demander confirmation avant la mise à jour
          if (confirm('Confirmez-vous la modification de ce véhicule ?')) {
            this.vehiculesService.updateVehicule(this.selectedVehicule.id!, formData).subscribe({
              next: () => {
                this.loadVehicules();
                // Une fois les véhicules récupérés, on les trie par ID croissant
                this.vehicules = [...this.vehicules].sort((a, b) => a.id! - b.id!);
                this.resetForm();
                alert('Véhicule mis à jour avec succès !');
              },
              error: (err) => {
                console.error('Erreur lors de la mise à jour:', err);
                alert('Erreur lors de la mise à jour du véhicule');
              }
            });
          }
        } else {
          this.vehiculesService.createVehicule(formData).subscribe({
            next: (serverResponse) => {
              console.log('Réponse du serveur:', serverResponse);
              this.vehicules = [...this.vehicules, serverResponse.vehiculeResponse].sort((a, b) => a.id! - b.id!); // Tri après ajout
              this.resetForm();
              alert('Véhicule créé avec succès!');
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
    this.vehiculeForm.reset();
    this.selectedVehicule = null;
    this.isCreating = false;
  }

}