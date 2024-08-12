import { NgModule, TemplateRef } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

//define class
export class Ira {

  constructor(
    public iraId: number,
    public firstName: string,
    public lastName: string,
    public iraName: string,
    public iraType: string
  ) {}

}

@Component({
  selector: 'app-ira',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ira.component.html',
  styleUrl: './ira.component.css'
})
export class IraComponent {
  
  iras: Ira[] = [];
  closeResult!: string;
  editForm!: FormGroup;
  private deleteId!: number;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

ngOnInit(): void {
  this.getIras();
//build reactive form
//will be blank until user clicks edit button
  this.editForm = this.fb.group( {
    iraId: '',
    firstName: '',
    lastName: '',
    iraName: '',
    iraType: ''
  });
}

  //get ira function
  getIras() {
    this.httpClient.get<any>('http://127.0.0.1:8084/Iras/getAllIras').subscribe(
    response => {
      console.log(response);
      this.iras = response;
    }
  );
}

open(content: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

openDetails(contentDetails: any, i: Ira) {
  this.modalService.open(contentDetails, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
  document.getElementById('viewfirstname')?.setAttribute('value', i.firstName);
  document.getElementById('viewlastname')?.setAttribute('value', i.lastName);
  document.getElementById('viewiraname')?.setAttribute('value', i.iraName);
  document.getElementById('viewiratype')?.setAttribute('value', i.iraType);
  }

  openEdit(contentEdit: any, i:Ira) {
    this.modalService.open(contentEdit, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });

    //patchValue loads control with data when button is clicked
    this.editForm.patchValue( {
      iraId: i.iraId,
      firstName: i.firstName,
      lastName: i.lastName,
      iraName: i.iraName,
      iraType: i.iraType
    });  
  }

  openDelete(contentDelete: any, ira: Ira) {
    this.deleteId = ira.iraId;
    this.modalService.open(contentDelete, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onSave() {
    const editURL = 'http://127.0.0.1:8084/Iras/ira/'+this.editForm.get('iraId')?.value+'/edit';
    console.log(this.editForm.value);
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        //reload page
        this.ngOnInit();
      });
      this.modalService.dismissAll();
    }
    

onSubmit(f: NgForm) {
  const url = 'http://127.0.0.1:8084/Iras/ira/addnew';
  this.httpClient.post(url, f.value)
    .subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
  this.modalService.dismissAll(); //dismiss the modal
}

onDelete() {
  const deleteURL = 'http://127.0.0.1:8084/Iras/ira/' + this.deleteId + '/delete';
  this.httpClient.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
    });
    this.modalService.dismissAll();
}

}
