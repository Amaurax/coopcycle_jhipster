<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="order">
        <h2 class="jh-entity-heading" data-cy="orderDetailsHeading">
          <span v-text="$t('myappApp.order.detail.title')">Order</span> {{ order.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('myappApp.order.number')">Number</span>
          </dt>
          <dd>
            <span>{{ order.number }}</span>
          </dd>
          <dt>
            <span v-text="$t('myappApp.order.price')">Price</span>
          </dt>
          <dd>
            <span>{{ order.price }}</span>
          </dd>
          <dt>
            <span v-text="$t('myappApp.order.orderDate')">Order Date</span>
          </dt>
          <dd>
            <span v-if="order.orderDate">{{ $d(Date.parse(order.orderDate), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('myappApp.order.deliveryDate')">Delivery Date</span>
          </dt>
          <dd>
            <span v-if="order.deliveryDate">{{ $d(Date.parse(order.deliveryDate), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('myappApp.order.deliveryAddress')">Delivery Address</span>
          </dt>
          <dd>
            <span>{{ order.deliveryAddress }}</span>
          </dd>
          <dt>
            <span v-text="$t('myappApp.order.status')">Status</span>
          </dt>
          <dd>
            <span v-text="$t('myappApp.Status.' + order.status)">{{ order.status }}</span>
          </dd>
          <dt>
            <span v-text="$t('myappApp.order.paymentType')">Payment Type</span>
          </dt>
          <dd>
            <span v-text="$t('myappApp.PaymentType.' + order.paymentType)">{{ order.paymentType }}</span>
          </dd>
          <dt>
            <span v-text="$t('myappApp.order.client')">Client</span>
          </dt>
          <dd>
            <div v-if="order.client">
              <router-link :to="{ name: 'ClientView', params: { clientId: order.client.id } }">{{ order.client.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('myappApp.order.seller')">Seller</span>
          </dt>
          <dd>
            <div v-if="order.seller">
              <router-link :to="{ name: 'SellerView', params: { sellerId: order.seller.id } }">{{ order.seller.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('myappApp.order.courier')">Courier</span>
          </dt>
          <dd>
            <div v-if="order.courier">
              <router-link :to="{ name: 'CourierView', params: { courierId: order.courier.id } }">{{ order.courier.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('myappApp.order.products')">Products</span>
          </dt>
          <dd>
            <span v-for="(products, i) in order.products" :key="products.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'ProductView', params: { productId: products.id } }">{{ products.id }}</router-link>
            </span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="order.id" :to="{ name: 'OrderEdit', params: { orderId: order.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./order-details.component.ts"></script>
