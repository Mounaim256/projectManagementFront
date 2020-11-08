import { ElementRef, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit,Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild("nav",{static:true}) navbar : ElementRef;
  fixedNow : boolean = false;
  isOpen : boolean = false;
  isOpenSB : boolean = true;
  @Output() openSBar =  new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.fixedNavbarWhenScroll();
  }

  fixedNavbarWhenScroll(){
    window.addEventListener("scroll",()=>{
      if(window.scrollY >= this.navbar.nativeElement.clientHeight){
        this.fixedNow = true;
      }
      if(!window.scrollY){
        this.fixedNow = false;
      }
    })
  }

  openDropDownMenu(){
    this.isOpen = !this.isOpen;
  }

  openSideBar(){
    this.isOpenSB = ! this.isOpenSB;
    this.openSBar.emit(this.isOpenSB);
  }


}
