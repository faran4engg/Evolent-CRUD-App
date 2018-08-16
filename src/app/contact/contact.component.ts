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
  contactListToCheck = [];


  constructor(public dialog: MatDialog, private contactServ: ContactDataService) {
    this.contactList = this.contactServ.getAll();
  }

  ngOnInit() {

    this.contactServ.watchStorage().subscribe((data: string) => {
      this.contactList = JSON.parse(localStorage.getItem('contactList'));
      this.contactListToCheck = Array.from(this.contactList);
    });

    this.contactListToCheck = Array.from(this.contactList);



  }
  openFormDialog(formData = ''): void {



    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '600px',
      data: formData
    });

  }
  deleteContact(id) {

    this.contactServ.delete(id);
    this.contactServ.showSnackBar('Contact Delet Successfully', 'OK');
  }

  filterContact(term) {

    this.contactList = this.contactServ.filter(term, this.contactListToCheck);


  }

}
