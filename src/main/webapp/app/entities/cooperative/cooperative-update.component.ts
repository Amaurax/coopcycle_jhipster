import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import ClientService from '@/entities/client/client.service';
import { IClient } from '@/shared/model/client.model';

import SellerService from '@/entities/seller/seller.service';
import { ISeller } from '@/shared/model/seller.model';

import CourierService from '@/entities/courier/courier.service';
import { ICourier } from '@/shared/model/courier.model';

import { ICooperative, Cooperative } from '@/shared/model/cooperative.model';
import CooperativeService from './cooperative.service';

const validations: any = {
  cooperative: {
    name: {
      required,
    },
    address: {},
    director: {},
  },
};

@Component({
  validations,
})
export default class CooperativeUpdate extends Vue {
  @Inject('cooperativeService') private cooperativeService: () => CooperativeService;
  @Inject('alertService') private alertService: () => AlertService;

  public cooperative: ICooperative = new Cooperative();

  @Inject('clientService') private clientService: () => ClientService;

  public clients: IClient[] = [];

  @Inject('sellerService') private sellerService: () => SellerService;

  public sellers: ISeller[] = [];

  @Inject('courierService') private courierService: () => CourierService;

  public couriers: ICourier[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cooperativeId) {
        vm.retrieveCooperative(to.params.cooperativeId);
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
    if (this.cooperative.id) {
      this.cooperativeService()
        .update(this.cooperative)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('myappApp.cooperative.updated', { param: param.id });
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
      this.cooperativeService()
        .create(this.cooperative)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('myappApp.cooperative.created', { param: param.id });
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

  public retrieveCooperative(cooperativeId): void {
    this.cooperativeService()
      .find(cooperativeId)
      .then(res => {
        this.cooperative = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.clientService()
      .retrieve()
      .then(res => {
        this.clients = res.data;
      });
    this.sellerService()
      .retrieve()
      .then(res => {
        this.sellers = res.data;
      });
    this.courierService()
      .retrieve()
      .then(res => {
        this.couriers = res.data;
      });
  }
}
