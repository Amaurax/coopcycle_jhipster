import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import ClientService from '@/entities/client/client.service';
import { IClient } from '@/shared/model/client.model';

import SellerService from '@/entities/seller/seller.service';
import { ISeller } from '@/shared/model/seller.model';

import CourierService from '@/entities/courier/courier.service';
import { ICourier } from '@/shared/model/courier.model';

import ProductService from '@/entities/product/product.service';
import { IProduct } from '@/shared/model/product.model';

import { IOrder, Order } from '@/shared/model/order.model';
import OrderService from './order.service';
import { Status } from '@/shared/model/enumerations/status.model';
import { PaymentType } from '@/shared/model/enumerations/payment-type.model';

const validations: any = {
  order: {
    number: {
      required,
      numeric,
    },
    price: {
      required,
      numeric,
    },
    orderDate: {
      required,
    },
    deliveryDate: {},
    deliveryAddress: {},
    status: {},
    paymentType: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class OrderUpdate extends Vue {
  @Inject('orderService') private orderService: () => OrderService;
  @Inject('alertService') private alertService: () => AlertService;

  public order: IOrder = new Order();

  @Inject('clientService') private clientService: () => ClientService;

  public clients: IClient[] = [];

  @Inject('sellerService') private sellerService: () => SellerService;

  public sellers: ISeller[] = [];

  @Inject('courierService') private courierService: () => CourierService;

  public couriers: ICourier[] = [];

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];
  public statusValues: string[] = Object.keys(Status);
  public paymentTypeValues: string[] = Object.keys(PaymentType);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.orderId) {
        vm.retrieveOrder(to.params.orderId);
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
    this.order.products = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.order.id) {
      this.orderService()
        .update(this.order)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('myappApp.order.updated', { param: param.id });
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
      this.orderService()
        .create(this.order)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('myappApp.order.created', { param: param.id });
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

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.order[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.order[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.order[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.order[field] = null;
    }
  }

  public retrieveOrder(orderId): void {
    this.orderService()
      .find(orderId)
      .then(res => {
        res.orderDate = new Date(res.orderDate);
        res.deliveryDate = new Date(res.deliveryDate);
        this.order = res;
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
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      return selectedVals.find(value => option.id === value.id) ?? option;
    }
    return option;
  }
}
