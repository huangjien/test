import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  id: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.id = this.route.params['id'];
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
    });
  }
}
