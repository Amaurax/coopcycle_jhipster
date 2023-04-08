<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="myappApp.seller.home.createOrEditLabel"
          data-cy="SellerCreateUpdateHeading"
          v-text="$t('myappApp.seller.home.createOrEditLabel')"
        >
          Create or edit a Seller
        </h2>
        <div>
          <div class="form-group" v-if="seller.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="seller.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.seller.name')" for="seller-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="seller-name"
              data-cy="name"
              :class="{ valid: !$v.seller.name.$invalid, invalid: $v.seller.name.$invalid }"
              v-model="$v.seller.name.$model"
              required
            />
            <div v-if="$v.seller.name.$anyDirty && $v.seller.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.seller.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.seller.address')" for="seller-address">Address</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="seller-address"
              data-cy="address"
              :class="{ valid: !$v.seller.address.$invalid, invalid: $v.seller.address.$invalid }"
              v-model="$v.seller.address.$model"
              required
            />
            <div v-if="$v.seller.address.$anyDirty && $v.seller.address.$invalid">
              <small class="form-text text-danger" v-if="!$v.seller.address.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.seller.cooperative')" for="seller-cooperative">Cooperative</label>
            <select class="form-control" id="seller-cooperative" data-cy="cooperative" name="cooperative" v-model="seller.cooperative">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="seller.cooperative && cooperativeOption.id === seller.cooperative.id ? seller.cooperative : cooperativeOption"
                v-for="cooperativeOption in cooperatives"
                :key="cooperativeOption.id"
              >
                {{ cooperativeOption.id }}
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
            :disabled="$v.seller.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./seller-update.component.ts"></script>
