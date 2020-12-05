import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ListTableComponent} from './components/list-table/list-table.component';
import {ListFilterComponent} from './components/list-filter/list-filter.component';
import {FormsModule} from '@angular/forms';
import {TableService} from './service/table.service';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListTableComponent,
    ListFilterComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TableService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
