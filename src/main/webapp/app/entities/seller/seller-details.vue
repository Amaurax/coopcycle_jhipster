<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="seller">
        <h2 class="jh-entity-heading" data-cy="sellerDetailsHeading">
          <span v-text="$t('myappApp.seller.detail.title')">Seller</span> {{ seller.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('myappApp.seller.name')">Name</span>
          </dt>
          <dd>
            <span>{{ seller.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('myappApp.seller.address')">Address</span>
          </dt>
          <dd>
            <span>{{ seller.address }}</span>
          </dd>
          <dt>
            <span v-text="$t('myappApp.seller.cooperative')">Cooperative</span>
          </dt>
          <dd>
            <div v-if="seller.cooperative">
              <router-link :to="{ name: 'CooperativeView', params: { cooperativeId: seller.cooperative.id } }">{{
                seller.cooperative.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="seller.id" :to="{ name: 'SellerEdit', params: { sellerId: seller.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./seller-details.component.ts"></script>
