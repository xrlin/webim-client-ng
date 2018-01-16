import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../models/user.model';
import * as _ from 'lodash';

export interface SelectorData {
  items: User[];
}

/**
 * After comfirm and close will return the selected value(ids) of the items.
 */
@Component({
  selector: 'app-user-selector-dialog',
  templateUrl: './user-selector-dialog.component.html',
  styleUrls: ['./user-selector-dialog.component.scss']
})
export class UserSelectorDialogComponent implements OnInit {

  items: User[];

  selectedItems: User[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<UserSelectorDialogComponent>) {
    const selectorData = data as SelectorData;
    this.items = selectorData.items;
  }


  setSelectedItems(data: any) {
    const ids: number[] = [];
    _.forEach(data, (options) => ids.push(options.value));
    this.selectedItems = _.filter(this.items, (item) => ids.includes(item.id));
    this.dialogRef.close(ids);
  }

  ngOnInit() {
  }

}
