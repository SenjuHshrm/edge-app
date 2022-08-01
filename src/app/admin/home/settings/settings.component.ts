import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  addButton: boolean = true;
  updateButton: boolean = false;
  indexNum: any;

  constructor() { }

  ngOnInit(): void {
  }


  classiData: any = [
    { description: 'APLIANCES', code: 456985 },
    { description: 'SCHOOLSUPPLIES', code: 823122 },
    { description: 'HARDWARE', code: 56987 }
  ]


  

  addClassi(classificationName: string, codeData: any) {
    this.classiData.push({ description: classificationName, code: codeData });
    (<HTMLInputElement>document.getElementById("classification")).value = "";
    (<HTMLInputElement>document.getElementById("code")).value = "";
  }


  updateClassi(indexNumber: number) {
    this.indexNum = indexNumber;
    console.log("This is index num" + this.indexNum);
    for (let i = 0; i < this.classiData.length; i++) {
      if (indexNumber == i) {
        (<HTMLInputElement>document.getElementById("classification")).value = this.classiData[i].description;
        (<HTMLInputElement>document.getElementById("code")).value = this.classiData[i].code;
        this.addButton = false;
        this.updateButton = true;
      }

    }
  }


  updateBtn(classificationName: string, codeData: any) {
    for (let i = 0; i < this.classiData.length; i++) {
      if (this.indexNum == i) {
        console.log("True" + this.indexNum)
        this.classiData.splice(i, 1, { description: classificationName, code: codeData });
      }
    }
    this.addButton = true;
    this.updateButton = false;
    (<HTMLInputElement>document.getElementById("classification")).value = "";
    (<HTMLInputElement>document.getElementById("code")).value = "";
  }

  updateCancel(){
    this.addButton = true;
    this.updateButton = false;
    (<HTMLInputElement>document.getElementById("classification")).value = "";
    (<HTMLInputElement>document.getElementById("code")).value = "";
  }

  deleteClassi(indexNumber: number) {
    for (let i = 0; i < this.classiData.length; i++) {
      if (indexNumber == i) {
        this.classiData.splice(i, 1);
      }
    }

    this.addButton = true;
    this.updateButton = false;
    (<HTMLInputElement>document.getElementById("classification")).value = "";
    (<HTMLInputElement>document.getElementById("code")).value = "";
  }

}
