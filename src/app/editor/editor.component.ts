import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {

  @ViewChild('editor') editorElem: ElementRef;
  @Input() initMessage?: string;
  @Output() change: EventEmitter<string> = new EventEmitter<string>(false);
  @Output() submit: EventEmitter<string> = new EventEmitter<string>(false);
  editor: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  trackKey(event: KeyboardEvent) {
    const value = this.editorElem.nativeElement.value;
    if (event.ctrlKey && event.code === 'Enter') {
      this.submit.emit(value);
      this.editorElem.nativeElement.blur();
      this.editorElem.nativeElement.value = '';
      return;
    }
    this.change.emit(value);
  }


}
