import { ICooperative } from '@/shared/model/cooperative.model';
import { IProduct } from '@/shared/model/product.model';

export interface ISeller {
  id?: number;
  name?: string;
  address?: string;
  cooperative?: ICooperative | null;
  products?: IProduct[] | null;
}

export class Seller implements ISeller {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public cooperative?: ICooperative | null,
    public products?: IProduct[] | null
  ) {}
}
