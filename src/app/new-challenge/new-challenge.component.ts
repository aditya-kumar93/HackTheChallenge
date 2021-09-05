import { IChallenges } from './../interfaces/challenges';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChallengesService } from '../services/challenges.service';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-new-challenge',
  templateUrl: './new-challenge.component.html',
  styleUrls: ['./new-challenge.component.scss']
})
export class NewChallengeComponent implements OnInit {

  newChallengeForm!: FormGroup;
  visible : boolean = true;
  tagsList: any[] = [ {name: 'Feature'},
  {name: 'Tech'},
  {name: 'Angular'}];

  @Output() closeDialog = new EventEmitter<string>();
  @Output() onSave = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private challengesService: ChallengesService
  ) { }

  ngOnInit(): void {

    this.newChallengeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      tags: [null, Validators.required],
    })
  }

  addNewChallenge() {

    this.newChallengeForm.markAllAsTouched();
    if (this.newChallengeForm.valid) {
      let newChallnege: IChallenges = {
        ...this.newChallengeForm.value,
        createdOn: new Date(),
        likesCount: 0
      }

      this.challengesService.postChallenge(newChallnege).subscribe(() => {
        this.onSave.emit();
      });
    }
  }

  onClose(){
    this.closeDialog.emit();
  }

}
