import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isOpen : Array<boolean> = [false];
  names : Array<string> = ["project"];
  fontNames : Array<string> = ["fa-project-diagram"];
  @Input() isOpenSideBar : boolean;
  constructor() { }

  ngOnInit() {
  }

  openDropDownMenu(index){
    this.isOpen[index] = !this.isOpen[index];
  }

}
