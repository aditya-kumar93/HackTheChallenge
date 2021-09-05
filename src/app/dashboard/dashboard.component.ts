import { ChallengesService } from './../services/challenges.service';
import { IChallenges } from './../interfaces/challenges';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  challenges : IChallenges[] = [];
  selectedOption : string = 'LIKES';
  
  sortOptions : string[] = ['LIKES','CREATED_ON'];
  challengeDialogVisibility : boolean = false;

  constructor(private challengesService : ChallengesService) { }

  ngOnInit(): void {
    this.getChallenges();
  }

  openChallengeDialog(){
    this.challengeDialogVisibility = true;
  }

  closeChallengeDialog(){

  }

  reloadAfterSave(){
    this.challengeDialogVisibility = false;
    this.getChallenges();
  }

  getChallenges(){
    this.challengesService.getAllChallenges()
    .subscribe(_ =>{
      this.challenges = _;
      this.sortChallenges(this.selectedOption);
    });
  }

  sortChanged($event : any){
    this.sortChallenges(this.selectedOption);
  }

  liked(id: number) {
    this.challengesService.getChallengeById(id).pipe(
      map((challenge) => {
        return {
          ...challenge,
          isLiked: !challenge.isLiked,
          likesCount: !challenge.isLiked ? challenge.likesCount + 1 :  challenge.likesCount - 1
        }
      }),
      switchMap((res) => {
        return this.challengesService.putChallenge(res);
      }),
      switchMap(() =>{
        return this.challengesService.getAllChallenges();
      })
    ).subscribe(_ =>{
      this.challenges = _;
      this.sortChallenges(this.selectedOption);
    });
  }

  sortChallenges(sortType : string = 'LIKES'){
    
    if(sortType == 'CREATED_ON')
    {
      this.challenges = this.challenges.sort((a,b) =>{ return (a.createdOn > b.createdOn ? 1 : -1)});
    }
    else{
      this.challenges.sort((a,b) => { return a.likesCount - b.likesCount});
    }
   
  }



}
