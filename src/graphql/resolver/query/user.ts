import { Injectable } from '@nestjs/common';
import { UserService } from '../../../user/service/user';
import { User } from '../../../user/entity/user.entity';
import { Args, Query } from '@nestjs/graphql';
import { UserArgs } from '../../args/user';
import { UserType } from '../../type/user.type';
import { UserInputError } from '../../exception/user.input.error';

@Injectable()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserType, { name: 'user' })
  async resolve(
    @Args() { id }: UserArgs
  ): Promise<User> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new UserInputError({ id: 'Given id not found' });
    }

    return user;
  }
}