import { Routes } from '@angular/router';
import { AccountList } from './components/account-list/account-list';
import { CardList } from './components/card-list/card-list';
import { TransactionList } from './components/transaction-list/transaction-list';
import { InitialPage } from './components/initial-page/initial-page';
import { CustomerPage } from './components/customer-page/customer-page';
import { AccountPage } from './components/account-page/account-page';
import { CardPage } from './components/card-page/card-page';
import { TransactionPage } from './components/transaction-page/transaction-page';

export const routes: Routes = [
    {path: '', component: InitialPage},

    {path: 'customer', component: CustomerPage},

    {path: 'accounts', component: AccountList},
    {path: 'accounts/:id', component: AccountPage},

    {path: 'cards', component: CardList},
    {path: 'cards/:id', component: CardPage},

    {path: 'transactions', component: TransactionList},
    {path: 'transactions/:id', component: TransactionPage},
];
