import { Routes } from '@angular/router';
import { AccountList } from './components/pages/account-list/account-list';
import { CardList } from './components/pages/card-list/card-list';
import { TransactionList } from './components/pages/transaction-list/transaction-list';
import { CustomerPage } from './components/pages/customer-page/customer-page';
import { AccountPage } from './components/pages/account-page/account-page';
import { CardPage } from './components/pages/card-page/card-page';
import { TransactionPage } from './components/pages/transaction-page/transaction-page';
import { InitialPage } from './components/pages/initial-page/initial-page';
import { LoginPage } from './components/pages/login-page/login-page';
import { LogoutPage } from './components/pages/logout-page/logout-page';
import { LoginGuardGuard } from './guards/login-guard-guard';

export const routes: Routes = [
    {path: '', component: InitialPage},

    { path: 'customer', component: CustomerPage, canActivate: [LoginGuardGuard]},

    {path: 'accounts', component: AccountList, canActivate: [LoginGuardGuard]},
    {path: 'accounts/:id', component: AccountPage, canActivate: [LoginGuardGuard]},

    {path: 'cards', component: CardList, canActivate: [LoginGuardGuard]},
    {path: 'cards/:id', component: CardPage, canActivate: [LoginGuardGuard]},

    {path: 'transactions', component: TransactionList, canActivate: [LoginGuardGuard]},
    {path: 'transactions/:id', component: TransactionPage, canActivate: [LoginGuardGuard]},

    { path: 'login', component: LoginPage },
    { path: 'logout', component: LogoutPage, canActivate: [LoginGuardGuard] }
];
