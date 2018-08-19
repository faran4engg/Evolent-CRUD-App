import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContactDataService } from '../services/contact.data.service';
import { StorageService } from '../services/storage.service';
import { ContactFormDialog } from './../models/contact-form-dialog';


@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

    contactForm: FormGroup;         // Form data
    isEditMode: boolean;            // flag to open modal in either create mode or update mode
    formtitle = 'Create Contact';   // default form title

    // convenience of getter for easy access to form fields
    get f() { return this.contactForm.controls; }

    /**
     *Creates an instance of ContactFormComponent.
     * @param {FormBuilder} fb
     * @param {MatDialogRef<ContactFormComponent>} dialogRef
     * @param {ContactFormDialog} data
     * @param {ContactDataService} contactServ
     * @param {StorageService} storageServ
     */
    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ContactFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ContactFormDialog,
        private contactServ: ContactDataService,
        public storageServ: StorageService) { }

    /**
     *Initializing Form fields along with Validators
     *Also, Sets form value in case its Edit Mode
     */
    ngOnInit() {
        this.contactForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required, Validators.minLength]],
            status: ['', Validators.required],
            id: ['']
        });

        //  if we have data: <ContactFormDialog> then we are sure that modal will be opening in Edit Mode
        if (this.data) {
            this.setval(this.data);
            this.isEditMode = true;
            this.formtitle = 'Update Contact';
        }
    }

    /**
     *Form Submit
     *Resusing Storage Service's snackbar feature
     *Reusing Contact Service's Add / Edit method
     * @param {ContactFormDialog} contactFormData
     */
    onSubmit(contactFormData: ContactFormDialog) {

        if (this.isEditMode) {
            this.contactServ.edit(contactFormData);
            this.storageServ.showSnackBar('Contact Updated Successfully', 'OK');
        } else {
            this.contactServ.add(contactFormData);
            this.storageServ.showSnackBar('Contact Added Successfully', 'OK');
        }
        // Closing Dialog Box
        this.dialogRef.close();
    }

    /**
     *Sets Form values in edit mode
     * @private
     * @param {ContactFormDialog} data
     */
    private setval(data: ContactFormDialog) {

        this.contactForm.controls.firstName.setValue(data.firstName);
        this.contactForm.controls.lastName.setValue(data.lastName);
        this.contactForm.controls.email.setValue(data.email);
        this.contactForm.controls.phoneNumber.setValue(data.phoneNumber);
        this.contactForm.controls.status.setValue(data.status);
        this.contactForm.controls.id.setValue(data.id);

    }


}
