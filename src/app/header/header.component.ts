import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  recipe: Recipe[];
  constructor(private dataService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
  }

  onSave() {
    this.dataService.saveData().subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
  onFetch() {
    this.dataService.getRecipesFromDb();
  }
  logout() {
    this.authService.logout();
  }

}
