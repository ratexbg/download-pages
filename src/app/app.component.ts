import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Download';

  constructor(private renderer: Renderer2) {

  }

  convertToPDF(page: string) {
    // create elemtn  & innerhtml = ...
    let text = 'SECOND Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus temporibus ipsam praesentium, aut unde. Rerum nulla totam, molestiae eligendi sit consequatur nesciunt ea harum voluptatibus est dolore, corporis dicta!';
    // tozi text moje da sse vzeme ot bazata

    
    const el = document.createElement("h1");
    // this.renderer.setProperty(el, "id", "page2");
    // this.renderer.setProperty(el, "innerHtml", text);
    // this.renderer.appendChild(document.body, el);
   
    el.innerHTML = text;
    el.id = 'page2';
    document.body.appendChild(el);
    // var data = document.getElementById(`page2`);

    // console.log(data);

    html2canvas(el).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
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
