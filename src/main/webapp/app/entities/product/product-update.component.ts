import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, numeric } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import SellerService from '@/entities/seller/seller.service';
import { ISeller } from '@/shared/model/seller.model';

import OrderService from '@/entities/order/order.service';
import { IOrder } from '@/shared/model/order.model';

import { IProduct, Product } from '@/shared/model/product.model';
import ProductService from './product.service';

const validations: any = {
  product: {
    name: {
      required,
    },
    description: {},
    price: {
      required,
      numeric,
    },
  },
};

@Component({
  validations,
})
export default class ProductUpdate extends Vue {
  @Inject('productService') private productService: () => ProductService;
  @Inject('alertService') private alertService: () => AlertService;

  public product: IProduct = new Product();

  @Inject('sellerService') private sellerService: () => SellerService;

  public sellers: ISeller[] = [];

  @Inject('orderService') private orderService: () => OrderService;

  public orders: IOrder[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productId) {
        vm.retrieveProduct(to.params.productId);
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
    if (this.product.id) {
      this.productService()
        .update(this.product)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('myappApp.product.updated', { param: param.id });
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
      this.productService()
        .create(this.product)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('myappApp.product.created', { param: param.id });
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

  public retrieveProduct(productId): void {
    this.productService()
      .find(productId)
      .then(res => {
        this.product = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.sellerService()
      .retrieve()
      .then(res => {
        this.sellers = res.data;
      });
    this.orderService()
      .retrieve()
      .then(res => {
        this.orders = res.data;
      });
  }
}
