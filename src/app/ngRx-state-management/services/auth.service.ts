import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  user = { userId: 11, userName: "test", email: "test@gmail.com", token: "test token", role: "user" }

  userSignIn(signinModel: any): Observable<any> {
    if (signinModel.email == 'test@gmail.com' && signinModel.password == 'Test@123') {
      return of(this.user).pipe(delay(500))
    }
    else {
      return throwError(() => {
        const error: any = new Error();
        error.message = 'Invalid Credentials';
        return error;
      });
    }

    //return this.http.post("https://localhost:44357/api/User/login", signinModel)
  }
}
