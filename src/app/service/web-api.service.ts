import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

import {HttpClient, HttpParams, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  postBin: PostBin;
  constructor(
    private httpClient: HttpClient
  ) {
    this.postBin = new PostBin(this.httpClient);
  }
}
class PostBin
{
  httpClient: HttpClient;
  curPostBinUrl = environment.postbin_api_url + '/' + environment.postbin_key;
  curMockBinUrl = environment.mockbinbin_api_url + '/' + environment.mockbinbin_key;

  constructor(httpClient: HttpClient){
    this.httpClient = httpClient;
  }
  post(ud): any{
    /*
     * TODO
     * As post bin is not responding properly testing with mock bin.
     * PostBin has issue with CORS header which can be managed by mock bin
     * Please uncomment below code and comment get request code to test if so.
     */
    // this.curPostBinUrl = this.curMockBinUrl;
    const formatData = new FormData();
    formatData.append('name', ud.name);
    formatData.append('message',  ud.message);
    return this.httpClient.post(this.curMockBinUrl, formatData, {responseType: 'text'});

    /*
    * TODO
    * We going to have some error due to browser security policy.
    * For this error we need fix from server side which is not in our hand.
    * Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://postb.in/.
    * (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).
    * USING POST BIN CODE TESTING IS NOT POSSIBLE (NO RESPONSE) SO CHANGE TO MOCK BIN AS EXPLAINED ABOVE
    * */
    /*const httpParams = new HttpParams().set('name', ud.name).set('message', ud.message);
    const cpbUrl = this.curPostBinUrl + '?' + httpParams.toString();
    return this.httpClient.get(cpbUrl, {responseType: 'text'});*/
  }
}
