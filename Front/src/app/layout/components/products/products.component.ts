import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { FormProductsComponent } from '../form-products/form-products.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../../shared/modal/modal.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  columns: any[] = [
    { title: 'Nombre', field: 'name', sortable: true },
    { title: 'Marca', field: 'brand', sortable: true },
    { title: 'Costo', field: 'cost', sortable: true },
    { title: 'Precio', field: 'price', sortable: true },
  ];
  constructor(
    protected productsService: ProductsService,
    private dialogService: NgbModal,
    private modalService: ModalService,
    protected toastr: ToastrService,
    private spinner: NgxSpinnerService


  ) {}

  ngOnInit(): void {
    this.columns.push({
      title: 'Acciones',
      orderable: false,
      align: 'center',
      field: 'notshow',
      width: '10%',
      formatter: this.actionsFormatter,
      events: this.actionsEvents,
    });
    this.initializeTable();
  }
  actionsFormatter(i, o) {
    return (
      "<button id='edit' class='btn btn-primary btn-circle m-1' aria-label='Editar' title='Editar'><i class='fa fa-edit'></i></button>" +
      "<button id='delete' class='btn btn-danger btn-circle m-1' aria-label='Borrar' title='Borrar'><i class='fa fa-trash'></i></button>"
    );
  }

  initializeTable() {
    $('#table')
      .bootstrapTable('destroy')
      .bootstrapTable({
        this: this,
        search: true,
        formatSearch: function () {
          return 'Buscar por nombre';
        },
        searchTimeOut: 500,
        sortable: true,
        showRefresh: false,
        pagination: true,
        ajax: this.ajaxRequest,
        sidePagination: 'server',
        showExport: false,
        formatLoadingMessage: function formatLoadingMessage() {
          return '';
        },
        columns: this.columns,
        onAll: function (name, args) {},
        onLoadSuccess: function () {},
        onClickRow: function (row, $data, field) {},
      });
  }
  ajaxRequest(params) {
    let that: any = this;
    let instance = that.options.this;
    instance.spinner.show();
    instance.productsService.getProducts().subscribe(
      (r) => {
        params.success({
          total: r.length,
          rows: r,
        });
          instance.spinner.hide();
      },
      (e) => {
        if (e.status == 400) {
          params.success({
            total: 0,
            rows: [],
          });
        } else {
          console.log(e);
        }
      }
    );
  }
  new(): void {
    const modalRef = this.dialogService.open(FormProductsComponent, {
      size: 'lg',
      windowClass: 'animated slideInDown faster',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.result
      .then((result) => {
        if (result) $('#table').bootstrapTable('refresh', { silent: true });
        this.toastr.success('Se guardaron los datos correctamente.', 'Guardado', { timeOut: 10000, positionClass: 'toast-bottom-center' });
      })
      .catch((error) => {
      });
  }
  actionsEvents = {
    'click #edit': function (e, value, row, index) {
      let instance = this.options.this;
      const modalRef = instance.dialogService.open(
        FormProductsComponent,
        {
          size: 'lg',
          windowClass: 'animated slideInDown faster',
          backdrop: 'static',
          keyboard: false,
        }
      );
      modalRef.componentInstance.entity = row;
      modalRef.result
        .then((result) => {
          console.log(result);
          if (result) {
            this.$el.bootstrapTable('refresh', { silent: true });
            instance.toastr.success('Se guardaron los datos correctamente.', 'Guardado', { timeOut: 10000, positionClass: 'toast-bottom-center' });
          }
        })
        .catch((error) => {
          console.log('Modal dismissed');
        });
    },
    'click #delete': function (e, value, row, index) {
      let instance = this.options.this;
      console.log(row);
      instance.modalService.confirm('Esta seguro de borrar?').subscribe((r) => {
        if (r) {
          instance.loading = true;
          instance.productsService.deleteProducts(row.id).subscribe(
            (r) => {
              this.$el.bootstrapTable('refresh', { silent: true });
              instance.toastr.success('Se borró correctamente.', 'Eliminado', { timeOut: 10000, positionClass: 'toast-bottom-center' });
            },
            (e) => {
              console.log(e.error);
              instance.toastr.error(e.error.message, 'Error', { timeOut: 10000, positionClass: 'toast-bottom-center' });
            }
          );
        }
      });
    },
  };
}
