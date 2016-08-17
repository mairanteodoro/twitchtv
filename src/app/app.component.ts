import { Component, OnInit } from '@angular/core';
import { ResultsComponent } from './components'
import { HttpService } from './http.service';
import { Response } from '@angular/http';
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { Observable } from 'rxjs/Rx';
import { FilterPipe } from './filter.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
              ResultsComponent,
              BUTTON_DIRECTIVES,
            ],
  providers: [HttpService],
  pipes: [FilterPipe]
})
export class AppComponent implements OnInit {

  public mySearchTerm: string;
  channelInfo: any[] = [];
  streamers: Array<string> = [
                      "freecodecamp",
                      "storbeck",
                      "terakilobyte",
                      "habathcx",
                      "RobotCaleb",
                      "thomasballinger",
                      "noobs2ninjas",
                      "beohoff",
                      "brunofin",
                      "comster404",
                      "test_channel",
                      "cretetion",
                      "sheevergaming",
                      "TR7K",
                      "OgamingSC2",
                      "ESL_SC2",
                    ];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.makeParallelRequest();
  }

  makeParallelRequest() {
    // subscribing the service tells it to retrieve the data
    for (let i in this.streamers) {
      // get channel data info
      // Observable.forkJoin() will execute the requests in parallel
      // (i.e. will wait until everything's loaded)
      // (cf. http://restlet.com/blog/2016/04/12/interacting-efficiently-with-a-restful-service-with-angular2-and-rxjs-part-2/)
      this.httpService.getDataInParallel(this.streamers[i])
        .subscribe(
          // this will contain the returned data
          data => {
            // pushing only data that's interesting
            this.channelInfo.push([
              this.streamers[i],
              data[0].url,
              data[1].stream === null ? "offline": "online",
              data[0].logo === null ? "https://upload.wikimedia.org/wikipedia/en/b/b7/Nologo.png": data[0].logo,
              data[0].status
            ]);
          },
          // this will contain the errors
          error => {
            // console.log('An error occurred inside Parallel.');
            // console.log(error);
            // pushing only data that's interesting
            this.channelInfo.push([
              this.streamers[i],
              "",
              "deact",
              "http://www.susansolovic.com/blog/wp-content/uploads/2014/12/Sorry-Closed-Sign-public-domain-300x300.png",
              ""
            ]);
          }//,
          // this will be executed every time the service is called
          // () => console.log('Parallel request complete for ' + this.streamers[i])
        );
    }
    // console.log('from Parallel');
    // console.log(this.channelInfo);
  }

}
