import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {
  loading!: Observable<boolean>;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
