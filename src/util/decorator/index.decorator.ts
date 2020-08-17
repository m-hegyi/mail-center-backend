import 'reflect-metadata';

export const Controller = (prefix: string = ''): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata('prefix', prefix, target);

    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }
  };
};

type requestMethod = 'get' | 'post' | 'delete' | 'options' | 'put';

export interface IRouteOptions {
  requestMethod: requestMethod;
  path: string;
  methodName: string;
}

const routeMethodDecorator = (
  path: string,
  methodType: requestMethod,
): MethodDecorator => {
  return (target, propertyKey: string | symbol): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor);

    const routePath = path.charAt(0) === '/' ? path : `/${path}`;

    routes.push({
      requestMethod: methodType,
      path: routePath,
      methodName: propertyKey,
    });
  };
};

export const Get = (path: string = '/'): MethodDecorator => {
  return routeMethodDecorator(path, 'get');
};

export const Post = (path: string = '/'): MethodDecorator => {
  return routeMethodDecorator(path, 'post');
};

// inject
export const Inject = (injectables: Function[]): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata('injectables', injectables, target);
  };
};

// injectable
export const Injectable = (): ClassDecorator => {
  return (target) => {};
};
