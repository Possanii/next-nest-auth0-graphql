import { AuthModule } from '@/auth/auth.module';
import { CoursesService } from '@/services/courses.service';
import { StudentsService } from '@/services/students.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { DatabaseModule } from '../database/database.module';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
  ],
  providers: [
    // Resolvers
    StudentsResolver,
    EnrollmentsResolver,
    CoursesResolver,

    //Services
    StudentsService,
    CoursesService,
  ],
})
export class HttpModule {}
