import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentUser: any = {};
  fetchingData: boolean = true;
  filter: Array<any> | undefined;
  numOfActiveCards: number = 0;
  numOfInactiveCards: number = 0;
  numOfCustomers: number = 0;
  numOfMainAccounts: number = 0;
  totalWalletAccounts: number = 0;
  averageAccountsPerCustomer: number = 0;
  averageActiveCardsCount: number = 0;
  averageTransactionsPerCard: number = 0;
  numOfIndividualAccounts: number = 0;
  numOfBusinessAccounts: number = 0;


  // Fund Simulator
  accounts: Array<any> = [];
  selectedAccountIndex: number = 0;
  selectedAccount: string = "";
  accountNumber: string = "";
  selectedBank: string = '';
  amount: any = "";





  accountStats: Array<any> | undefined;
  transactionVolume: number = 0;
  dummyData: Array<number> = [1200, 924, 234, 345, 234, 234, 564, 345, 230, 987, 3876, 980];
  currencyTypes: Array<any> | undefined;
  activeCurrency: any;
  // Cards chart
  fetchingCardsChart: boolean = true;
  cardsFilter: any;
  cards: Array<any> = [];
  noCardReport: boolean = true;
  // Transaction chart
  fetchingTransactionsChart: boolean = true;
  transactionFilter: any;
  transactions: Array<any> = [];
  noTransactionReport: boolean = true;
  activeChartTab: "physical" | "virtual" = "physical"

  @ViewChild('cardsChart') cardsChart!: any;
  @ViewChild('cardChart') cardChart!: any;
  @ViewChild('transactionChart') transactionChart!: any;


  chart1: any = null;
  chart2: any = null;
  chart3: any = null;
}
