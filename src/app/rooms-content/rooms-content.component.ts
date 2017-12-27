import {Component, OnInit} from '@angular/core';
import {RoomsService} from '../core/rooms.service';
import {Room} from '../models/room.models';

@Component({
  selector: 'app-room-content',
  templateUrl: './rooms-content.component.html',
  styleUrls: ['./rooms-content.component.scss']
})
export class RoomContentComponent implements OnInit {
  rooms: Room[];

  constructor(private groupService: RoomsService) {
  }

  ngOnInit() {
    this.groupService.rooms.subscribe((groups: Room[]) => this.rooms = groups);
  }

}
