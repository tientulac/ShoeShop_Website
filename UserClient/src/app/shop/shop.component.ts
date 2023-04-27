import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent extends BaseComponent implements OnInit {

  listProductFilter: any;
  listColorFilter: any = [];
  cate_id: any;
  cate_name: any;
  listProductColor: any = [];
  priceFilter = '';
  totalCount: any;
  listP: any = [];

  // listSizeFilter: any = [
  //   {id: 1, size: 'L', name: 'Large'},
  //   {id: 2, size: 'XL', name: 'Extra Large'},
  //   {id: 3, size: 'M', name: 'M Medium'},
  //   {id: 4, size: 'S', name: 'Small'},
  //   {id: 5, size: 'XS', name: 'Extra Small'},
  // ];

  ngOnInit(): void {
    this.getListProduct();
    this.getlistProductFilter();
    this.getProductColor();
    this.getProductImage();
    this.getListSize();
    this.cate_id = localStorage.getItem('cate_id');
    this.cate_name = localStorage.getItem('cate_name');
  }

  getlistProductFilter() {
    this.listColorFilter = [];
    this.productService.getList().subscribe(
      (res) => {
        this.listProductFilter = res.data.filter((x: any) => x.category_id == this.cate_id);
        this.listP = this.listProductFilter;
        this.productService.getColor().subscribe(
          (res) => {
            this.listProductColor = res;
            this.totalCount = this.listProductFilter.length;
            var arrProdId = this.listProductFilter.map((x: any) => x.product_id);
            var arrColor = [...new Set(res.data.filter((x: any) => arrProdId.includes(x.product_id)).map((c: any) => c.color))];
            for (let i = 0; i < arrColor.length; i++) {
              this.listColorFilter.push({
                id: i+1,
                color: arrColor[i],
                checked: false
              });
            }
          }
        );
      }
    )
  }

  filter() {
    var colors = this.listColorFilter.filter((x: any) => x.checked == true);
    var lstColor = colors.map((x: any) => x.color);
    var sizes = this.listSizeFilter.filter((x: any) => x.checked == true);
    if (!(colors.length > 0) || !(sizes.length > 0)) {
      this.listProductFilter = this.listP;
    }

    if (colors.length > 0) {
      var prodId =  [...new Set(this.listColor.filter((c: any) => lstColor.includes(c.color)).map((x: any) => x.product_id))];
      this.listProductFilter = this.listProductFilter.filter((x: any) => prodId.includes(x.product_id));
    }

    if (sizes.length > 0) {
      this.listProductFilter = this.listProductFilter.filter((x: any) => x.size != null);
      this.listProductFilter.forEach((p: any) => {
        var arrSize = p.size.split(',');
        var checkSize = sizes.map((x: any) => x.size).map((s: any) => arrSize.includes(s));
        if (!checkSize.includes(true)) {
          this.listProductFilter = this.listProductFilter.filter((x: any) => x.product_id != p.product_id);
        }
      });
    }

    if (!(colors.length > 0) && !(sizes.length > 0)) {
      this.getlistProductFilter();
    }

    this.filterByPrice();
  }

  filterByPrice() {
    var type = this.priceFilter == 'PriceASC' ? 1 : this.priceFilter == 'PriceDESC' ? 2 : 3;
    if (type == 1) {
      this.listProductFilter = this.listProductFilter.sort((a: any,b: any) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
    }
    if (type == 2) {
      this.listProductFilter = this.listProductFilter.sort((a: any,b: any) => (a.price > b.price) ? -1 : ((b.price > a.price) ? 1 : 0))
    }
    if (type == 3) {
      this.listProductFilter = this.listProductFilter.sort((a: any,b: any) => (a.product_id > b.product_id) ? 1 : ((b.product_id > a.product_id) ? -1 : 0))
    }
  }

  getItemPerpage = (event: any) => {
    console.log(event)
  }

  nextPage = () => {
    this.countPage++;
  }

  prePage = () => {
    this.countPage = (this.countPage > 1) ? (this.countPage - 1) : 1;
  }

  firstPage = () => {
    this.countPage = 1;
  }

  lastPage = () => {
    this.countPage = 20;
  }

  passingData = (p: any) => {

    var lstColor = [...new Set(this.listColor.filter((x: any) => x.product_id == p.product_id).map((c: any) => c.color))];
    var lstSize = p.size.split(',');

    localStorage.setItem('lstSize', JSON.stringify(lstSize));
    localStorage.setItem('lstColor', JSON.stringify(lstColor));
    this.router.navigate(['/product-single/'+p.product_id]);
  }
}
