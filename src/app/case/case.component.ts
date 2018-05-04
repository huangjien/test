import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {

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
