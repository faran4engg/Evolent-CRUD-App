/**
 *Beauty of this service is:
 -helps us achieve realtime database operation of local storage
 -reflects changes on every CRUD in realtime
 -simulates cloud DB operation
 -I've acheived this using RxJS's Subject
*/

import { ContactFormDialog } from './../models/contact-form-dialog';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // creating storage subject for our contact info
  private storageSub = new Subject<{ key: 'value' }>();

  /**
   *Creates an instance of StorageService.
   * @param {MatSnackBar} snackBar
   */
  constructor(public snackBar: MatSnackBar) { }

  /**
   *Get all data from local storage
   */
  getAll() { return JSON.parse(localStorage.getItem('contactList')); }

  /**
   *Generating unique ID for every contact
   *Simple JS stuff
   * @returns {string}
   */
  generateId(): string { return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); }

  /**
   *Finds a particular contact Index in DB by its ID
   * @param {string} id
   * @param {ContactFormDialog[]} contact
   */
  findContactIndexById(id: string, contact: ContactFormDialog[]) { return contact.findIndex(item => item['id'] === id); }

  /**
  *Filters data on the basis of search term entered in the search contact box
  *searching on the basis of:
    -First Name
    -Last Name
    -Email
    -Phone Number
  * @param {string} searchTerm
  * @param {ContactFormDialog[]} dataArr
  * @return
  */
  filter(searchTerm: string, dataArr: ContactFormDialog[]) {
    if (!searchTerm) {
      return dataArr;
    }
    searchTerm = searchTerm.toLowerCase().trim();
    return dataArr.filter(element => {
      return element.firstName.toLowerCase().includes(searchTerm) ||
        element.lastName.toLowerCase().includes(searchTerm) ||
        element.email.toLowerCase().includes(searchTerm) ||
        element.phoneNumber.toString().includes(searchTerm);
    });
  }

  /**
   *Important method.
   *It returns storage subject that we have created above as Observable
   *By doing so, once you subscribe to it you will get updated values
   * @returns {Observable<any>}
   */
  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  /**
   *Updates value in local storage
   *Uses next method to feed a new value to the Subject
   *After that It will be multicasted to the Observers registered to listen to the Subject
   * @param {string} key
   * @param {*} data
   */
  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next({ key: data });
  }

  /**
   *Showing snackbar for better User Experience
   * @param {string} message
   * @param {string} action
   */
  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
