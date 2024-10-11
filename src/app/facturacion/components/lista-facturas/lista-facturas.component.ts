import { Component, OnInit } from '@angular/core';
import { IFactura } from '../../interfaces/IFactura';
import { FacturacionService } from '../../services/facturacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrl: './lista-facturas.component.scss'
})
export class ListaFacturasComponent implements OnInit {
facturas: IFactura[] = [];
isLoading = true;

constructor(private facturacionService: FacturacionService,
            private router: Router
){

}

ngOnInit(): void {
    this._obtenerFacturas();
    
}

private _obtenerFacturas(){
  this.facturacionService.getFacturas().subscribe((data: any) =>{
    this.facturas = data.map((item: IFactura) => ({
      
      id: item.id,
      fecha: item.fecha,
      monto: item.monto,
      detalle: item.detalle,
      cliente: item.cliente,
    }));
    // console.log(this.facturas)
    this.isLoading = false;
  });
}

regresarHome(){
  this.router.navigateByUrl('/home');
}

eliminarFactura(factura: IFactura){
  this.facturacionService.deleteFactura(factura).subscribe((data: any) => {
    this._obtenerFacturas();
  })
}

editarFactura(factura: IFactura){
  this.router.navigate(['/home/editar-factura', factura.id]);
}

}
