import { getLocaleTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  list: any = [];
  item: any;
  term: any;

  public currencyCode: any;
  public currencyName: any;
  data: any = {
    createdDateTime: '',
    createdUserID: 2,
    currCode: '',
    currID: 1,
    currName: '',
  };

  isEdit: boolean = false;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getList().subscribe(
      (data) => {
        this.list = data;
        this.list.forEach((item: any) => {
          console.log(item.currID);
        });
        console.log(this.list);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDate(date: any) {
    return moment(date).format('DD/MM/YYYY , hh:mm a');
  }

  getSingleItem(id: any) {
    this.appService.getItem(id).subscribe(
      (data) => {
        this.item = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  edit(data: any) {
    this.isEdit = !this.isEdit;
    this.data = data;
    console.log(data);
    this.currencyCode = data.currCode;
    this.currencyName = data.currName;
  }

  editItem() {
    this.data.currName = this.currencyName;
    this.data.currCode = this.currencyCode;
    this.appService.editItem({ ...this.data }).subscribe(
      (data) => {
        alert('Edit successfully');
        this.isEdit = false;
        this.currencyCode = '';
        this.currencyName = '';
      },
      (error) => {
        this.isEdit = false;
        this.currencyCode = ' ';
        this.currencyName = '';
        alert('Something went wrong');
      }
    );
  }

  deleteItem(id: any) {
    this.appService.deleteItem(id).subscribe(
      (data) => {
        alert('Deleted successfully');
      },
      (error) => {
        alert('Something went wrong');
      }
    );
  }
}
