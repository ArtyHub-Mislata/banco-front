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
import { LoginLayout } from './layouts/login-layout/login-layout';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  // SIN HEADER → solo login/logout
  {
    path: 'login',
    component: LoginLayout,
    children: [{ path: '', component: LoginPage }],
  },
  {
    path: 'logout',
    component: LoginLayout,
    children: [{ path: '', component: LogoutPage }],
  },

  // CON HEADER → app protegida
  {
    path: 'app',
    component: MainLayout,
    canActivate: [LoginGuardGuard],
    children: [
      { path: '', component: InitialPage }, // /app → InitialPage
      { path: 'customer', component: CustomerPage },

      { path: 'accounts', component: AccountList },
      { path: 'accounts/:id', component: AccountPage },

      { path: 'cards', component: CardList },
      { path: 'cards/:id', component: CardPage },

      { path: 'transactions', component: TransactionList },
      { path: 'transactions/:id', component: TransactionPage },
    ],
  },

  // REDIRECCIÓN POR DEFECTO → si vas a '' intenta InitialPage
  {
    path: '',
    redirectTo: '/app',
    pathMatch: 'full',
  },

  // Cualquier ruta inválida
  { path: '**', redirectTo: '/app' },
];
