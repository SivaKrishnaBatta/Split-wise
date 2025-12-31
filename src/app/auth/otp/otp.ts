import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp.html',
  styleUrls: ['./otp.scss']
})
export class OtpComponent implements OnInit {

  otpSent = false;
  loading = false;
  errorMsg = '';
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router        // ✅ ADD THIS
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
    });
  }

  sendOtp() {
    if (this.form.get('email')?.invalid) return;

    this.loading = true;

    this.authService.sendOtp(this.form.value.email!)
      .subscribe({
        next: () => {
          this.loading = false;
          this.otpSent = true;
        },
        error: err => {
          this.errorMsg = err.error ?? 'Failed to send OTP';
          this.loading = false;
        }
      });
  }

  verifyOtp() {
    if (this.form.get('otp')?.invalid) return;

    this.loading = true;

    this.authService.verifyOtp(
      this.form.value.email!,
      this.form.value.otp!
    ).subscribe({
      next: () => {
        // ✅ STORE VERIFIED EMAIL
        localStorage.setItem(
          'verifiedEmail',
          this.form.value.email!
        );

        // ✅ NAVIGATE TO REGISTER
        this.router.navigate(['/register']);

        this.loading = false;
      },
      error: err => {
        this.errorMsg = err.error ?? 'Invalid OTP';
        this.loading = false;
      }
    });
  }
}
