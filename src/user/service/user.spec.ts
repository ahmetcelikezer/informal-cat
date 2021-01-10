import { UserService } from './user';
import { Test } from '@nestjs/testing';
import { hash } from 'bcrypt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserRepository } from '../entity/user.repository';
import { CreateUserDTO } from '../dto/create-user.dto';

jest.mock('../entity/user.repository');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(getRepositoryToken(User));
  });

  describe('create user', () => {
    it('should create user', async () => {
      const createUser = new CreateUserDTO();

      createUser.fullName = 'John Doe';
      createUser.email = 'johndoe@domain.com';
      createUser.password = 'top_secret';

      const mockUser = new User();

      jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);

      const user = await userService.createUser(createUser);

      expect(user.fullName).toEqual(createUser.fullName);
      expect(user.email).toEqual(createUser.email);
      expect(user.salt).toBeDefined();
      expect(user.password).toEqual( await hash(createUser.password, user.salt));
    });
  });

  describe('find user by id', () => {
    it('should find user by id', async () => {
      const findById = jest.spyOn(userRepository, 'findOne');

      await userService.findById('mock_id');
      expect(findById).toHaveBeenCalledWith({ id: 'mock_id' });
    });
  });
});