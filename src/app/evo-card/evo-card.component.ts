import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ContactDataService } from '../services/contact.data.service';
import { StorageService } from './../services/storage.service';

@Component({
    selector: 'app-evo-card',
    templateUrl: './evo-card.component.html',
    styleUrls: ['./evo-card.component.css']
})
export class EvoCardComponent {

    // Input property to get the data in card component from its parent
    // example: <app-evo-card [card-data]="contact"></app-evo-card>
    @Input('card-data') cardData: any;

    /**
     *Creates an instance of EvoCardComponent.
     * @param {MatDialog} dialog
     * @param {ContactDataService} contactServ
     * @param {StorageService} storageServ
     */
    constructor(public dialog: MatDialog, private contactServ: ContactDataService, private storageServ: StorageService) { }

    /**
     *Opens Dialog for Edit mode
     * @param {string} [formData='']
     */
    openFormDialog(formData = ''): void {
        this.dialog.open(ContactFormComponent, {
            width: '600px',
            data: formData
        });
    }

    /**
     *Deletes a contact from DB
     * @param {string} id
     */
    deleteContact(id: string) {
        this.contactServ.delete(id);
        this.storageServ.showSnackBar('Contact Deleted Successfully', 'OK');
    }


}
