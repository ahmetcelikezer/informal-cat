import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class UserArgs {
  @Field(() => ID)
  @IsNotEmpty({ message: 'ID of user is required!' })
  @IsUUID('4', { message: 'Invalid ID given!' })
  id!: string;
}