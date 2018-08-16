import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { ContactFormDialog } from '../models/contact-form-dialog';
import { ContactDataService } from '../services/contact.data.service';


@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
    contactForm: FormGroup;
    submitted: boolean;
    isEditMode: boolean;
    formtitle = 'Create Contact';

    // convenience of getter for easy access to form fields
    get f() { return this.contactForm.controls; }

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ContactFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ContactFormDialog,
        private contactServ: ContactDataService) { }

    setval(data: ContactFormDialog) {

        this.contactForm.controls.firstName.setValue(data.firstName);
        this.contactForm.controls.lastName.setValue(data.lastName);
        this.contactForm.controls.email.setValue(data.email);
        this.contactForm.controls.phoneNumber.setValue(data.phoneNumber);
        this.contactForm.controls.status.setValue(data.status);
        this.contactForm.controls.id.setValue(data.id);

    }

    ngOnInit() {

        this.contactForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required]],
            status: ['', Validators.required],
            id: ['']
        });

        if (this.data) {
            this.setval(this.data);
            this.isEditMode = true;
            this.formtitle = 'Update Contact';
        }
    }

    onSubmit(contactFormData) {

        this.submitted = true;

        if (this.isEditMode) {
            this.contactServ.edit(contactFormData);
            this.contactServ.showSnackBar('Contact Updated Successfully', 'OK');
        } else {
            this.contactServ.add(contactFormData);
            this.contactServ.showSnackBar('Contact Added Successfully', 'OK');
        }

        this.dialogRef.close();
    }


}
