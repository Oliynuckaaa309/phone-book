import { Component, Input } from '@angular/core';
import { dataPhone } from '../../interface/phoneNumbers';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../../pipe/search.pipe';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../../servise/local-storage.service';
import { ReactiveFormsModule } from "@angular/forms";
@Component({
  selector: 'app-child',
  standalone: true,
  imports: [FormsModule, CommonModule, SearchPipe, RouterModule, ReactiveFormsModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  @Input() fromParentObject: dataPhone[] = [];
  @Input() parentSearchTerm!:string;
  isEditForm!:boolean;
  editForm:FormGroup;
  id!:number;
  constructor(private localStorageService:LocalStorageService,
    private fb: FormBuilder
   ){
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }
  
  deleteUser(id:number):void{
  const index = this.fromParentObject.findIndex((element) => element.id == id)
  this.fromParentObject.splice(index, 1);
  this.localStorageService.setData('users', this.fromParentObject);

  }
  editUser(identifier:number):void{
    this.isEditForm=true;
    this.id=identifier;
    const index = this.fromParentObject.findIndex((element) => element.id == identifier)
   
    let editUser=this.fromParentObject[index]
    console.log("identifier" + identifier)
    this.editForm.patchValue({
    id:identifier,
    firstName:editUser.firstName,
    lastName:editUser.lastName,
    phoneNumber:editUser.phoneNumber,
    email:editUser.email,
    address:editUser.address,
    dateOfBirth:editUser.dateOfBirth
   })
   
  }
  closeEditForm(){
    this.isEditForm=false;

  }
  onSubmit(){
  }
   saveChanges(){
   let changedUser=this.editForm.value;
   changedUser.id = this.id
   const index = this.fromParentObject.findIndex((element) => element.id == this.id)
   this.fromParentObject.splice(index, 1, changedUser);
   this.localStorageService.setData('users', this.fromParentObject)
   this.isEditForm=false
   }
}
