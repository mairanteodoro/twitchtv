import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FilterPipe } from '../filter.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.css'],
  pipes: [FilterPipe],
})
export class ResultsComponent implements OnInit{

  // data available from app.component.ts through property binding
  @Input() channelInfo;

  validData: any[] = [];
  mySearchTerm: string;

  ngOnInit() {
    this.validData = this.channelInfo;
    this.mySearchTerm = '';
  };

  allClicked() {
    this.mySearchTerm = '';
    this.validData = [];
    this.validData = this.channelInfo;
  }

  onLineClicked() {
    this.mySearchTerm = '';
    this.validData = [];
    for (let entry of this.channelInfo) {
      if (entry[2].toLowerCase() === "online") {
        this.validData.push(entry);
      }
    }
  }

  offLineClicked() {
    this.mySearchTerm = '';
    this.validData = [];
    for (let entry of this.channelInfo) {
      if (entry[2].toLowerCase() === "offline") {
        this.validData.push(entry);
      }
    }
  }

  deactClicked() {
    this.mySearchTerm = '';
    this.validData = [];
    for (let entry of this.channelInfo) {
      if (entry[2].toLowerCase() === "deact") {
        this.validData.push(entry);
      }
    }
  }

}
