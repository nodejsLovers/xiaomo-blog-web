/*
 * Angular
 */
import {Component, ReflectiveInjector} from '@angular/core';
import {CanActivate} from '@angular/router-deprecated';

/*
 * Services
 */
import {AuthService} from 'services/AuthService';

@Component({
  selector: 'protected',
  template: `<h1>Protected content</h1>`
})
@CanActivate(
  (nextInstr: any, currInstr: any) => {
    let injector: any = ReflectiveInjector.resolveAndCreate([AuthService]);
    let authService: AuthService = injector.get(AuthService);
    return authService.isLogged();
  }
)
export class ProtectedComponent {
}
