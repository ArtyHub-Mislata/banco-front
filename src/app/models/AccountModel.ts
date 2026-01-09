import { CustomerModel } from "./CustomerModel";
import { TransactionModel } from "./TransactionModel";
import { CardModel } from "./CardModel";

export interface AccountModel {
    id?: number;
    saldo: number;
    iban: string;
    cliente: CustomerModel;
    tarjetas: CardModel[];
    movimientos: TransactionModel[];
}