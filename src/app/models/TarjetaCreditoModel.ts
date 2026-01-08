import { CuentaModel } from "./CuentaModel";

export interface TarjetaCreditoModel {
    id?: number;
    numeroTarjeta: string;
    fechaCaducidad: Date;
    cvv: string;
    nombreCompleto: string;
    cuenta: CuentaModel;
}