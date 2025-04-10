import { Component } from '@angular/core';
import { SharedheaderComponent } from "../sharedheader/sharedheader.component";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  standalone: true,
  imports: [SharedheaderComponent], // Si c'est un standalone component

})
export class AccueilComponent {
  user:string=""
  ngOnInit() {
    console.log(localStorage.getItem("user"))
    this.user=localStorage.getItem("user") || ""
  }
}
