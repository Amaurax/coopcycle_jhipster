<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="myappApp.courier.home.createOrEditLabel"
          data-cy="CourierCreateUpdateHeading"
          v-text="$t('myappApp.courier.home.createOrEditLabel')"
        >
          Create or edit a Courier
        </h2>
        <div>
          <div class="form-group" v-if="courier.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="courier.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.courier.lastName')" for="courier-lastName">Last Name</label>
            <input
              type="text"
              class="form-control"
              name="lastName"
              id="courier-lastName"
              data-cy="lastName"
              :class="{ valid: !$v.courier.lastName.$invalid, invalid: $v.courier.lastName.$invalid }"
              v-model="$v.courier.lastName.$model"
              required
            />
            <div v-if="$v.courier.lastName.$anyDirty && $v.courier.lastName.$invalid">
              <small class="form-text text-danger" v-if="!$v.courier.lastName.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.courier.lastName.minLength"
                v-text="$t('entity.validation.minlength', { min: 3 })"
              >
                This field is required to be at least 3 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.courier.lastName.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 30 })"
              >
                This field cannot be longer than 30 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.courier.firstName')" for="courier-firstName">First Name</label>
            <input
              type="text"
              class="form-control"
              name="firstName"
              id="courier-firstName"
              data-cy="firstName"
              :class="{ valid: !$v.courier.firstName.$invalid, invalid: $v.courier.firstName.$invalid }"
              v-model="$v.courier.firstName.$model"
              required
            />
            <div v-if="$v.courier.firstName.$anyDirty && $v.courier.firstName.$invalid">
              <small class="form-text text-danger" v-if="!$v.courier.firstName.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.courier.firstName.minLength"
                v-text="$t('entity.validation.minlength', { min: 3 })"
              >
                This field is required to be at least 3 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.courier.firstName.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 30 })"
              >
                This field cannot be longer than 30 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.courier.email')" for="courier-email">Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="courier-email"
              data-cy="email"
              :class="{ valid: !$v.courier.email.$invalid, invalid: $v.courier.email.$invalid }"
              v-model="$v.courier.email.$model"
              required
            />
            <div v-if="$v.courier.email.$anyDirty && $v.courier.email.$invalid">
              <small class="form-text text-danger" v-if="!$v.courier.email.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.courier.email.pattern"
                v-text="$t('entity.validation.pattern', { pattern: 'Email' })"
              >
                This field should follow pattern for "Email".
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.courier.phone')" for="courier-phone">Phone</label>
            <input
              type="text"
              class="form-control"
              name="phone"
              id="courier-phone"
              data-cy="phone"
              :class="{ valid: !$v.courier.phone.$invalid, invalid: $v.courier.phone.$invalid }"
              v-model="$v.courier.phone.$model"
              required
            />
            <div v-if="$v.courier.phone.$anyDirty && $v.courier.phone.$invalid">
              <small class="form-text text-danger" v-if="!$v.courier.phone.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.courier.phone.pattern"
                v-text="$t('entity.validation.pattern', { pattern: 'Phone' })"
              >
                This field should follow pattern for "Phone".
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.courier.vehicle')" for="courier-vehicle">Vehicle</label>
            <select
              class="form-control"
              name="vehicle"
              :class="{ valid: !$v.courier.vehicle.$invalid, invalid: $v.courier.vehicle.$invalid }"
              v-model="$v.courier.vehicle.$model"
              id="courier-vehicle"
              data-cy="vehicle"
            >
              <option
                v-for="vehicleType in vehicleTypeValues"
                :key="vehicleType"
                v-bind:value="vehicleType"
                v-bind:label="$t('myappApp.VehicleType.' + vehicleType)"
              >
                {{ vehicleType }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.courier.status')" for="courier-status">Status</label>
            <input
              type="text"
              class="form-control"
              name="status"
              id="courier-status"
              data-cy="status"
              :class="{ valid: !$v.courier.status.$invalid, invalid: $v.courier.status.$invalid }"
              v-model="$v.courier.status.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('myappApp.courier.cooperative')" for="courier-cooperative">Cooperative</label>
            <select class="form-control" id="courier-cooperative" data-cy="cooperative" name="cooperative" v-model="courier.cooperative">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  courier.cooperative && cooperativeOption.id === courier.cooperative.id ? courier.cooperative : cooperativeOption
                "
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
            :disabled="$v.courier.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./courier-update.component.ts"></script>
