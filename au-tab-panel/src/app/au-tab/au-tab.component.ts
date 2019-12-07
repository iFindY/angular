import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { AuTabPanelComponent } from '../au-tab-panel/au-tab-panel.component';

@Component({
  selector: 'au-tab',
  templateUrl: './au-tab.component.html',
  styleUrls: ['./au-tab.component.scss']
})
export class AuTabComponent {

  @Input()
  title: string;
  @Input()
  selected = false;

  constructor() {
  }

}
