import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invintation } from '../interfaces/invitation.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getInvitations(): Observable<any> {
    return this.http.get(environment.baseUrl + 'invitations');
  }

  saveInvitation(invitation: Invintation[]): Observable<any> {
    return this.http.post(environment.baseUrl + 'invitations', invitation);
  }
}
