import { CreateUserInput } from '../../input/create-user';
import { UserService } from '../../../user/service/user';
import { Test } from '@nestjs/testing';
import { User } from '../../../user/entity/user.entity';
import { CreateUserResolver } from './create-user';
import { UserResolver } from '../query/user';

jest.mock('../../../user/service/user');

const createUser = () => {
  const user = new User();

  user.id = 'u1';
  user.fullName = 'John Doe';
  user.email = 'johndoe@domain.com';
  user.createdAt = new Date();
  user.updatedAt = user.createdAt;
  user.password = 'encrypted_with_salt';
  user.salt = 'auto_generated';

  return user;
};

describe('UserMutation', () => {
  const input = new CreateUserInput();

  let userService: UserService;
  let createUserResolver: CreateUserResolver;

  input.fullName = 'John Doe';
  input.email = 'johndoe@domain.com';
  input.password = 'secret';

  let create: jest.SpiedFunction<UserService['createUser']>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService, CreateUserResolver, UserResolver],
    }).compile();

    userService = module.get<UserService>(UserService);
    createUserResolver = module.get<CreateUserResolver>(CreateUserResolver);

    create = jest.spyOn(userService, 'createUser');
    create.mockResolvedValue(createUser());
  });

  describe('createUser', () => {
    it('should call user service with given arguments', async () => {
      await createUserResolver.createUser(input);

      expect(create).toBeCalledWith(input);
    });
  });
});