import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent implements OnInit {
  @Output() searchEvent: EventEmitter<{ value: string }> = new EventEmitter<{ value: string }>();

  private searchBox: FormControl = new FormControl();

  constructor() {
  }

  ngOnInit() {
    this.searchBox.valueChanges
      .debounceTime(200)
      .subscribe((event) => this.searchEvent.emit(event));
  }

}
