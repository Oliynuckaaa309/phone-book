import { Routes } from '@angular/router';
import { ParentComponent } from './parentComponent/parent/parent.component';
import { ContactDetailsComponent } from './contactDetails/contact-details/contact-details.component';

export const routes: Routes = [
    {path:'', component:ParentComponent},
    {path:'contact/:id', component:ContactDetailsComponent}
];
