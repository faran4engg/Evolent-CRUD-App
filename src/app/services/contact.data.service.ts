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

    add(contact) {
        contact.id = this.generateId();
        this.contactData = this.getAll();
        if (!this.contactData.length) {
            this.contactData.push(contact);
        } else {
            this.contactData.push(contact);
        }
        this.setItem('contactList', JSON.stringify(this.contactData));

    }
    edit(contact) {

        this.contactData = this.getAll();
        const index = this.findContactIndexById(contact.id);
        this.contactData[index] = contact;

        this.setItem('contactList', JSON.stringify(this.contactData));

    }
    delete(id) {
        const index = this.findContactIndexById(id);
        this.contactData.splice(index, 1);
        this.setItem('contactList', JSON.stringify(this.contactData));
    }

    getAll() { return JSON.parse(localStorage.getItem('contactList')); }

    generateId() { return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); }

    findContactIndexById(id) { return this.contactData.findIndex(item => item['id'] === id); }



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
