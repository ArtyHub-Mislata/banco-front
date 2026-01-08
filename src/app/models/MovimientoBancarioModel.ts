import { CuentaModel } from "./CuentaModel";
import { OrigenMovimientoModel } from "./OrigenMovimientoModel";
import { TipoMovimientoModel } from "./TipoMovimientoModel";

export interface MovimientoBancarioModel {
    id?: number;
    tipoMovimiento: TipoMovimientoModel;
    origenMovimiento: OrigenMovimientoModel;
    fecha: Date;
    importe: number;
    concepto: string;
    cuenta: CuentaModel;
}