import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://randomuser.me/api/?results=10';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }
  users;


  // getLocalUsers(){
  //   return this.users;
  // }
  // setLocalUsers(users){
  //   return this.users=users;
  // }
  getUsers (): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        tap(users => this.users=users),
        catchError(this.handleError('getUsers', []))
      );
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

     

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
