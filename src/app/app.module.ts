// import { ContactDataService } from './services/data.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactComponent } from './contact/contact.component';
import { ContactDataService } from './services/contact.data.service';
import { FilterContactsPipe } from './filter-contacts.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactFormComponent,
    FilterContactsPipe
  ],
  entryComponents: [ContactFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  providers: [ContactDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
