import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface assurance {
  id?: number;
  vehicule_id: string;
  assureur: string;
  numero_police: string;
  type_assurance: string;
  date_debut: Date;
  date_fin: Date;
  cout_annuel: number;
}

@Injectable({
  providedIn: 'root'
})
export class assurancesService {
  private apiUrl = 'http://localhost:3000/a/'; 

  constructor(private http: HttpClient) {}

  getassurances(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "list");
  }

  createassurance(assurance: assurance): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<assurance>('http://localhost:3000/a', assurance, { headers });
  }

  updateassurance(id: number, assurance: assurance): Observable<assurance> {
    return this.http.put<assurance>(`${this.apiUrl}${id}`, assurance);
  }

  deleteassurance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}