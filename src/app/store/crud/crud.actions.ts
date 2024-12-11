import { createAction, props } from '@ngrx/store';

export const getOne = createAction('[Crud] Get One', props<{ entity: string; id: string | number;params?: { [key: string]: any } }>());
export const getOneSuccess = createAction('[Crud] Get One Success', props<{ entity: string; data: any }>());
export const getOneFailure = createAction('[Crud] Get One Failure', props<{ entity: string; error: string }>());

export const getAll = createAction('[Crud] Get All', props<{ entity: string; page: number; pageSize: number; params?: { [key: string]: any } }>());
export const getAllSuccess = createAction('[Crud] Get All Success', props<{ entity: string; data: any[]; currentPage: number; totalPages: number; totalItems: number }>());
export const getAllFailure = createAction('[Crud] Get All Failure', props<{ entity: string; error: string }>());


export const getAllNoPagination = createAction('[Crud] Get All No Pagination', props<{ entity: string; params?: { [key: string]: any } }>());
export const getAllNoPaginationSuccess = createAction('[Crud] Get All No Pagination Success', props<{ entity: string; data: any[] }>());
export const getAllNoPaginationFailure = createAction('[Crud] Get All No Pagination Failure', props<{ entity: string; error: string }>());

export const create = createAction('[Crud] Create', props<{ entity: string; data: any }>());
export const createSuccess = createAction('[Crud] Create Success', props<{ entity: string; data: any }>());
export const createFailure = createAction('[Crud] Create Failure', props<{ entity: string; error: string }>());

export const update = createAction('[Crud] Update', props<{ entity: string; id: string | number; data: any }>());
export const updateSuccess = createAction('[Crud] Update Success', props<{ entity: string; data: any }>());
export const updateFailure = createAction('[Crud] Update Failure', props<{ entity: string; error: string }>());

export const deleteEntity = createAction('[Crud] Delete', props<{ entity: string; id: string | number }>());
export const deleteSuccess = createAction('[Crud] Delete Success', props<{ entity: string; id: string | number }>());
export const deleteFailure = createAction('[Crud] Delete Failure', props<{ entity: string; error: string }>());


export const getCount = createAction('[Crud] Get Count', props<{ entity: string; params?: { [key: string]: any } }>());
export const getCountSuccess = createAction('[Crud] Get Count Success', props<{ entity: string; data: number }>());
export const getCountFailure = createAction('[Crud] Get Count Failure', props<{ entity: string; error: string }>());
