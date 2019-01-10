
import {
  OnInit,
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientServicesModalComponent } from 'src/app/modal-components/client-services-modal/client-services-modal.component';
import { ClientSelectComponent } from 'src/app/modal-components/client-select/client-select.component';
import { SelectionService } from 'src/app/services/selection.service';
import { NailWork } from 'src/app/models/client-service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  currentUser:User;

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  display: boolean = false;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [];


  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean ;

  constructor(private modalService: NgbModal,
              private authService:AuthenticationService,
              private selectionService:SelectionService,
              private changeDetectorRefs: ChangeDetectorRef) {
    this.activeDayIsOpen=false;
    this.currentUser=authService.getCurrentUser();
    authService.currentUserEmitter$.subscribe(res=>this.currentUser=res);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modalService.open(this.modalContent, { centered:true,size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: '',
      client:undefined,
      services:[],
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
  openModal(type:string,calendarEvent:CalendarEvent){
    if (calendarEvent) {
      if (type==='addservice') {
        const modalRef = this.modalService.open(ClientServicesModalComponent,{centered:true});
        this.selectionService.selectedServicesForCalendarEmitter$.subscribe((res:Array<NailWork>)=>{
          if (res && res.length>0) {
            calendarEvent.services=res;
            this.changeDetectorRefs.detectChanges();
          }
        });
      }
      else if(type==='addclient')
      {
        const modalRef = this.modalService.open(ClientSelectComponent,{centered:true});
        this.selectionService.selectedClientForCalendarEmitter$.subscribe(res=>{
          if (res) {
            calendarEvent.client=res;
            this.changeDetectorRefs.detectChanges();
          }
        })
      }
    }
    
    
  }
}
