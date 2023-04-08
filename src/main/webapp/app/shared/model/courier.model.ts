import { ICooperative } from '@/shared/model/cooperative.model';

import { VehicleType } from '@/shared/model/enumerations/vehicle-type.model';
export interface ICourier {
  id?: number;
  lastName?: string;
  firstName?: string;
  email?: string;
  phone?: string;
  vehicle?: VehicleType | null;
  status?: string | null;
  cooperative?: ICooperative | null;
}

export class Courier implements ICourier {
  constructor(
    public id?: number,
    public lastName?: string,
    public firstName?: string,
    public email?: string,
    public phone?: string,
    public vehicle?: VehicleType | null,
    public status?: string | null,
    public cooperative?: ICooperative | null
  ) {}
}
