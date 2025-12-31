import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:5196/api/auth';
  private Url = 'http://localhost:5196/api/auth';

  constructor(private http: HttpClient) {}

 sendOtp(email: string) {
  return this.http.post(
    `${this.baseUrl}/send-otp`,
    { email },
    { responseType: 'text' }   // 👈 IMPORTANT
  );
}


  verifyOtp(email: string, otp: string) {
    return this.http.post(
      `${this.baseUrl}/verify-otp`,
      { email, otp }
    );
  }


   register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.Url}/register`, data);
  }
}
export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
