import { Injectable } from '@angular/core';
import { enviroments } from '../../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { ICliente } from '../interfaces/ICliente';
import { Observable } from 'rxjs';
import { IFactura } from '../interfaces/IFactura';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  private URL: string = enviroments.backUrl; 

  constructor(private http: HttpClient) { }

  getClientes() : Observable<ICliente[]> {
    return this.http.get<ICliente[]>(`${this.URL}/clientes`);
  }

  //crear
  createCliente(cliente: ICliente): Observable<any> {
    return this.http.post<any>(`${this.URL}/guardar-cliente`, cliente);
  }

  //buscar por id
  getClienteById(id: number): Observable<ICliente>{
    return this.http.get<ICliente>(`${this.URL}/clientes/${id}`);
  }

  //eliminar
  deleteCliente(cliente: ICliente): Observable<any>{
    return this.http.delete<any>(`${this.URL}/delete-cliente/${cliente.id}`);
  }

  getFacturas() : Observable<IFactura[]>{
    return this.http.get<IFactura[]>(`${this.URL}/facturas`);
  }

  // Eliminar Factura
  deleteFactura(factura: IFactura): Observable<any>{
    return this.http.delete<any>(`${this.URL}/facturas/${factura.id}`);
  }

  // Buscar por id Facturas
  getFacturaById(id: number): Observable<IFactura>{
    return this.http.get<IFactura>(`${this.URL}/facturas/${id}`);
  }

  // Crar factura
  createFactura(factura: IFactura): Observable<any>{
    return this.http.post<any>(`${this.URL}/guardar-factura`, factura);
  }

}
