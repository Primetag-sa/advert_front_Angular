import {BaseEntity} from "./base-entity.model";


describe('BaseEntity', () => {
  it('should create an instance', () => {
    let baseEntity: BaseEntity;
    baseEntity = {id:''};
    expect(baseEntity).toBeTruthy();
  });
});
