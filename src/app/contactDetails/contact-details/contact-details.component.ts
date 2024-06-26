import { Component } from '@angular/core';
import { LocalStorageService } from '../../servise/local-storage.service';
import { dataPhone } from '../../interface/phoneNumbers';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent {
  user!:dataPhone;

  constructor(private localStorageService: LocalStorageService,private route: ActivatedRoute,
    private router:Router) { }
    ngOnInit(){
      this.route.params.subscribe((params:Params) => {
        const id = +params['id'];
        const users: dataPhone[] = this.localStorageService.getData('users');
        this.user = users.find((element) => element.id == id )!;
    


    })


    }
    goHome() {
      this.router.navigate(['/']);
    }
}
