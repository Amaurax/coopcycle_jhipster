import { ICooperative } from '@/shared/model/cooperative.model';

export interface IClient {
  id?: number;
  lastName?: string;
  firstName?: string;
  email?: string;
  phone?: string;
  address?: string;
  cooperative?: ICooperative | null;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public lastName?: string,
    public firstName?: string,
    public email?: string,
    public phone?: string,
    public address?: string,
    public cooperative?: ICooperative | null
  ) {}
}
