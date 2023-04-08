import { IClient } from '@/shared/model/client.model';
import { ISeller } from '@/shared/model/seller.model';
import { ICourier } from '@/shared/model/courier.model';

export interface ICooperative {
  id?: number;
  name?: string;
  address?: string | null;
  director?: string | null;
  clients?: IClient[] | null;
  sellers?: ISeller[] | null;
  couriers?: ICourier[] | null;
}

export class Cooperative implements ICooperative {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string | null,
    public director?: string | null,
    public clients?: IClient[] | null,
    public sellers?: ISeller[] | null,
    public couriers?: ICourier[] | null
  ) {}
}
