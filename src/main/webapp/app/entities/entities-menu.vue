<template>
  <div>
    <b-dropdown-item to="/client">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.client')">Client</span>
    </b-dropdown-item>
    <b-dropdown-item to="/seller">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.seller')">Seller</span>
    </b-dropdown-item>
    <b-dropdown-item to="/courier">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.courier')">Courier</span>
    </b-dropdown-item>
    <b-dropdown-item to="/order">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.order')">Order</span>
    </b-dropdown-item>
    <b-dropdown-item to="/cooperative">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.cooperative')">Cooperative</span>
    </b-dropdown-item>
    <b-dropdown-item to="/product">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.product')">Product</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
