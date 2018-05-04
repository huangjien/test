import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {
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
