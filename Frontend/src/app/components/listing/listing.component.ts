import { Component, OnInit , ViewChild} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  registerForm: FormGroup;
  Roles: any = ['Admin', 'Nurse', 'Doctor'];
  userProfil: any;
	
	displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email' , 'role'];
	dataSource: any;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor( 
  public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router) { 
	  this.registerForm= this.formBuilder.group({
		  firstname: [''],
		  lastname: [''],
		  username: [''],
		  email: [''],
		  role: [''],
		  password: ['']
		})
  }
	addUser() {
    this.authService.adduser(this.registerForm.value).subscribe((res) => {
      if (res.result) {
        this.registerForm.reset()
        this.router.navigate(['login']);
      }
    })

  }
  ngOnInit(): void {
    this.authService.getUsersList().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<any>(res.result);
      this.dataSource.paginator = this.paginator;
    });

    this.userProfil = this.authService.getUserProfil();
    console.log('userProfil', this.userProfil);
    
  }

}

export interface PeriodicElement {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}
/* const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, firstname: 'Test1', lastname: 'LTest1', email: 'test1@gmail.com'},
  {id: 2, firstname: 'Test2', lastname: 'LTest2', email: 'test2@gmail.com'},
  {id: 3, firstname: 'Test3', lastname: 'LTest3', email: 'test3@gmail.com'},
  {id: 4, firstname: 'Test4', lastname: 'LTest4', email: 'test4@gmail.com'},
  {id: 5, firstname: 'Test5', lastname: 'LTest5', email: 'test5@gmail.com'},
]; */