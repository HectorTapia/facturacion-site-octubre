import { ICliente } from "./ICliente";

export interface IFactura{
    id: number,
    fecha: string,
    monto: number,
    detalle: string,
    cliente: ICliente
}