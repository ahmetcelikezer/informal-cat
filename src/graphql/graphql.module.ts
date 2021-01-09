import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { GraphQLModule as GQLModule } from '@nestjs/graphql';
import { UserResolver } from './resolver/query/user';
import { CreateUserResolver } from './resolver/mutation/create-user';

@Module({
  imports: [
    UserModule,
    GQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      introspection: true,
    }),
  ],
  providers: [
    CreateUserResolver,
    UserResolver,
  ],
})
export class GraphqlModule {}
