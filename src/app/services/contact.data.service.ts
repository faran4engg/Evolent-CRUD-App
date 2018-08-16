import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

import { ContactFormDialog } from '../models/contact-form-dialog';

@Injectable({
    providedIn: 'root'
})
export class ContactDataService {

    contactData: Array<ContactFormDialog>;

    constructor(public storageServ: StorageService) { }

    add(contact) {
        contact.id = this.storageServ.generateId();
        this.contactData = this.storageServ.getAll();
        if (!this.contactData) {
            this.contactData = [];
        }
        this.contactData.push(contact);
        this.storeInDB(this.contactData);

    }
    edit(contact) {

        this.contactData = this.storageServ.getAll();
        const index = this.storageServ.findContactIndexById(contact.id, this.contactData);
        this.contactData[index] = contact;
        this.storeInDB(this.contactData);

    }

    delete(id) {
        this.contactData = this.storageServ.getAll();
        const index = this.storageServ.findContactIndexById(id, this.contactData);
        this.contactData.splice(index, 1);
        this.storeInDB(this.contactData);
    }

    private storeInDB(data) {
        this.storageServ.setItem('contactList', JSON.stringify(this.contactData));
    }
}
