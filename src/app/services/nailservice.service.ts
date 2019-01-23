import { Injectable } from '@angular/core';
import { NailWork, ServiceType } from '../models/client-service';


@Injectable({
  providedIn: 'root'
})
export class NailserviceService {

 private nailservices: NailWork[];
 private selectedService: NailWork[];
  constructor() {
    this.nailservices = [
                       new NailWork (ServiceType.manicure, 30),
                       new NailWork (ServiceType.male_manicure, 30),
                       new NailWork (ServiceType.medical_pedicure, 60),
                       new NailWork (ServiceType.pedicure, 60) ];
   }
   getNailServices(): NailWork[] {
     return this.nailservices;
   }
}
