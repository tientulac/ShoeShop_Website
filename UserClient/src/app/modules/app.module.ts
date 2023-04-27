import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../routes/app-routing.module';
import { AppComponent } from '../app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseComponent } from '../components/base/base.component';
import { LoginComponent } from '../pages/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagementPageComponent } from '../portals/portal-admin/management-page/management-page.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { HeaderComponent } from '../layouts/header/header.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';
import { DashboardComponent } from '../portals/portal-admin/dashboard/dashboard.component';
import { DataTableComponent } from '../commons/data-table/data-table.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CategoryComponent } from '../components/category/category.component';
import { BrandComponent } from '../components/brand/brand.component';
import { OrderComponent } from '../components/order/order.component';
import { ProductComponent } from '../components/product/product.component';
import { ImageComponent } from '../components/product/image/image.component';
import { DetailComponent } from '../components/product/detail/detail.component';
import { ColorComponent } from '../components/product/color/color.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagementPageComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    DataTableComponent,
    CategoryComponent,
    BrandComponent,
    OrderComponent,
    ProductComponent,
    ImageComponent,
    DetailComponent,
    ColorComponent
  ],
  imports: [
    DemoNgZorroAntdModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzModalModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),  
    NgxSpinnerModule,
  ],
  providers: [    
    CookieService,
    { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
