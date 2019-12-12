import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})

export class TituloComponent implements OnInit {
  // tslint:disable-next-line: no-inferrable-types
  @Input() titulo: string = '';

  constructor() { }

  ngOnInit() {
  }

}
