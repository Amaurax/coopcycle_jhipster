import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Client = () => import('@/entities/client/client.vue');
// prettier-ignore
const ClientUpdate = () => import('@/entities/client/client-update.vue');
// prettier-ignore
const ClientDetails = () => import('@/entities/client/client-details.vue');
// prettier-ignore
const Seller = () => import('@/entities/seller/seller.vue');
// prettier-ignore
const SellerUpdate = () => import('@/entities/seller/seller-update.vue');
// prettier-ignore
const SellerDetails = () => import('@/entities/seller/seller-details.vue');
// prettier-ignore
const Courier = () => import('@/entities/courier/courier.vue');
// prettier-ignore
const CourierUpdate = () => import('@/entities/courier/courier-update.vue');
// prettier-ignore
const CourierDetails = () => import('@/entities/courier/courier-details.vue');
// prettier-ignore
const Order = () => import('@/entities/order/order.vue');
// prettier-ignore
const OrderUpdate = () => import('@/entities/order/order-update.vue');
// prettier-ignore
const OrderDetails = () => import('@/entities/order/order-details.vue');
// prettier-ignore
const Cooperative = () => import('@/entities/cooperative/cooperative.vue');
// prettier-ignore
const CooperativeUpdate = () => import('@/entities/cooperative/cooperative-update.vue');
// prettier-ignore
const CooperativeDetails = () => import('@/entities/cooperative/cooperative-details.vue');
// prettier-ignore
const Product = () => import('@/entities/product/product.vue');
// prettier-ignore
const ProductUpdate = () => import('@/entities/product/product-update.vue');
// prettier-ignore
const ProductDetails = () => import('@/entities/product/product-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'client',
      name: 'Client',
      component: Client,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client/new',
      name: 'ClientCreate',
      component: ClientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client/:clientId/edit',
      name: 'ClientEdit',
      component: ClientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client/:clientId/view',
      name: 'ClientView',
      component: ClientDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'seller',
      name: 'Seller',
      component: Seller,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'seller/new',
      name: 'SellerCreate',
      component: SellerUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'seller/:sellerId/edit',
      name: 'SellerEdit',
      component: SellerUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'seller/:sellerId/view',
      name: 'SellerView',
      component: SellerDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'courier',
      name: 'Courier',
      component: Courier,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'courier/new',
      name: 'CourierCreate',
      component: CourierUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'courier/:courierId/edit',
      name: 'CourierEdit',
      component: CourierUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'courier/:courierId/view',
      name: 'CourierView',
      component: CourierDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order',
      name: 'Order',
      component: Order,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order/new',
      name: 'OrderCreate',
      component: OrderUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order/:orderId/edit',
      name: 'OrderEdit',
      component: OrderUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order/:orderId/view',
      name: 'OrderView',
      component: OrderDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative',
      name: 'Cooperative',
      component: Cooperative,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative/new',
      name: 'CooperativeCreate',
      component: CooperativeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative/:cooperativeId/edit',
      name: 'CooperativeEdit',
      component: CooperativeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative/:cooperativeId/view',
      name: 'CooperativeView',
      component: CooperativeDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product',
      name: 'Product',
      component: Product,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product/new',
      name: 'ProductCreate',
      component: ProductUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product/:productId/edit',
      name: 'ProductEdit',
      component: ProductUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product/:productId/view',
      name: 'ProductView',
      component: ProductDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
