import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CrudState, EntityState } from './crud.reducer';

// Sélecteur de base pour accéder au state CRUD
export const selectCrudState = createFeatureSelector<CrudState>('crud');

// Sélecteur réutilisable pour l'état d'une entité spécifique
export const selectEntityState = (entity: string) =>
  createSelector(selectCrudState, (state: CrudState) => state.entities[entity]);

// Sélecteur pour obtenir la liste d'éléments d'une entité spécifique
export const selectEntityList = (entity: string) =>
  createSelector(selectEntityState(entity), (entityState: EntityState) => entityState?.list || []);

// Sélecteur pour obtenir une page spécifique d'éléments d'une entité avec pagination
export const selectEntityPage = (entity: string, page: number, pageSize: number = 10) =>
  createSelector(selectEntityState(entity), (entityState: EntityState) => {
    const items = entityState?.pages?.[page] || [];
    return items.slice(0, pageSize); // Limite les éléments à la taille de page définie
  });

// Sélecteur pour obtenir les détails d'un élément spécifique (dernier récupéré avec `getOne`)
export const selectEntityData = (entity: string) =>
  createSelector(selectEntityState(entity), (entityState: EntityState) => entityState?.data || null);

// Sélecteur pour obtenir le statut de chargement d'une entité
export const selectEntityLoading = (entity: string) =>
  createSelector(selectEntityState(entity), (entityState: EntityState) => entityState?.loading || false);

// Sélecteur pour obtenir l'erreur liée à une entité
export const selectEntityError = (entity: string) =>
  createSelector(selectEntityState(entity), (entityState: EntityState) => entityState?.error || null);

// Sélecteur pour obtenir la page actuelle d'une entité
export const selectEntityCurrentPage = (entity: string) =>
  createSelector(selectEntityState(entity), (entityState: EntityState) => entityState?.currentPage || 1);

// Sélecteur pour obtenir le nombre total de pages d'une entité
export const selectEntityTotalPages = (entity: string) =>
  createSelector(selectEntityState(entity), (entityState: EntityState) => entityState?.totalPages || 1);

// Sélecteur pour obtenir le nombre total d'éléments d'une entité
export const selectEntityTotalItems = (entity: string) =>
  createSelector(selectEntityState(entity), (entityState: EntityState) => entityState?.totalItems || 0);

// Sélecteur pour obtenir la taille de page d'une entité
export const selectEntityPageSize = (entity: string) =>
  createSelector(selectEntityState(entity), (entityState: EntityState) => entityState?.pageSize || 10);

// Sélecteur pour vérifier si une page est mise en cache
export const isPageCached = (entity: string, page: number) =>
  createSelector(selectEntityState(entity), (entityState: EntityState) => !!entityState?.pages?.[page]);

export const selectTotalItems = (entity: string) =>
  createSelector(selectEntityState(entity), (entityState: EntityState) => entityState?.totalItems);
