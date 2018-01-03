import {Component, HostListener, Input, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {FormControl, Validators} from '@angular/forms';

type CallbackFunc = (value?: string) => void;


@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss']
})
export class InlineEditComponent implements OnInit {
  @Input() saveCallbackFuc?: CallbackFunc;

  @Input() text: string;

  @Input() disabled?: boolean;

  loading = false;

  opened = false;

  newInput = new FormControl('newInput', [Validators.required]);

  constructor() {
  }

  save() {
    if (this.newInput.invalid) {
      return;
    }
    this.newInput.disable();
    if (this.saveCallbackFuc) {
      this.loading = true;
      this.saveCallbackFuc(this.newInput.value);
    }
    this.loading = false;
    this.newInput.enable();
    this.opened = false;
  }

  openEdit(event: MouseEvent) {
    if (this.disabled) {
      return;
    }
    this.opened = true;
    event.stopPropagation();
  }

  @HostListener('document:keyup', ['$event'])
  closeEdit(event?: KeyboardEvent) {
    if (isNullOrUndefined(event) || (event && event.key === 'Escape')) {
      this.opened = false;
    }
  }

  ngOnInit() {
  }

}
