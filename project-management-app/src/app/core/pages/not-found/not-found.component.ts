import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteEnum } from 'src/app/shared/interfaces/enums';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(private router: Router) {}
  OnNavigateHome() {
    this.router.navigate([RouteEnum.boards]);
  }
}
