import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { PersonModel } from './person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
   
  formValue !: FormGroup;
  personModelObj : PersonModel = new PersonModel();
  employeeData !:any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formBuilder: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
     this.formValue = this.formBuilder.group({
     name : [''],
     email : [''],
     dob : [''],
     avatar : [''],
     country : ['']
    })
    this.getAllPerson();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postPersonDetails(){
  this.personModelObj.name = this.formValue.value.name;
  this.personModelObj.email = this.formValue.value.email;
  this.personModelObj.dob = this.formValue.value.dob;
  this.personModelObj.avatar = this.formValue.value.avatar;
  this.personModelObj.country = this.formValue.value.country;

  this.api.postPerson(this.personModelObj)
  .subscribe(res=>{
    console.log(res);
    alert("Employee Added successfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllPerson();
  },
  err=>{
    alert("something went wrong");
  })
  }
  getAllPerson(){
  this.api.getEmployee()
  .subscribe(res=>{
    this.employeeData = res;
  })
  }
  deleteEmployee(row : any){
  this.api.deleteEmployee(row.id)
  .subscribe(res=>{
    alert("Person deleted");
    this.getAllPerson();
  })
  }
  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.personModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['dob'].setValue(row.dob);
    this.formValue.controls['avatar'].setValue(row.avatar);
    this.formValue.controls['country'].setValue(row.country);
  }
 updateEmployee(){
  this.personModelObj.name = this.formValue.value.name;
  this.personModelObj.email = this.formValue.value.email;
  this.personModelObj.dob = this.formValue.value.dob;
  this.personModelObj.avatar = this.formValue.value.avatar;
  this.personModelObj.country = this.formValue.value.country;

  this.api.updateEmployee(this.personModelObj,this.personModelObj.id)
  .subscribe(res=>{
    alert("updated successfully");
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllPerson();
  })
 }

}
