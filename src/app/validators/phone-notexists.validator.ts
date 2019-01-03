import { AsyncValidatorFn, AbstractControl, ValidationErrors  } from '@angular/forms';
import { map, debounceTime } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';

export class ValidatePhoneNotExist{
  static createValidator(userService: UserService): AsyncValidatorFn
  {
    return (control: AbstractControl):  Promise<{ [key: string]: any } | null> =>
    {

      return userService.getPnoneNumber(control.value).then(
          res=>{
               if(res.empty)
              {
                  return null;
              }
              else return{'phoneExist': true };
          }
      )
    }
                                         
  }
}
