import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CrudActions from './crud.actions';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {CrudService} from "../../services/api/crud.service";

@Injectable()
export class CrudEffects {
  constructor(private actions$: Actions, private crudService: CrudService) {}

  // Effet pour obtenir un élément unique
  getOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CrudActions.getOne),
      mergeMap(action =>
        this.crudService.getOne(action.entity, action.id, action.params).pipe(
          map(data => CrudActions.getOneSuccess({ entity: action.entity, data })),
          catchError(error => of(CrudActions.getOneFailure({ entity: action.entity, error: error.message })))
        )
      )
    )
  );

  // Effet pour obtenir tous les éléments avec pagination
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CrudActions.getAll),
      mergeMap(action =>{
        console.log(action)
        return this.crudService.getAll(action.entity, action.page, action.pageSize, action.params).pipe(
          map((response:any) =>{
            console.log(response)
            return CrudActions.getAllSuccess({
              entity: action.entity,
              data: response.data,
              currentPage: response.current_page,
              totalPages: response.last_page,
              totalItems: response.total
            })
          } ),
          catchError(error => of(CrudActions.getAllFailure({ entity: action.entity, error: error.message }))))
      }


      )
    )
  );
  getAllNoPagination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CrudActions.getAllNoPagination),
      mergeMap(action =>
        this.crudService.getAll(action.entity, 1, 0, action.params).pipe(
          map(response => CrudActions.getAllNoPaginationSuccess({ entity: action.entity, data: response })),
          catchError(error => of(CrudActions.getAllNoPaginationFailure({ entity: action.entity, error: error.message })))
        )
      )
    )
  );

  getCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CrudActions.getCount),
      mergeMap(action =>
        this.crudService.getAll(action.entity, 1, 0, action.params).pipe(
          map(response => CrudActions.getCountSuccess({ entity: action.entity, data: response.data.length })),
          catchError(error => of(CrudActions.getCountFailure({ entity: action.entity, error: error.message })))
        )
      )
    )
  );
  // Effet pour créer un nouvel élément
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CrudActions.create),
      mergeMap(action =>
        this.crudService.create(action.entity, action.data).pipe(
          map(data => CrudActions.createSuccess({ entity: action.entity, data })),
          catchError(error => of(CrudActions.createFailure({ entity: action.entity, error: error.message })))
        )
      )
    )
  );

  // Effet pour mettre à jour un élément existant
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CrudActions.update),
      mergeMap(action =>
        this.crudService.update(action.entity, action.id, action.data).pipe(
          map(data => CrudActions.updateSuccess({ entity: action.entity, data })),
          catchError(error => of(CrudActions.updateFailure({ entity: action.entity, error: error.message })))
        )
      )
    )
  );

  // Effet pour supprimer un élément
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CrudActions.deleteEntity),
      mergeMap(action =>
        this.crudService.delete(action.entity, action.id).pipe(
          map(() => CrudActions.deleteSuccess({ entity: action.entity, id: action.id })),
          catchError(error => of(CrudActions.deleteFailure({ entity: action.entity, error: error.message })))
        )
      )
    )
  );
}
