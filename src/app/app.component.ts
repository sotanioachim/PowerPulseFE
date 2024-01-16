import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Check the current route to determine whether to show the layout
      this.shouldShowLayout();
    });
  }

  shouldShowLayout(){
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    // Check if the current route is 'login' or 'register'
    const isLoginPage = route.snapshot.routeConfig?.path === 'login';
    const isRegisterPage = route.snapshot.routeConfig?.path === 'register';

    // Show the layout for all pages except 'login' and 'register'
    return !isLoginPage && !isRegisterPage;
  }
}
