import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {ListTableComponent} from './components/list-table/list-table.component';
import {ListFilterComponent} from './components/list-filter/list-filter.component';

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      {path: '', component: ListTableComponent},
      {path: '', component: ListFilterComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
