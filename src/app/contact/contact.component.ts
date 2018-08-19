import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ContactFormDialog } from '../models/contact-form-dialog';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {

  // List of contacts from DB
  contactList: Array<ContactFormDialog> = [];

  // A reference of Contact List for search-contact feature
  contactListToCheck: any[];

  /**
   *Creates an instance of ContactComponent.
   * @param {MatDialog} dialog
   * @param {StorageService} storageServ
   */
  constructor(public dialog: MatDialog, public storageServ: StorageService) { }

  /**
   * Initializes contactList from DB
   * Also, watches over and update every change (Add/Update/Delete) in the DB
   */
  ngOnInit() {
    this.contactListToCheck = this.contactList = this.storageServ.getAll();
    this.storageServ.watchStorage().subscribe((data: string) => {
      this.contactList = JSON.parse(localStorage.getItem('contactList'));
      this.contactListToCheck = Array.from(this.contactList);
    });
  }

  /**
   * Opens a Dialog Modal for Add Contact Form
   * @param {string} [formData='']
   */
  openFormDialog(formData = ''): void {
    this.dialog.open(ContactFormComponent, {
      width: '600px',
      data: formData
    });
  }

  /**
   * Search Contact feature
   * Updates contact List in real time after fetching details from localStorage DB
   * @param {string} searchTerm
   */
  filterContact(searchTerm: string) {
    this.contactList = this.storageServ.filter(searchTerm, this.contactListToCheck);
  }
}
