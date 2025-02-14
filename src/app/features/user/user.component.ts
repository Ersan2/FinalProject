import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DataGridComponent, DataGridHeader } from "../../components/data-grid/data-grid.component";
import { Router } from "@angular/router";
import { UserType } from "../../models/user.model";
import { UserService } from "../../services/user.service";

@Component({
standalone:true,
imports:[FormsModule,DataGridComponent],
templateUrl:'./user.component.html',
styleUrl:'./user.component.css'

})
export class UserPage{
    public dataGridMapping: DataGridHeader[]=[
        {column:'User name', value: 'firstName'},
        {column:"Last name", value:"lastName"},
        {column:"Nickname", value:"nickname"}
    ];
    public userCollection: UserType[]=[];
    public isEditFormVisible    = false;
    public isCreateFormVisible  = false;
    public selectedUser: UserType | null = null;
  
    // Добавям си сервиза за работа с customer обекти
    private userService = inject(UserService)
    private router          = inject(Router);
  
    // ПРи зареждане на компонента
    public ngOnInit() {
      this.fetchAllUsers();
    }
  
    public fetchAllUsers() {
  
      this.userService.getAllUsers().subscribe((result: any) => {
        this.userCollection = result.data;
    })
    }
  
    public processOnCreate() {
  
      this.isCreateFormVisible  = true;
      this.selectedUser   = null;
    }
  
    public processOnEdit($selectedElement: UserType) {
  
      this.isEditFormVisible = true;
      this.selectedUser = $selectedElement;
    }
  
    public processOnSave() {
  
      this.userService.updateUser(this.selectedUser!).subscribe((result) => {
        console.log(result);
      });
    }
  
    public processOnDelete($selectedElement: UserType) {
      this.userService.deleteUser($selectedElement.id!).subscribe((result: any) => {
        this.fetchAllUsers();
      });
    }
  
    public processOnCreateUser($inputFirstName: string,$inputLastName: string, $inputNickname: string) {
      this.userService.createNewUser({
        firstName: $inputFirstName,
        lastName: $inputLastName,
        nickname: $inputNickname

      }).subscribe((result: any) => {
  
          console.log(result);
          this.fetchAllUsers();
      });
    }
  
    public processOnChangeUserName($userInput: string) {
  
      if(this.selectedUser) {
        this.selectedUser.firstName = $userInput;
        this.selectedUser.lastName = $userInput;
        this.selectedUser.nickname = $userInput;
      }
    }
  
    public processOnNavigate($user: UserType) {
      this.router.navigateByUrl(`/user/account/${$user.id}`)
    }




}