import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isOpenSB : boolean = true;

  constructor() { }

  ngOnInit() {
  }

  openSideBar(item){
    this.isOpenSB = item;
  }

}
