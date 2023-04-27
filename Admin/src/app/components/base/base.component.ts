import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { Renderer2 } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BrandService } from 'src/app/services/brand.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { RoleService } from 'src/app/services/role.service';
import { DiscountService } from 'src/app/services/discount.service';
import { AccountService } from 'src/app/services/account.service';
import { ExcelServicesService } from 'src/app/services/excel.service';
import { BlogService } from 'src/app/services/blog.service';

const formatDate = (date: string | number | Date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 2),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const removeSpaces = (control: AbstractControl) => {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})

export class BaseComponent {

  Data: any;
  selected_ID: any;
  searchString: any;
  UserID_get: any;
  UserName_get: any;
  checkInsert: boolean = false;
  titleModal: any;
  submitted: boolean = false;
  numberPage: any;
  page: any = 1;
  isDisplay: boolean = false;
  isDisplayImage: boolean = false;
  isDisplayDetail: boolean = false;
  isDisplayColor: boolean = false;

  constructor(
    public titleService: Title,
    public spinner: NgxSpinnerService,
    public router: Router,
    public fromBuilder: FormBuilder,
    public toastr: ToastrService,
    public appService: AppService,
    public renderer: Renderer2,
    public modal: NzModalService,
    public categoryService: CategoryService,
    public brandService: BrandService,
    public orderService: OrderService,
    public productService: ProductService,
    public roleService: RoleService,
    public discountService: DiscountService,
    public accountService: AccountService,
    public excelService: ExcelServicesService,
    public blogService: BlogService
  ) { }

  listCate: any = [];
  listBrand: any = [];
  listOrder: any = [];
  listProduct: any = [];
  listImage: any = [];
  listDetail: any = [];
  listColor: any = [];
  listRole: any = [];
  listDiscount: any = [];
  listAccount: any = [];
  listBlog: any = [];

  getInfo() {
    var infoUser = localStorage.getItem('UserInfo');
    return infoUser; 
  }

  makeRandomeCode(length: any) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

  getListCate = () => {
    this.categoryService.getList().subscribe(
      (res) => {
        this.listCate = res.data;
      }
    )
  }

  getListBrand = () => {
    this.brandService.getList().subscribe(
      (res) => {
        this.listBrand = res.data;
      }
    )
  }

  getListOrder = () => {
    this.orderService.getList().subscribe(
      (res) => {
        this.listOrder = res.data;
      }
    )
  }

  getListProduct = () => {
    this.productService.getList().subscribe(
      (res) => {
        this.listProduct = res.data;
      }
    )
  }

  getProductColor = () => {
    this.productService.getColor().subscribe(
      (res) => {
        this.listColor = res;
      }
    )
  };

  getProductDetail = () => {
    this.productService.getDetail().subscribe(
      (res) => {
        this.listDetail = res;
      }
    )
  };

  getProductImage = () => {
    this.productService.getImage().subscribe(
      (res) => {
        this.listImage = res.data;
      }
    )
  };
  

  getListRole = () => {
    this.roleService.getList().subscribe(
      (res) => {
        this.listRole = res.data;
      }
    )
  };

  getListDiscount = () => {
    this.discountService.getList().subscribe(
      (res) => {
        this.listDiscount = res.data;
      }
    )
  };

  getListAccount = () => {
    this.accountService.getList().subscribe(
      (res) => {
        this.listAccount = res.data;
      }
    )
  };

  getListBlog = () => {
    this.blogService.getList().subscribe(
      (res) => {
        this.listBlog = res.data;
      }
    );
  }

  remove_sign = (str: string) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ|ị/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)
    return str;
  }
}
