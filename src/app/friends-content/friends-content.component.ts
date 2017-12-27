import {Component, OnInit} from '@angular/core';
import {FriendsService} from '../core/friends.service';

@Component({
  selector: 'app-friends-content',
  templateUrl: './friends-content.component.html',
  styleUrls: ['./friends-content.component.scss']
})
export class FriendsContentComponent implements OnInit {

  constructor(private friendsService: FriendsService) {
  }

  ngOnInit() {
  }

}
