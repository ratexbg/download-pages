import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  totalAngularPackages='';

  @Output() textEvent = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/pages/1').subscribe(data => {
      this.totalAngularPackages = data.text;
    //  console.log(this.totalAngularPackages);

    // sendText(){
    //   this.textEvent.emit(this.totalAngularPackages);
    // }
  })    
  }


}
