import { ClienteModel } from "./ClienteModel";
import { MovimientoBancarioModel } from "./MovimientoBancarioModel";
import { TarjetaCreditoModel } from "./TarjetaCreditoModel";

export interface CuentaModel {
    id?: number;
    saldo: number;
    iban: string;
    cliente: ClienteModel;
    tarjetas: TarjetaCreditoModel[];
    movimientos: MovimientoBancarioModel[];
}