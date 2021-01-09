import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ description: 'The real user name with the surname.' })
  @IsNotEmpty({ message: 'Full Name is required!' })
  fullName!: string;

  @Field({ description: 'Email address of user.' })
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail()
  email!: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required!' })
  password!: string;
}