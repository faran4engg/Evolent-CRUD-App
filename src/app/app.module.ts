import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactComponent } from './contact/contact.component';
import { EvoCardComponent } from './evo-card/evo-card.component';
import { ContactDataService } from './services/contact.data.service';
import { StorageService } from './services/storage.service';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactFormComponent,
    EvoCardComponent
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
  providers: [ContactDataService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
