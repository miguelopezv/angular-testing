import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';
import { of } from 'rxjs';

describe('Heroes Component', () => {
  let component: HeroesComponent;
  let heroes: Hero[];
  let mockHeroService;

  beforeEach(() => {
    // mock service response
    heroes = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 }
    ];

    // mock service and methods
    mockHeroService = jasmine.createSpyObj([
      'getHero',
      'addHero',
      'deleteHero'
    ]);

    // new component instance
    component = new HeroesComponent(mockHeroService);

    // return observable for ngOnInit to work
    mockHeroService.deleteHero.and.returnValue(of(true));
    component.heroes = heroes;

    component.delete(heroes[2]);
  });

  describe('delete', () => {
    it('should remove hero from the heroes list', () => {
      expect(component.heroes.length).toBe(2);
    });

    it('should call deleteHero', () => {
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]);
    });
  });
});
