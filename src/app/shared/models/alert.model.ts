export interface Alert {
  message: string;
  type: AlertType;
}

export enum AlertType {
  SUCCESS = 'success',
  ERROR = 'error',
}
