import { Component, OnInit, Injector } from '@angular/core';
import { ApplicationBaseControllerDirective } from '../applicationBase';
import { DataService } from 'src/app/services/data.service';
import { ApplicationTimelineGenerator } from 'src/app/Models/eventstore/timelineGenerators';
import { IEventStoreData } from 'src/app/modules/event-store/event-store/event-store.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent extends ApplicationBaseControllerDirective {

  listEventStoreData: IEventStoreData [];

  constructor(protected data: DataService, injector: Injector) {
    super(data, injector);
  }

  setup() {
    this.listEventStoreData = [
      { eventsList : this.data.createApplicationEventList(this.appId),
        timelineGenerator: new ApplicationTimelineGenerator(),
        displayName : 'Application: ' + this.appId
      }
    ];
  }

}
