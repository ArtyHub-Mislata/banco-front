import { Routes } from '@angular/router';
import { AccountList } from './components/pages/account-list/account-list';
import { CardList } from './components/pages/card-list/card-list';
import { TransactionList } from './components/pages/transaction-list/transaction-list';
import { CustomerPage } from './components/pages/customer-page/customer-page';
import { AccountPage } from './components/pages/account-page/account-page';
import { CardPage } from './components/pages/card-page/card-page';
import { TransactionPage } from './components/pages/transaction-page/transaction-page';

export const routes: Routes = [
    {path: '', component: CustomerPage},

    {path: 'accounts', component: AccountList},
    {path: 'accounts/:id', component: AccountPage},

    {path: 'cards', component: CardList},
    {path: 'cards/:id', component: CardPage},

    {path: 'transactions', component: TransactionList},
    {path: 'transactions/:id', component: TransactionPage}
];
