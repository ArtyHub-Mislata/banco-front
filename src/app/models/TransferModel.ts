export interface TransferRequest {
  autorizacion: Autorizacion;
  origen: Cuenta;
  destino: Cuenta;
  pago: Pago;
}

export interface Autorizacion {
  login: string;
  api_token: string;
}

export interface Cuenta {
  iban: string;
}

export interface Pago {
  importe: number;
  concepto: string;
}
