import { ContactFormDialog } from './../models/contact-form-dialog';
import { StorageService } from './../services/storage.service';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContactDataService } from '../services/contact.data.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
    selector: 'app-evo-card',
    templateUrl: './evo-card.component.html',
    styleUrls: ['./evo-card.component.css']
})
export class EvoCardComponent {

    position = 'above';
    // tslint:disable-next-line:no-input-rename
    @Input('card-data') cardData: any;

    constructor(public dialog: MatDialog, private contactServ: ContactDataService, private storageServ: StorageService) { }

    openFormDialog(formData = ''): void {

        const dialogRef = this.dialog.open(ContactFormComponent, {
            width: '600px',
            data: formData
        });

    }

    deleteContact(id: string) {
        this.contactServ.delete(id);
        this.storageServ.showSnackBar('Contact Deleted Successfully', 'OK');
    }


}
