import { Injectable } from '@nestjs/common';
import { UserService } from '../../../user/service/user';
import { User } from '../../../user/entity/user.entity';
import { Args, Mutation } from '@nestjs/graphql';
import { CreateUserInput } from '../../input/create-user';
import { UserType } from '../../type/user.type';

@Injectable()
export class CreateUserResolver {
  constructor(private userService: UserService) {
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.createUser(input);
  }
}