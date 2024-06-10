import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
  styleUrls: ['./no-result.component.scss']
})
export class NoResultComponent implements OnInit {
  @Input () title: string = "No results found.";
  @Input () description:string = "There aren't any results for this query."
  constructor() { }

  ngOnInit(): void {
  }

}
