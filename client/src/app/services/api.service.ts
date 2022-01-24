import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  sendEmails(ids: string[]): Observable<any> {
    return this.http.post(environment.baseUrl + 'invitations/email/submit', ids);
  }

  updateInvitation(id: string, invitation: Invintation): Observable<any> {
    return this.http.put(`${environment.baseUrl + 'invitations/'}${id}`, invitation);
  }

  deleteInvitations(idList: number[]): Observable<any> {
    return this.http.delete(environment.baseUrl + 'invitations', { body: { idList } });
  }

  findInvitationByUUID(uuid: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}invitations/token/${uuid}`);
  }

  registerInvitation(id: string, registered: boolean): Observable<any> {
    return this.http.put(`${environment.baseUrl}invitations/register/${id}`, { registered: registered });
  }

  login(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}login`, data);
  }

  generateQRcodeById(id: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}invitations/qrcode/${id}`,{});
  }
}
