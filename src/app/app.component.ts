import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
// import { Page } from './Page';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Download';

  // page: Page[] = [];

  text = '';
  id : number = 1;
  constructor(private renderer: Renderer2, private http: HttpClient) {

  }

  // receiveText($event: string){
  //   this.para= $event
  //   console.log(this.para, " asd");
  // }

 async countId(){ for (this.id = 1; this.id < 4; this.id++) {
    this.convertToPDF();
    
    }  
  }


  async convertToPDF() {
    // create elemtn  & innerhtml = ...
    // let text = 'SECOND Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus temporibus ipsam praesentium, aut unde. Rerum nulla totam, molestiae eligendi sit consequatur nesciunt ea harum voluptatibus est dolore, corporis dicta!';
    // tozi text moje da sse vzeme ot bazata
    let data = await lastValueFrom(this.http.get<any>(`http://localhost:3000/pages${this.id?'/'+this.id:''}`))
      this.text = Array.isArray(data)?data[0].text:data.text;
    console.log(this.text);
   
    
    
    const el = document.createElement("h1");
    // this.renderer.setProperty(el, "id", "page2");
    // this.renderer.setProperty(el, "innerHtml", text);
    // this.renderer.appendChild(document.body, el);
   
    el.innerHTML = this.text;
    el.id = 'page2';
    document.body.appendChild(el); // priema i child. 
    // var data = document.getElementById(`page2`);

    // console.log(data);

    html2canvas(el).then(canvas => {
      // Few necessary setting options
      var imgWidth = 104;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
   

      // console.log(data, "asd"); // tesval sym nqkvi neshta
      // console.log(canvas.height);
      // console.log(canvas.width);
      

      // let win = window.open();
      // win!.document.write("<img src='"+canvas.toDataURL('image/png')+"'/>");  /// image na canvasa

      console.log(canvas);
      let pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height] /// novia pdf e s razmerite na canvasa
      });



      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, canvas.width, canvas.height) // dobavq snimkata kato 
      pdf.save('new-file.pdf'); // Generated PDF
      this.renderer.removeChild(document.body,el);


    });


  }
}
