import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../../core/service/hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero!: Hero;
  constructor(
    private heroService: HeroService,
    private location: Location,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.getHero();
  }
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.heroService.getOne(id).subscribe(hero => this.hero = hero);

  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero).subscribe(() => this.goBack())
  }

  isFormValid(): boolean{
    return !this.hero.name.trim()
    }


}
