import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { ContactFormDialog } from '../models/contact-form-dialog';

@Injectable({
  providedIn: 'root'
})
export class ContactDataService {
  private storageSub = new Subject<{ key: 'value' }>();
  contactData: Array<ContactFormDialog> = [];
  constructor(public snackBar: MatSnackBar) { }

  showSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next({ key: data });


  }

  add(contact) {
    contact.id = this.generateId();

    if (!this.getAll()) {
      this.contactData.push(contact);
    } else {
      this.contactData = this.getAll();

      this.contactData.push(contact);
      localStorage.removeItem('contactList');
    }



    this.setItem('contactList', JSON.stringify(this.contactData));

  }
  edit(contact) {

    this.contactData = this.getAll();
    const index = this.findContactIndexById(contact.id);
    this.contactData[index] = contact;

    this.setItem('contactList', JSON.stringify(this.contactData));

  }

  getAll() {

    const val = JSON.parse(localStorage.getItem('contactList'));
    return val;

  }

  generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  findContactIndexById(id) {
    return this.contactData.findIndex(item => {

      return item['id'] === id;
    });
  }

  delete(id) {

    const index = this.findContactIndexById(id);

    this.contactData.splice(index, 1);
    this.setItem('contactList', JSON.stringify(this.contactData));


  }

  filter(searchTerm, dataArr) {
    if (!searchTerm) {
      return dataArr;
    }

    searchTerm = searchTerm.toLowerCase().trim();

    return dataArr.filter(element => {
      return element.firstName.toLowerCase().includes(searchTerm) ||
        element.lastName.toLowerCase().includes(searchTerm) ||
        element.email.toLowerCase().includes(searchTerm) ||
        element.phoneNumber.toLowerCase().includes(searchTerm);
    });

  }


}
