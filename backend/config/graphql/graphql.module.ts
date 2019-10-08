import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   debug: false,
    //   playground: false,
    // }),
  ],
})
export class ApplicationModule {}
