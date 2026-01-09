import { AccountModel } from "./AccountModel";
import { TransactionOriginModel } from "./TransactionOriginModel";
import { TransactionType } from "./TransactionType";

export interface TransactionModel {
    id?: number;
    tipoMovimiento: TransactionType;
    origenMovimiento: TransactionOriginModel;
    fecha: Date;
    importe: number;
    concepto: string;
    cuenta: AccountModel;
}