import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ContactFormDialog } from '../models/contact-form-dialog';
import { ContactDataService } from '../services/contact.data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {

  position = 'above';
  contactList: Array<ContactFormDialog> = [];
  contactListToCheck: any[];


  constructor(public dialog: MatDialog, private contactServ: ContactDataService) { }

  ngOnInit() {
    this.contactListToCheck = this.contactList = this.contactServ.getAll();
    this.contactServ.watchStorage().subscribe((data: string) => {
      this.contactList = JSON.parse(localStorage.getItem('contactList'));
      this.contactListToCheck = Array.from(this.contactList);
    });
  }

  openFormDialog(formData = ''): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '600px',
      data: formData
    });
  }

  filterContact(term) {
    this.contactList = this.contactServ.filter(term, this.contactListToCheck);
  }

}
