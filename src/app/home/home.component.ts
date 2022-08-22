import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

toHome(){
      
    (<HTMLInputElement>document.getElementById("Home")).scrollIntoView();
}

toSection(){
      
      (<HTMLInputElement>document.getElementById("Section")).scrollIntoView();
  }
  
toServices(){
      
    (<HTMLInputElement>document.getElementById("Services")).scrollIntoView();
}
toAbout(){
      
  (<HTMLInputElement>document.getElementById("About")).scrollIntoView();
}

toContact(){
      
  (<HTMLInputElement>document.getElementById("Contact")).scrollIntoView();
}
}
