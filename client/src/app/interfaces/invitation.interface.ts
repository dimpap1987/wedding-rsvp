export interface Invintation {
  _id?: string;
  uuid?: string;
  lastName?: string;
  email?: string;
  mobile?: number;
  registered?: boolean;
  emailSent?: boolean;
  smsSent?: boolean;
  dateCreated?: string;
  dateAccepted?: string;
  qrcode?: string;
  numberOfAdults?:number;
  numberOfChildren?:number;
}