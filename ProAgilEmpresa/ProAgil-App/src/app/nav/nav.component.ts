import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private route: Router,
              private toastr: ToastrService,
              private authService: AuthService) {}

  ngOnInit() {}

  loggedIn() {
    return this.authService.loggedIn();
  }

  entrar() {
    this.route.navigate(['/user/login']);
  }

  getUserName() {
    return sessionStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.show('Você não está mais logado!');
    this.route.navigate(['/user/login']);
  }

  isLogginPage() {
    return this.route.url === '/user/login';
  }


}
