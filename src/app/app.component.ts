import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Download';

 convertToPDF(page: string) {    
    var data = document.getElementById(`${page}`); // create elemtn  & innerhtml = ...
    html2canvas(data!).then(canvas => {
        // Few necessary setting options
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png')

console.log(data, "asd"); // tesval sym nqkvi neshta
console.log(canvas.height);
console.log(canvas.width);
console.log(canvas);

let win = window.open();
win!.document.write("<img src='"+canvas.toDataURL('image/png')+"'/>");  /// image na canvasa


        let pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [canvas.width, canvas.height] /// novia pdf e s razmerite na canvasa
        });
         


        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, canvas.width, canvas.height) // dobavq snimkata kato 
        pdf.save('new-file.pdf'); // Generated PDF
    });
 
 
  }
}
