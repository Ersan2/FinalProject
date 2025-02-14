import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { enviroment } from "../environments/enviroment.dev";
import { UserType } from "../models/user.model";

@Injectable({
    providedIn:"root"
})

export class AccountService{
    private httpClient=inject(HttpClient);
    private friendUrl=`${enviroment.baseUrl}`

public getAllFriends($id:string|null){
return this.httpClient.get(`${this.friendUrl}/friends/${$id}`);
}



}