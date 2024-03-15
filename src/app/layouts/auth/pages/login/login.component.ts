import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  revealPassword= false
loginForm: FormGroup;
constructor(private fb: FormBuilder, private authService: AuthService){
  this.loginForm = this.fb.group({
    email: this.fb.control('',[Validators.email, Validators.required]),
    password: this.fb.control('',[Validators.required])

  })
}

onSubmit():void{
  if(this.loginForm.invalid){
    this.loginForm.markAllAsTouched()
  }else{
      console.log(this.loginForm.value)
      this.authService.login(this.loginForm.value)
    }

  
  }
}

