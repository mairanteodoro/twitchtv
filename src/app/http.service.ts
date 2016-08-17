import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

  apiroot_streams: string = "https://api.twitch.tv/kraken/streams/";
  apiroot_channels: string = "https://api.twitch.tv/kraken/channels/";

  constructor(private http: Http) {}

  getData (streamer: string) {
    return this.http.get(this.apiroot_channels + streamer)
      .map((res: Response) => res.json());
  }

  getDataInParallel (streamer: string) {
    // 1 - this doesn't do anything yet; the user has to call this
    //     and subscribe to actually retrieve the data
    // 2 - .map takes whatever is returned by .get and formats it according to the big fat function
    return Observable.forkJoin([
      this.http.get(this.apiroot_channels + streamer)
        .map((res: Response) => res.json()),
      this.http.get(this.apiroot_streams + streamer)
        .map((res: Response) => res.json())
    ]);
  }

  getDataInSeries (apiroot: string, streamer: string) {
    return this.http.get(apiroot + streamer)
      .map((res: Response) => res.json())
      .flatMap((streamInfo) => {
        return this.http.get(`${streamInfo._links.channel}`)
        .map((res: Response) => res.json());
      })
      .catch(this.handleError);
  }

  handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

}
