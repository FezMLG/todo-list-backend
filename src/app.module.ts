import { Module } from '@nestjs/common';
import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TodoModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
