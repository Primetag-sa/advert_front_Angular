import { Injectable } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {first, Observable, tap} from "rxjs";
import {filter} from "rxjs/operators";
import {EntityState} from "../../store/crud/crud.reducer";
import {loadItems} from "../../store/crud/crud.actions";



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private store: Store<any>) {} // `any` peut être remplacé par un type de store spécifique

  loadDataIfNotLoaded(entity: string, params: {},nameStore:string): Observable<any> {
    return this.store.pipe(
      select(state => {
        return state[nameStore].entities[entity]
      }), // Sélectionne la partie spécifique de l'entité dans le state
      tap(data => {
        if (!data || this.isDataOutdated(data, params)) {
          // Si les données sont absentes ou obsolètes, déclenche le chargement
          this.store.dispatch(loadItems({ entity, params }));
        }
      }),
      filter(data => !!data), // Continue seulement si les données sont disponibles
      first() // Termine l'observable après la première émission
    );
  }

  private isDataOutdated(data: any, params: {}): boolean {
    // Implémentez ici une logique pour déterminer si les données sont obsolètes selon les params
    return false; // Par exemple, retourner `true` si les données doivent être rechargées
  }


}
