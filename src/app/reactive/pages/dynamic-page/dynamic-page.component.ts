import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})


export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  })

  public newFavorite: FormControl = new FormControl('',[ Validators.required])

  
  
  constructor(private fb: FormBuilder){
    }

    get favoriteGames(){
      return this.myForm.get('favoriteGames') as FormArray;
    }

    isValidField(field: string): boolean | null{
      return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
    }
    
    isValidFieldInArray( formArray : FormArray, index : number){
      return formArray.controls[index].errors
      && formArray.controls[index].touched
    }

    onDeleteFavorite( index:number): void {
      this.favoriteGames.removeAt(index)
    }

    onAddFavorites(): void {
      if(this.newFavorite.invalid) return
      const newGame = this.newFavorite.value;

      this.favoriteGames.push(
        this.fb.control(newGame, Validators.required));
    
      console.log(this.newFavorite.value)

      this.newFavorite.reset();
    }
  onSubmit():void{
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value)
    this.myForm.reset();
  }

}
