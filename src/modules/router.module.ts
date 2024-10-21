import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RoutesAuthModule } from './route/router.auth.module';
import { RoutesCategoryModule } from './route/router.category.module';
import { RoutesAccountModule } from './route/router.account.module';
import { RoutesTransactionModule } from './route/router.transaction.module';

@Module({})
export class RouterModule {
  static forRoot(): DynamicModule {
    const imports: (DynamicModule | Type<any> | Promise<DynamicModule> | ForwardReference<any>)[] = [];
    imports.push(
      RoutesAuthModule,
      RoutesCategoryModule,
      RoutesAccountModule,
      RoutesTransactionModule,
      NestJsRouterModule.register([
        {
          path: '/auth',
          module: RoutesAuthModule,
        },
        {
          path: '/category',
          module: RoutesCategoryModule,
        },
        {
          path: '/account',
          module: RoutesAccountModule,
        },
        {
          path: '/transaction',
          module: RoutesTransactionModule,
        },
      ]),
    );
    return {
      module: RouterModule,
      providers: [],
      exports: [],
      controllers: [],
      imports,
    };
  }
}
