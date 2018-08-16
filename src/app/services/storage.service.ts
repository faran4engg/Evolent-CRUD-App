import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageSub = new Subject<{ key: 'value' }>();

  constructor(public snackBar: MatSnackBar) { }

  getAll() { return JSON.parse(localStorage.getItem('contactList')); }

  generateId() { return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); }

  findContactIndexById(id, contact) { return contact.findIndex(item => item['id'] === id); }



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

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next({ key: data });
  }

  showSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
