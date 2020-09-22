import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../../shared/services/products.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css'],
})
export class FormProductsComponent implements OnInit {
  @Input() entity: any;
  errorMessage: string = null;
  isNew: boolean = true;

  form = this.fb.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    cost: ['', Validators.required],
    price: ['', Validators.required],
  }, {
    validators: this.validatorService.priceLowerCost('price', 'cost')
  });
  brandList: any;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private productService: ProductsService, private validatorService: ValidatorsService, private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {    
    this.isNew = typeof this.entity === 'undefined';
    if (!this.isNew) {
      this.spinner.show();
      this.productService.getProductById(this.entity.id).subscribe((r: any) => {
        // Seteo los datos que vienen del back en el formulario
        this.form.controls.name.setValue(r.name);
        this.form.controls.brand.setValue(r.idBrand);
        this.form.controls.cost.setValue(r.cost);
        this.form.controls.price.setValue(r.price);
          this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.error(error);
      });
    }
    this.loadData();
  }
  priceValid() {
    const price = this.form.get('price').value;
    const cost = this.form.get('cost').value;

    return (price >= cost) ? false : true;
  }
  save() {
    if (this.form.valid) {
      let entity: any = {};
      entity['name'] = this.form.controls.name.value;
      // entity['brand'] = this.form.controls.brand.;
      entity['idBrand'] = this.form.controls.brand.value;
      entity['cost'] = this.form.controls.cost.value;
      entity['price'] = this.form.controls.price.value;
      if (this.isNew) {
        this.create(entity);
      } else {
        entity['id'] = parseInt(this.entity.id);
        this.update(entity);
      }
    } else {
      this.errorMessage =
        'Complete correctamente los campos obligatorios del formulario.';
    }
  }
  update(entity: any) {
    this.spinner.show();

    this.productService.editProducts(entity).subscribe(
      r => {
        this.activeModal.close(true);
        this.spinner.hide();
      },
      e => {
        if(e.status == 400){
          this.errorMessage = e.error.message;
        }
        this.spinner.hide();
      }
    );
  }
  create(entity: any) {
    this.spinner.show();

    this.productService.addProducts(entity).subscribe(
      r => {
        this.activeModal.close(true);
        this.spinner.hide();
      },
      e => {
        if(e.status == 400){
          let msg = e.error.message.toLowerCase();
          this.errorMessage = msg.charAt(0).toUpperCase() + msg.slice(1);
        }
        this.spinner.hide();
      }
    );
  }
  loadData() {
    this.productService.getBrand().subscribe(
      r => {
        this.brandList = r;
      },
      e => { console.error(e.message); }
    );
  }
}


