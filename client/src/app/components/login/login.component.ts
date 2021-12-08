import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService, private fb: FormBuilder, public router: Router) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });


  ngOnInit(): void {
  }

  login() {
    const loginData = this.loginForm.value;

    this.apiService.login(loginData).subscribe(res => {
      localStorage.setItem('accessToken', res.accessToken);
      this.router.navigate(['panel']);
    });
  }
}
