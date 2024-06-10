import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router,RouterModule,RouterOutlet } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TinyLoops';
  constructor(private routerNavigate : Router){

  }
  route(pathName: string){
    this.routerNavigate.navigate([pathName])
  
}
}
