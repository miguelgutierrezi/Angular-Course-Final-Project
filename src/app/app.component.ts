import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Course';
  @Input() loadedFeature = 'recipes';
  onNavigate(event: string) {
    this.loadedFeature = event;
  }
}
