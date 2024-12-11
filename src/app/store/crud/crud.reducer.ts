import { createReducer, on } from '@ngrx/store';
import * as CrudActions from './crud.actions';

export interface EntityState {
  pages: { [page: number]: any[] }; // Store each page’s data separately
  data: any | null;
  list: any[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
}

export interface CrudState {
  entities: {
    [key: string]: EntityState;
  };
}

const initialState: CrudState = {
  entities: {}
};

export const crudReducer = createReducer(
  initialState,

  // Handler pour obtenir un élément unique
  on(CrudActions.getOne, (state, { entity }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: { ...state.entities[entity], loading: true, error: null }
    }
  })),
  on(CrudActions.getOneSuccess, (state, { entity, data }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: { ...state.entities[entity], data, loading: false, error: null }
    }
  })),
  on(CrudActions.getOneFailure, (state, { entity, error }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: { ...state.entities[entity], loading: false, error }
    }
  })),

  // Handler pour obtenir une liste paginée d'éléments
  on(CrudActions.getAll, (state, { entity, page, pageSize }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: {
        ...state.entities[entity],
        list: [],
        currentPage: page,
        pageSize,
        loading: true,
        error: null
      }
    }
  })),
  on(CrudActions.getAllSuccess, (state, { entity, data, currentPage, totalPages, totalItems }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: {
        ...state.entities[entity],
        pages: {
          ...state.entities[entity]?.pages, // Keep existing pages
          [currentPage]: data               // Update or add the new page data
        },
        list: data,
        currentPage,
        totalPages,
        totalItems,
        loading: false,
        error: null
      }
    }
  })),
  on(CrudActions.getAllFailure, (state, { entity, error }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: { ...state.entities[entity], loading: false, error }
    }
  })),
  // Gestion de l'action pour obtenir tous les éléments sans pagination
  on(CrudActions.getAllNoPagination, (state, { entity }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: { ...state.entities[entity], loading: true, error: null }
    }
  })),
  on(CrudActions.getAllNoPaginationSuccess, (state, { entity, data }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: {
        ...state.entities[entity],
        list: data, // Stocke la liste complète sans pagination
        loading: false,
        error: null
      }
    }
  })),
  on(CrudActions.getAllNoPaginationFailure, (state, { entity, error }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: { ...state.entities[entity], loading: false, error }
    }
  })),
  // Handler pour créer un nouvel élément
  on(CrudActions.create, (state, { entity }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: { ...state.entities[entity], loading: true, error: null }
    }
  })),
  on(CrudActions.createSuccess, (state, { entity, data }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: {
        ...state.entities[entity],
        list: [...state.entities[entity].list, data], // Ajoute l'élément créé à la liste
        loading: false,
        error: null
      }
    }
  })),
  on(CrudActions.createFailure, (state, { entity, error }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: { ...state.entities[entity], loading: false, error }
    }
  })),

  // Handler pour mettre à jour un élément existant
  on(CrudActions.update, (state, { entity }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: { ...state.entities[entity], loading: true, error: null }
    }
  })),
  on(CrudActions.updateSuccess, (state, { entity, data }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: {
        ...state.entities[entity],
        list: state.entities[entity].list.map(item =>
          item.id === data.id ? data : item
        ), // Remplace l'élément mis à jour dans la liste
        loading: false,
        error: null
      }
    }
  })),
  on(CrudActions.updateFailure, (state, { entity, error }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: { ...state.entities[entity], loading: false, error }
    }
  })),

  // Handler pour supprimer un élément
  on(CrudActions.deleteEntity, (state, { entity }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: { ...state.entities[entity], loading: true, error: null }
    }
  })),
  on(CrudActions.deleteSuccess, (state, { entity, id }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: {
        ...state.entities[entity],
        list: state.entities[entity].list.filter(item => item.id !== id), // Supprime l'élément de la liste
        loading: false,
        error: null
      }
    }
  })),
  on(CrudActions.deleteFailure, (state, { entity, error }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: { ...state.entities[entity], loading: false, error }
    }
  })),
  // Gestion de l'action pour obtenir tous les éléments sans pagination
  on(CrudActions.getCount, (state, { entity }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: { ...state.entities[entity], loading: true, error: null }
    }
  })),
  on(CrudActions.getCountSuccess, (state, { entity, data }) => {
    return {
      ...state,
      entities: {
        ...state.entities,
        [entity]: {
          ...state.entities[entity],
          totalItems: data, // Stocke la liste complète sans pagination
          loading: false,
          error: null
        }
      }
    };
  }),
  on(CrudActions.getCountFailure, (state, { entity, error }) => ({
    ...state,
    entities: {
      ...state.entities,
      [entity]: { ...state.entities[entity], loading: false, error }
    }
  })),




);
