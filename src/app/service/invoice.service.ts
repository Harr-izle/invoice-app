import { Injectable } from '@angular/core';
import { Invoice } from '../interfaces/invoice-interface';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as InvoiceActions from '../store/store.actions';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  // dark mode control
  isDarkMode = false;
  // view invoice control(opens view invoice)
  viewInvoice = false;
  // modify invoice control(opens form)
  modifyInvoice = false;
  // confirm delete modal control
  confirmDelete = false;
  // editbutton clicked
  editButtonClicked = false;

  constructor(private http: HttpClient, private store: Store) {}

  // fetch invoice data from json
  getInvoices() {
    return this.http.get<Invoice[]>('../../assets/data/data.json');
  }

  // add new invoice
  addNewInvoice() {
    // clear edited invoice state when adding new invoice
    this.store.dispatch(InvoiceActions.clearEditedInvoice());
    // open form
    this.modifyInvoiceToggle();
    // set edit button clicked to false
    this.editButtonClicked = false;
  }

  // toggle dark mode
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }
  // toggle view invoice
  viewInvoiceToggle(invoice: Invoice) {
    // opens form
    this.viewInvoice = !this.viewInvoice;
    // set state edited invoice to current invoice
    this.store.dispatch(InvoiceActions.editInvoice({ invoice }));
  }

  // closes view invoice
  closeViewInvoice() {
    this.viewInvoice = false;
    this.scrollToTop();
  }

  // toggle modify invoice(adding and editing)
  modifyInvoiceToggle() {
    this.scrollToTop();
    this.modifyInvoice = !this.modifyInvoice;
  }
  // clear edited invoice
  clearEditedInvoice() {
    this.store.dispatch(InvoiceActions.clearEditedInvoice());
  }
  // toggle confirm delete modal
  confirmDeleteToggle() {
    this.confirmDelete = !this.confirmDelete;
  }

  // scroll to top when modals open
  scrollToTop() {
    const top = document.querySelector('.contentwrapper');
    top?.scrollTo({
      top: 0,
    });
  }

  // Styles background based on status
  getStatusText(status: string): any {
    switch (status.toLowerCase()) {
      case 'paid':
        return { color: '#33D69F' };
      case 'pending':
        return { color: '#FF8F00' };
      case 'draft':
        return { color: '#373B53' };
      default:
        return {};
    }
  }

  getStatusBackground(status: string): any {
    switch (status.toLowerCase()) {
      case 'paid':
        return { backgroundColor: 'rgba(51,214,159,.06)' };
      case 'pending':
        return { backgroundColor: 'rgba(255,143,0,.06)' };
      case 'draft':
        if (this.isDarkMode)
          return { backgroundColor: 'rgba(55,59,83,.36)', color: 'white' };
        return { backgroundColor: 'rgba(55,59,83,.06)' };
      default:
        return {};
    }
  }
  getStatusBullet(status: string): any {
    switch (status.toLowerCase()) {
      case 'paid':
        return { backgroundColor: '#33D69F' };
      case 'pending':
        return { backgroundColor: '#FF8F00' };
      case 'draft':
        if (this.isDarkMode) return { backgroundColor: 'white' };
        return { backgroundColor: '#373B53' };
      default:
        return {};
    }
  }
}
