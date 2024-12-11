import { User } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    const user : User = {};
    expect(user).toBeTruthy();
  });
});
