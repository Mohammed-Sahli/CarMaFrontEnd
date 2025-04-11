import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Vehicule {
  id?: number;
  immat: string;
  numero_chassis: string;
  marque: string;
  modele: string;
  carburant: string;
  dmec: Date;
  date_achat: Date;
  prix_achat: number;
  kilometrage_achat: number;
  utilisateur: {
    id: number;
    nom: string;
    prenom: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class VehiculesService {
  private apiUrl = 'http://localhost:3000/v/'; 

  constructor(private http: HttpClient) {}

  getVehicules(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "list");
  }

  createVehicule(vehicule: Vehicule): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Vehicule>('http://localhost:3000/v', vehicule, { headers });
  }

  updateVehicule(id: number, vehicule: Vehicule): Observable<Vehicule> {
    return this.http.put<Vehicule>(`${this.apiUrl}${id}`, vehicule);
  }

  deleteVehicule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}