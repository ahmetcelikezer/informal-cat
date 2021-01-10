import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';
import { genSalt, hash } from 'bcrypt';
import { UserRepository } from '../entity/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  findById(id: string): Promise<User|undefined> {
    return this.userRepository.findOne({ id });
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = new User();

    user.fullName = createUserDTO.fullName;
    user.email = createUserDTO.email;
    user.salt = await genSalt();
    user.password = await hash(createUserDTO.password, user.salt);

    try {
      await user.save();
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('The user already exists!');
      }
    }

    return user;
  }
}