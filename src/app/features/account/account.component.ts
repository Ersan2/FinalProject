import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DataGridComponent, DataGridHeader } from "../../components/data-grid/data-grid.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "../../services/account.service";
import { UserType } from "../../models/user.model";



@Component({

    standalone:true,
    imports:[FormsModule,DataGridComponent],
    templateUrl:'./account.component.html',
    styleUrl:'./account.component.css'

})

export class AccountPage{
    public dataGridMapping: DataGridHeader[]=[
        {column:'Friend name', value: 'firtName'}
       
    ]
    
    public friendCollection: UserType[]=[];
    public selectedUser: UserType | null = null;
    


    private accountService = inject(AccountService)
   private router          = inject(Router);
   

   private userId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.userId = this.route.snapshot.paramMap.get('id');
      
    this.fetchAllFriends(this.userId);
    });
  }
      
    public fetchAllFriends($id:string|null) {
        this.accountService.getAllFriends($id).subscribe((result: any) => {
          this.friendCollection = result.data;
          console.log('shittt', this.userId);
      })
      }
}