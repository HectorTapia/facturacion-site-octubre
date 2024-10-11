import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { FacturacionComponent } from './facturacion.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaFacturasComponent } from './components/lista-facturas/lista-facturas.component';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';


@NgModule({
  declarations: [
    FacturacionComponent,
    ListaClientesComponent,
    CrearClienteComponent,
    ListaFacturasComponent,
    CrearFacturaComponent
  ],
  imports: [
    CommonModule,
    FacturacionRoutingModule,
    ReactiveFormsModule
  ]
})
export class FacturacionModule { }
