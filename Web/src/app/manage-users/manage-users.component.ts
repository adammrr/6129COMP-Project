import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../services/db/tutorial.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

}
