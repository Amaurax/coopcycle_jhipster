import { IClient } from '@/shared/model/client.model';
import { ISeller } from '@/shared/model/seller.model';
import { ICourier } from '@/shared/model/courier.model';
import { IProduct } from '@/shared/model/product.model';

import { Status } from '@/shared/model/enumerations/status.model';
import { PaymentType } from '@/shared/model/enumerations/payment-type.model';
export interface IOrder {
  id?: number;
  number?: number;
  price?: number;
  orderDate?: Date;
  deliveryDate?: Date | null;
  deliveryAddress?: string | null;
  status?: Status | null;
  paymentType?: PaymentType;
  client?: IClient | null;
  seller?: ISeller | null;
  courier?: ICourier | null;
  products?: IProduct[] | null;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public number?: number,
    public price?: number,
    public orderDate?: Date,
    public deliveryDate?: Date | null,
    public deliveryAddress?: string | null,
    public status?: Status | null,
    public paymentType?: PaymentType,
    public client?: IClient | null,
    public seller?: ISeller | null,
    public courier?: ICourier | null,
    public products?: IProduct[] | null
  ) {}
}
