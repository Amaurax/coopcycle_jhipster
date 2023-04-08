import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import ClientService from './client/client.service';
import SellerService from './seller/seller.service';
import CourierService from './courier/courier.service';
import OrderService from './order/order.service';
import CooperativeService from './cooperative/cooperative.service';
import ProductService from './product/product.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('clientService') private clientService = () => new ClientService();
  @Provide('sellerService') private sellerService = () => new SellerService();
  @Provide('courierService') private courierService = () => new CourierService();
  @Provide('orderService') private orderService = () => new OrderService();
  @Provide('cooperativeService') private cooperativeService = () => new CooperativeService();
  @Provide('productService') private productService = () => new ProductService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
