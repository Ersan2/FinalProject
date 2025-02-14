import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { enviroment } from "../environments/enviroment.dev";
import { UserType } from "../models/user.model";

@Injectable({
    providedIn:"root"
})


export class UserService{
private httpClient=inject(HttpClient);
private baseUrl=`${enviroment.baseUrl}/user`;


public getAllUsers(){
    return this.httpClient.get(this.baseUrl)

}
public createNewUser($user: UserType) {
    return this.httpClient.post(this.baseUrl, $user);
  }

  public updateUser($user: UserType) {
    return this.httpClient.put(this.baseUrl, $user);
  }

  public deleteUser($id: number) {
    return this.httpClient.put(`${this.baseUrl}/${$id}`,$id);
  }

  public getAllFriends($id: number) {
    return this.httpClient.get(`${this.baseUrl}/${$id}/account`);
  }
}