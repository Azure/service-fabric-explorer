import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Constants } from 'src/app/Common/Constants';
import { MessageService } from 'src/app/services/message.service';
import { TelemetryService } from 'src/app/services/telemetry.service';

@Component({
  selector: 'app-advanced-option',
  templateUrl: './advanced-option.component.html',
  styleUrls: ['./advanced-option.component.scss']
})
export class AdvancedOptionComponent implements OnInit {

  status: boolean = false;

  constructor(public storage: StorageService, public messageService: MessageService, public telemetryService: TelemetryService) { }

  ngOnInit() {
    this.status = this.storage.getValueBoolean(Constants.AdvancedModeKey, false);
  }

  change() {
    this.storage.setValue(Constants.AdvancedModeKey, this.status);
  }

  telemetryChange() {
    this.telemetryService.SetTelemetry(this.telemetryService.telemetryEnabled);
  }

}
