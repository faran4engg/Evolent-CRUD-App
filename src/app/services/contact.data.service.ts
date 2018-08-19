import { Injectable, OnInit } from '@angular/core';
import { ContactFormDialog } from './../models/contact-form-dialog';
import { StorageService } from './storage.service';


@Injectable({
    providedIn: 'root'
})
export class ContactDataService implements OnInit {

    contactData: Array<ContactFormDialog>; // holds contact info

    /**
     *Creates an instance of ContactDataService.
     * @param {StorageService} storageServ
     * @memberof ContactDataService
     */
    constructor(public storageServ: StorageService) { }

    /**
     *Initialize ContactData once
     *Then making use of storage service to watch over changes in DB
     *Hence subscribing to watchStorage()
     *Improves performance as we no longer need to always call this.storageServ.getAll();
     * @memberof ContactDataService
     */
    ngOnInit() {
        this.contactData = this.storageServ.getAll();
        this.storageServ.watchStorage().subscribe((data: string) => {
            this.contactData = JSON.parse(localStorage.getItem('contactList'));
        });
    }

    /**
     *First generates unique Id for a contact
     *If no contact in DB then initialize to an empty array
     *else push into array returned from DB
     * @param {ContactFormDialog} contact
     * @memberof ContactDataService
     */
    add(contact: ContactFormDialog) {
        contact.id = this.storageServ.generateId();
        if (!this.contactData) this.contactData = [];

        this.contactData.push(contact);
        this.storeInDB(this.contactData);
    }

    /**
     *Beauty of adding unique id comes in here
     *It helps us search record quickly
     *Updates value in linear time complexity
     * @param {ContactFormDialog} contact
     * @memberof ContactDataService
     */
    edit(contact: ContactFormDialog) {
        const index = this.storageServ.findContactIndexById(contact.id, this.contactData);
        this.contactData[index] = contact;
        this.storeInDB(this.contactData);
    }

    /**
    *Beauty of adding unique id comes in here as well
    *It helps us search record quickly
    *Deletes value in linear time complexity
    * @param {string} id
    * @memberof ContactDataService
    */
    delete(id: string) {
        const index = this.storageServ.findContactIndexById(id, this.contactData);
        this.contactData.splice(index, 1);
        this.storeInDB(this.contactData);
    }

    /**
     *Updates data in our Database
     * @private
     * @param {ContactFormDialog[]} data
     * @memberof ContactDataService
     */
    private storeInDB(data: ContactFormDialog[]) {
        this.storageServ.setItem('contactList', JSON.stringify(data));
    }
}
