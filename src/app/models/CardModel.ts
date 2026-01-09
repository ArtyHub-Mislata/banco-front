import { AccountModel } from "./AccountModel";

export interface CardModel {
    id?: number;
    numeroTarjeta: string;
    fechaCaducidad: Date;
    cvv: string;
    nombreCompleto: string;
    cuenta: AccountModel;
}