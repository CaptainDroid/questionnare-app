import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})

export class QuestionsService {

  constructor(private _http: HttpClient) {
   }

  getQuestions() {
    const endpoint = 'profile/survey';
    return this._http.get(BASE_URL + endpoint)
          .pipe(map(data => data));
    }
}
