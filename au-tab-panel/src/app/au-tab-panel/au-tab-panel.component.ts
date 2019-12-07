import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { AuTabComponent } from '../au-tab/au-tab.component';

@Component({
  selector: 'au-tab-panel',
  templateUrl: './au-tab-panel.component.html',
  styleUrls: ['../tab-panel.component.scss']
})
export class AuTabPanelComponent implements OnInit, AfterContentInit {

  // AfterContentInit is made for queries on the light or shadow dom of component. need this if code depends on presens of this values
  @ContentChildren(AuTabComponent)
  tabs: QueryList<AuTabComponent>;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    const selectedTab = this.tabs.find(tab => tab.selected);
    if (!selectedTab) {
      this.tabs.first.selected = true;
    }
  }

  selectTab(tab: AuTabComponent) {
    this.tabs.forEach(tab => tab.selected = false);
    tab.selected = true;
  }

}
