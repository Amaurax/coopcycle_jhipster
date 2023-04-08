<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="myappApp.order.home.createOrEditLabel"
          data-cy="OrderCreateUpdateHeading"
          v-text="$t('myappApp.order.home.createOrEditLabel')"
        >
          Create or edit a Order
        </h2>
        <div>
          <div class="form-group" v-if="order.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="order.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.order.number')" for="order-number">Number</label>
            <input
              type="number"
              class="form-control"
              name="number"
              id="order-number"
              data-cy="number"
              :class="{ valid: !$v.order.number.$invalid, invalid: $v.order.number.$invalid }"
              v-model.number="$v.order.number.$model"
              required
            />
            <div v-if="$v.order.number.$anyDirty && $v.order.number.$invalid">
              <small class="form-text text-danger" v-if="!$v.order.number.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.order.number.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.order.price')" for="order-price">Price</label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="order-price"
              data-cy="price"
              :class="{ valid: !$v.order.price.$invalid, invalid: $v.order.price.$invalid }"
              v-model.number="$v.order.price.$model"
              required
            />
            <div v-if="$v.order.price.$anyDirty && $v.order.price.$invalid">
              <small class="form-text text-danger" v-if="!$v.order.price.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.order.price.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.order.orderDate')" for="order-orderDate">Order Date</label>
            <div class="d-flex">
              <input
                id="order-orderDate"
                data-cy="orderDate"
                type="datetime-local"
                class="form-control"
                name="orderDate"
                :class="{ valid: !$v.order.orderDate.$invalid, invalid: $v.order.orderDate.$invalid }"
                required
                :value="convertDateTimeFromServer($v.order.orderDate.$model)"
                @change="updateZonedDateTimeField('orderDate', $event)"
              />
            </div>
            <div v-if="$v.order.orderDate.$anyDirty && $v.order.orderDate.$invalid">
              <small class="form-text text-danger" v-if="!$v.order.orderDate.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.order.orderDate.ZonedDateTimelocal"
                v-text="$t('entity.validation.ZonedDateTimelocal')"
              >
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.order.deliveryDate')" for="order-deliveryDate">Delivery Date</label>
            <div class="d-flex">
              <input
                id="order-deliveryDate"
                data-cy="deliveryDate"
                type="datetime-local"
                class="form-control"
                name="deliveryDate"
                :class="{ valid: !$v.order.deliveryDate.$invalid, invalid: $v.order.deliveryDate.$invalid }"
                :value="convertDateTimeFromServer($v.order.deliveryDate.$model)"
                @change="updateZonedDateTimeField('deliveryDate', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.order.deliveryAddress')" for="order-deliveryAddress"
              >Delivery Address</label
            >
            <input
              type="text"
              class="form-control"
              name="deliveryAddress"
              id="order-deliveryAddress"
              data-cy="deliveryAddress"
              :class="{ valid: !$v.order.deliveryAddress.$invalid, invalid: $v.order.deliveryAddress.$invalid }"
              v-model="$v.order.deliveryAddress.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.order.status')" for="order-status">Status</label>
            <select
              class="form-control"
              name="status"
              :class="{ valid: !$v.order.status.$invalid, invalid: $v.order.status.$invalid }"
              v-model="$v.order.status.$model"
              id="order-status"
              data-cy="status"
            >
              <option v-for="status in statusValues" :key="status" v-bind:value="status" v-bind:label="$t('myappApp.Status.' + status)">
                {{ status }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.order.paymentType')" for="order-paymentType">Payment Type</label>
            <select
              class="form-control"
              name="paymentType"
              :class="{ valid: !$v.order.paymentType.$invalid, invalid: $v.order.paymentType.$invalid }"
              v-model="$v.order.paymentType.$model"
              id="order-paymentType"
              data-cy="paymentType"
              required
            >
              <option
                v-for="paymentType in paymentTypeValues"
                :key="paymentType"
                v-bind:value="paymentType"
                v-bind:label="$t('myappApp.PaymentType.' + paymentType)"
              >
                {{ paymentType }}
              </option>
            </select>
            <div v-if="$v.order.paymentType.$anyDirty && $v.order.paymentType.$invalid">
              <small class="form-text text-danger" v-if="!$v.order.paymentType.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.order.client')" for="order-client">Client</label>
            <select class="form-control" id="order-client" data-cy="client" name="client" v-model="order.client">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="order.client && clientOption.id === order.client.id ? order.client : clientOption"
                v-for="clientOption in clients"
                :key="clientOption.id"
              >
                {{ clientOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.order.seller')" for="order-seller">Seller</label>
            <select class="form-control" id="order-seller" data-cy="seller" name="seller" v-model="order.seller">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="order.seller && sellerOption.id === order.seller.id ? order.seller : sellerOption"
                v-for="sellerOption in sellers"
                :key="sellerOption.id"
              >
                {{ sellerOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.order.courier')" for="order-courier">Courier</label>
            <select class="form-control" id="order-courier" data-cy="courier" name="courier" v-model="order.courier">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="order.courier && courierOption.id === order.courier.id ? order.courier : courierOption"
                v-for="courierOption in couriers"
                :key="courierOption.id"
              >
                {{ courierOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label v-text="$t('myappApp.order.products')" for="order-products">Products</label>
            <select
              class="form-control"
              id="order-products"
              data-cy="products"
              multiple
              name="products"
              v-if="order.products !== undefined"
              v-model="order.products"
            >
              <option v-bind:value="getSelected(order.products, productOption)" v-for="productOption in products" :key="productOption.id">
                {{ productOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.order.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./order-update.component.ts"></script>
