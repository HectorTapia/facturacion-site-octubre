import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturacionService } from '../../services/facturacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IFactura } from '../../interfaces/IFactura';
import { ICliente } from '../../interfaces/ICliente';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrl: './crear-factura.component.scss'
})
export class CrearFacturaComponent implements OnInit{
  facturaForm!: FormGroup;
  facturaIdUpdate!: number;
  isUpdate: boolean = false;
  isLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    private facturacionService: FacturacionService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ){

  }

ngOnInit(): void{
  this.facturaForm = this.formBuilder.group({
    fecha: ['', Validators.required],
    monto: ['', Validators.required],
    detalle: ['', Validators.required],
    cliente: ['', Validators.required]
  });
  this.facturaIdUpdate = +this.route.snapshot.paramMap.get('id')!;
  if (this.facturaIdUpdate) {
    this.cargarFactura(this.facturaIdUpdate);
  }

}



onSubmit(): void{
  if (this.facturaForm.valid) {
    const nuevaFactura: IFactura = this.facturaForm.value;
    if (this.isUpdate) {
      // Actualizar
      nuevaFactura.id = this.facturaIdUpdate;
      this.facturacionService.createFactura(nuevaFactura).subscribe(
        (response: any) => {
          console.log("Se actualizo la factura");
          this.router.navigate(['home', 'lista-facturas']);
          this.toastr.success('Exito', 'Se actualizo correctamente');
        },
        (error: any) => {
          this.toastr.error('Error', 'Error al actualizar la factura',{
            timeOut: 5000,
          });
        }
      )
    }else{
      // Guardar
      this.facturacionService.createFactura(nuevaFactura).subscribe(
        (response: any) => {
          console.log('Se guardo una nueva factura');
          this.router.navigate(['home', 'lista-facturas']);
          this.toastr.success('Exito', 'Se guardo correctamente')
        }
      )
    }
  }else{
    this.toastr.error('Error', 'Los datos no estan en el formato correcto',{
      timeOut: 5000,
    });
  }
  }

cargarFactura(id:number){
  this.facturacionService.getFacturaById(id).subscribe(
    (factura: IFactura) => {
      this.facturaForm.patchValue({
        fecha: factura.fecha,
        monto: factura.monto,
        detalle: factura.detalle,
        cliente: factura.cliente.id
      });
      this.isUpdate = true;
      this.isLoading = false;
    }
  )
}


}
