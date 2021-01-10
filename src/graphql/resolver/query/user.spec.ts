import { User } from '../../../user/entity/user.entity';
import { UserResolver } from './user';
import { UserService } from '../../../user/service/user';
import { CreateUserResolver } from '../mutation/create-user';
import { Test } from '@nestjs/testing';

jest.mock('../../../user/service/user');

const serverDate = new Date();

const createUser = () => {
  const user = new User();

  user.id = 'u1';
  user.fullName = 'John Doe';
  user.email = 'johndoe@domain.com';
  user.createdAt = serverDate;
  user.updatedAt = user.createdAt;
  user.password = 'encrypted_with_salt';
  user.salt = 'auto_generated';

  return user;
};

describe('UserResolver', () => {
  const user = createUser();

  let userResolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService, UserResolver, CreateUserResolver],
    }).compile();

    userService = module.get<UserService>(UserService);
    userResolver = module.get<UserResolver>(UserResolver);
  });

  describe('resolve', () => {
    it('should resolve user by given user id', async () => {
      const findUserById = jest.spyOn(userService, 'findById').mockResolvedValue(createUser());

      const result = await userResolver.resolve({
        id: 'u1',
      });

      expect(findUserById).toBeCalledWith('u1');
      expect(result).toEqual(user);
    });
  });
});