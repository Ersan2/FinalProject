import { Routes } from '@angular/router';
import { UserPage } from './features/user/user.component';
import { AccountPage } from './features/account/account.component';

export const routes: Routes = [

{
    path        :'',
    redirectTo  :'user',
    pathMatch   :'full'
},

{
path    :'user',
component: UserPage
},
{
    path:'user/account/:id',
    component:AccountPage

}



];
