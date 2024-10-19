import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RoutesAuthModule } from './route/router.auth.module';
import { RoutesCategoryModule } from './route/router.category.module';

@Module({})
export class RouterModule {
  static forRoot(): DynamicModule {
    const imports: (DynamicModule | Type<any> | Promise<DynamicModule> | ForwardReference<any>)[] = [];
    imports.push(
      RoutesAuthModule,
      RoutesCategoryModule,
      NestJsRouterModule.register([
        {
          path: '/auth',
          module: RoutesAuthModule,
        },
        {
          path: '/category',
          module: RoutesCategoryModule,
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
