
import { Component, OnInit,VERSION, ElementRef, ViewChild, HostListener, QueryList } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { DOCUMENT } from '@angular/common'; 


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular ' + VERSION.major;




addressForm:FormGroup;

  submitted = null;

  showAlert:boolean = false;



 

  constructor(private _fb: FormBuilder,private el: ElementRef) { }

 

  ngOnInit(){

    this.addressForm=this._fb.group({

      address : this._fb.array([this.addAddressGroup()])

    });

  }

 

  addAddressGroup(){

    return this._fb.group({

      streetAddress :['',[Validators.required]], 

      city:['',[Validators.required]]

    });

    

  }

  get addressArray(){

    return <FormArray> this.addressForm.get('address');    

  }  

 

  /*Add Address*/

  addAddress(){

    this.addressArray.push(this.addAddressGroup()); 

    console.table(this.addressForm.controls);

  } 

  
  triggerFocus(event, id) {

    console.log('event.target.id is = '+ event.target.id);

    const idValue = event.target.id;

    console.log('idValue = '+ idValue);

 
    const ref: HTMLElement = this.el.nativeElement;

    console.log('ref : ' +ref);

console.log(document.getElementById(id));

    document.getElementById(id).focus();

    const ele: HTMLElement = ref.ownerDocument.querySelector(event.target.id);

    console.log(ref.ownerDocument);

    console.log('ele is : '+ele);

    if (ele && ele.focus) {
        ele.focus();
    }

}

  onSubmit() {

    this.submitted = false;

    this.showAlert = true;    

    if( this.submitted.invalid){

      return;

    }

    if( this.addressForm.valid){

      this.showAlert =false;

    }

    this.submitted =true;

  }

}