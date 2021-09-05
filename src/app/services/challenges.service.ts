import { DataStorageService } from './data-storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map, switchMap } from 'rxjs/operators';
import { IChallenges } from '../interfaces/challenges';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {
  storageKey! : string;
  constructor( 
    private dataStorageService: DataStorageService
    ) { 
      this.storageKey = 'Challenges';
    }
    dummyChallnges: IChallenges[] = [
      {
        id: 1,
        name: 'June Meglomaniac',
        likesCount: 10,
        description: `Smart India Hackathon is a nationwide initiative to provide students with a platform to solve some of the pressing problems we face in our daily lives, and thus inculcate a culture of product innovation and a mindset of problem-solving. The first three editions SIH2017, SIH2018 and SIH2019 proved to be extremely successful in promoting innovation out-of-the-box thinking in young minds, especially engineering students from across India.`,
        tags: ['FEATURE'],
        isLiked: true,
        createdOn: new Date('June 01 2019')
      },
      {
        id: 2,
        name: 'August Blaster',
        likesCount: 40,
        description: `Smart India Hackathon is a nationwide initiative to provide students with a platform to solve some of the pressing problems we face in our daily lives, and thus inculcate a culture of product innovation and a mindset of problem-solving. The first three editions SIH2017, SIH2018 and SIH2019 proved to be extremely successful in promoting innovation out-of-the-box thinking in young minds, especially engineering students from across India.`,
        tags: ['FEATURE', 'TECH'],
        isLiked: false,
        createdOn: new Date('August 10 2018'),
      },
      {
        id: 4,
        name: 'December Mania',
        likesCount: 10,
        description: `Smart India Hackathon is a nationwide initiative to provide students with a platform to solve some of the pressing problems we face in our daily lives, and thus inculcate a culture of product innovation and a mindset of problem-solving. The first three editions SIH2017, SIH2018 and SIH2019 proved to be extremely successful in promoting innovation out-of-the-box thinking in young minds, especially engineering students from across India.`,
        tags: ['TECH'],
        isLiked: false,
        createdOn: new Date('December 05 2020')
      },
      {
        id: 3,
        name: 'September Tech Crunch',
        likesCount: 20,
        description: `Smart India Hackathon is a nationwide initiative to provide students with a platform to solve some of the pressing problems we face in our daily lives, and thus inculcate a culture of product innovation and a mindset of problem-solving. The first three editions SIH2017, SIH2018 and SIH2019 proved to be extremely successful in promoting innovation out-of-the-box thinking in young minds, especially engineering students from across India.`,
        tags: ['TECH'],
        isLiked: false,
        createdOn: new Date('September 01 2020')
      }
    ]
    
  
    getAllChallenges(): Observable<IChallenges[]> {
      return this.dataStorageService.getItem(this.storageKey).pipe(
        switchMap((item) => {
          if (item) {
            return of(item);
          } else {
            return this.setStorage(this.dummyChallnges).pipe(
              switchMap(() => {
                return of(this.dummyChallnges)
              })
            )
          }
        })
      )
    }
  
    getChallengeById(id: number): Observable<IChallenges> {
      return this.getAllChallenges().pipe(
        map((challenges) => {
          let challenge = challenges.filter(challenge => {
            return challenge.id === id;
          })
          return challenge[0];
        })
      )
    }
  
    putChallenge(updatedChallenge: IChallenges){
      return this.getAllChallenges().pipe(
        map((challenges) => {
          let updatedChallengs = challenges.map(challenge => {
            if (challenge.id === updatedChallenge.id) {
              challenge = updatedChallenge
            }
            return challenge;
          })
          return updatedChallengs;
        }),
        switchMap((updatedChallnegs) => {
          return this.setStorage(updatedChallnegs);
        })
      )
    }
  
    postChallenge(newChallenge: IChallenges){
      return this.getAllChallenges().pipe(
        map((challenges) => {
          const maxId = challenges.sort((first, second) => {
            return first.id < second.id ?  1 : -1;
          })[0].id
          const nextId = maxId + 1;
  
          challenges.push({
            ...newChallenge,
            id: nextId
          })
          return challenges;
        }),
        switchMap((challenges) => {
          return this.setStorage(challenges);
        })
      )
  
    }
  
  
    setStorage(challenges: IChallenges[]) {
      return this.dataStorageService.setItem({
        key: this.storageKey, 
        value: challenges
      })
    }

}

