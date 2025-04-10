import { Component, OnInit, Input } from "@angular/core";
// import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";


@Component({
  selector: 'app-sharedheader',
  templateUrl: './sharedheader.component.html',
  styleUrls: ['./sharedheader.component.css'],
  imports: [CommonModule,RouterModule]
})
export class SharedheaderComponent implements OnInit {
  @Input() active: string = '';
  user: string = '';

  ngOnInit(): void {
    // Récupérer le nom de l'utilisateur depuis le localStorage
    this.user = localStorage.getItem('user') || '';  // Si 'user' n'est pas trouvé, cela renverra une chaîne vide
  }
}
