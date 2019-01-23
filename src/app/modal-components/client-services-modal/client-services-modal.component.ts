import { Component, Input , OnInit} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NailWork } from 'src/app/models/client-service';
import { NailserviceService } from 'src/app/services/nailservice.service';
import { SelectionService } from 'src/app/services/selection.service';

@Component({
  selector: 'app-client-services-modal',
  templateUrl: './client-services-modal.component.html',
  styleUrls: ['./client-services-modal.component.css']
})
export class ClientServicesModalComponent implements OnInit {

  private nailservices: NailWork[];
  private selectedServices: NailWork[];

  constructor(public activeModal: NgbActiveModal,
              private  nailServiceService: NailserviceService,
              private selectionService: SelectionService) {
     this.selectedServices = [];
    }

    ngOnInit() {
      this.nailservices = this.nailServiceService.getNailServices();
  }

  onSelectNailService(nailService: NailWork) {
    if (nailService) {
         const index = this.selectedServices.indexOf(nailService);
         if (index == -1) {
           this.selectedServices.push(nailService);
         } else { this.selectedServices.splice(index, 1); }

    }
  }

  sendSelected() {
    if (this.selectedServices.length > 0) {
       this.selectionService.emitServicesForCalendar(this.selectedServices);
       this.activeModal.close('select services click');
    }

  }
}
