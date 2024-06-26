import { Component } from '@angular/core';
import { ChildComponent } from '../../childComponent/child/child.component';
import { dataPhone } from '../../interface/phoneNumbers';
import { dataOfUsers } from '../../database/phoneNumber';
import { LocalStorageService } from '../../servise/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent, CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {
  constructor(private localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }
  usersInfo: dataPhone[] = [];
  searchTerm!: string;
  activeModal!: boolean;
  userForm!: FormGroup;
  newUserIndex = 10;

  ngOnInit() {
    if (!this.localStorageService.getData('users')) {
      this.setData();
    }
    this.loadDataFromLocalStorage();

  }
  setData() {
    this.localStorageService.setData('users', dataOfUsers);
  }

  loadDataFromLocalStorage(): void {
    this.usersInfo = this.localStorageService.getData('users');
    console.log(this.localStorageService.getData('users'))

  }
  addNewUser() {
    this.activeModal = true;
  }
  onSubmit() {
  }
  closeModal() {
    this.activeModal = false;
  }
  saveNewUser() {
    let newUser: dataPhone = this.userForm.value;
    newUser.id = this.newUserIndex++;
    this.usersInfo.push(newUser);
    this.localStorageService.setData('users', this.usersInfo);
    this.userForm.reset();
    this.activeModal = false;
  }


}
