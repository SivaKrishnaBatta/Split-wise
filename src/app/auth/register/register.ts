import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
   standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  form!: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
     private router: Router  
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('verifiedEmail');
     if (!email) {
    // 🔒 safety: no OTP → go back
    this.router.navigate(['/otp']);
    return;
     }
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: email, disabled: true }, Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    const payload = {
      ...this.form.getRawValue() // include disabled email
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.successMsg = 'Registration successful';
        this.loading = false;
      },
      error: err => {
        this.errorMsg = err.error || 'Registration failed';
        this.loading = false;
      }
    });
  }

}
