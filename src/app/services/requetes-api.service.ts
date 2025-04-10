import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiculesService {
  private apiUrl = 'http://localhost:3000/api/vehicules'; // Adaptez selon votre serveur
  private baseUrl = 'http://localhost:3000/api'; // Base URL for API endpoints
  private token: string | null = null; // Token for authentication

  constructor(private http: HttpClient) {}

  createVehicule(vehicule: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Suppression de l'ID si présent (géré par PostgreSQL)
    const { id, ...vehiculeData } = vehicule;
    
    return this.http.post(this.apiUrl, vehiculeData, { headers }).pipe(
      catchError(error => {
        console.error('Erreur API:', error);
        return throwError(() => error);
      })
    );
  }
  
  login(body:any){
    return this.http.post<any>((`${this.baseUrl}/auth/login`), body);
  }
  getCustomers(){
   if(!this.token) {
      throw new Error('No authentification');
    }
    const headers= this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/customers`, {headers});
  }
  getProduct(){
    if(!this.token) {
      throw new Error('No authentification');
    }
    const headers= this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/products`, {headers});
  }
  getOrders(){
    if(!this.token) {
      throw new Error('No authentification');
    }
    const headers= this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/orders`, {headers});
  }
  getUsers(){
    if(!this.token) {
      throw new Error('No authentification');
    }
    const headers= this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/users`, {headers});
  }

  getOrderById(orderId: number): Observable<any> {
    if(!this.token) {
      throw new Error('No authentification');
    }
    const headers= this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/orders/${orderId}`, {headers});
  }

  getCustomerById(customerId: number): Observable<any> {
    if (!this.token) {
      throw new Error('No authentication token');
    }
    const headers= this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/customers/${customerId}`, { headers });
  }
  
  getProductById(productId: number): Observable<any> {
    if (!this.token) {
      throw new Error('No authentication token');
    }
    const headers= this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/products/${productId}`, { headers });
  }

  createOrder(orderData: any): Observable<any> {
    if(!this.token) {
      throw new Error('No authentification');
    }
    const headers= this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/orders`, orderData, {headers});
  }

  updateOrder(orderId: number, orderData: any): Observable<any> {
    if(!this.token) {
      throw new Error('No authentification');
    }
    const headers= this.getHeaders();
    return this.http.put<any>(`${this.baseUrl}/orders/${orderId}`, orderData, {headers});
  }

  updateCustomerOrders(customerId: number, customer: any): Observable<any> {
    if(!this.token) {
      throw new Error('No authentification');
    }
    const headers= this.getHeaders();
    return this.http.put(`${this.baseUrl}/customers/${customerId}`, customer, {headers});
  }
  createCustomer(customerData: any): Observable<any> {
    this.ensureToken();
    const headers= this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/customers`, customerData, {headers});
  }
  updateCustomer(customerId: number, customer: any): Observable<any> {
    if(!this.token) {
      throw new Error('No authentification');
    }
    const headers= this.getHeaders();
    return this.http.put(`${this.baseUrl}/customers/${customerId}`, customer, {headers});
  }
  deleteCustomer(customerId: number): Observable<any> {
    this.ensureToken();
    const headers= this.getHeaders();
    return this.http.delete<any>(`${this.baseUrl}/customers/${customerId}`, {headers});
  }
  updateProductStock(productId: number, updatedProduct: any): Observable<any> {
    if(!this.token) {
      throw new Error('No authentification');
    }
    const headers= this.getHeaders();
    return this.http.put<any>(`${this.baseUrl}/products/${productId}`, updatedProduct, {headers});
  }
  deleteOrder(orderId: number): Observable<any> {
    if (!this.token) {
      throw new Error('No authentification');
    }
    const headers= this.getHeaders();
    return this.http.delete(`${this.baseUrl}/orders/${orderId}`, { headers });
  }
   // Méthodes pour les produits
   createProduct(productData: any): Observable<any> {
    this.ensureToken();
    const headers= this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/products`, productData, { headers });
  }

  updateProduct(productId: number, productData: any): Observable<any> {
    this.ensureToken();
    const headers= this.getHeaders();
    return this.http.put<any>(`${this.baseUrl}/products/${productId}`, productData, { headers });
  }

  deleteProduct(productId: number): Observable<any> {
    this.ensureToken();
    const headers= this.getHeaders();
    return this.http.delete<any>(`${this.baseUrl}/products/${productId}`, { headers });
  }

  // Utilitaires
  private ensureToken(): void {
    if (!this.token) {
      throw new Error('No authentication token');
    }
  }

  private getHeaders(): HttpHeaders {
    this.ensureToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
  }
}
