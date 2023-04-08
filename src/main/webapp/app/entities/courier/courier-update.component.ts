import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import CooperativeService from '@/entities/cooperative/cooperative.service';
import { ICooperative } from '@/shared/model/cooperative.model';

import { ICourier, Courier } from '@/shared/model/courier.model';
import CourierService from './courier.service';
import { VehicleType } from '@/shared/model/enumerations/vehicle-type.model';

const validations: any = {
  courier: {
    lastName: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30),
    },
    firstName: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30),
    },
    email: {
      required,
    },
    phone: {
      required,
    },
    vehicle: {},
    status: {},
  },
};

@Component({
  validations,
})
export default class CourierUpdate extends Vue {
  @Inject('courierService') private courierService: () => CourierService;
  @Inject('alertService') private alertService: () => AlertService;

  public courier: ICourier = new Courier();

  @Inject('cooperativeService') private cooperativeService: () => CooperativeService;

  public cooperatives: ICooperative[] = [];
  public vehicleTypeValues: string[] = Object.keys(VehicleType);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.courierId) {
        vm.retrieveCourier(to.params.courierId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.courier.id) {
      this.courierService()
        .update(this.courier)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('myappApp.courier.updated', { param: param.id });
          return (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.courierService()
        .create(this.courier)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('myappApp.courier.created', { param: param.id });
          (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveCourier(courierId): void {
    this.courierService()
      .find(courierId)
      .then(res => {
        this.courier = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.cooperativeService()
      .retrieve()
      .then(res => {
        this.cooperatives = res.data;
      });
  }
}
