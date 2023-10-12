import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsocketComponent } from './components/websocket/websocket.component';

const routes: Routes = [
  {
    path: 'websocket',
    component: WebsocketComponent
  },
  {
    path: '**',
    redirectTo: 'WebsocketComponent',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
