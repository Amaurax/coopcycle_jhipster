import { ISeller } from '@/shared/model/seller.model';
import { IOrder } from '@/shared/model/order.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string | null;
  price?: number;
  seller?: ISeller | null;
  orders?: IOrder[] | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public price?: number,
    public seller?: ISeller | null,
    public orders?: IOrder[] | null
  ) {}
}
