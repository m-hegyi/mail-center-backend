import {
  Controller,
  Get,
  IRouteOptions,
  Post,
} from '../../util/decorator/index.decorator';

describe('decorator tests', () => {
  describe('controller decorator', () => {
    it('controller create routes and prefix metadata', () => {
      const prefix = '/test';
      @Controller(prefix)
      class Test {}

      expect(Reflect.getMetadata('prefix', Test)).toBe(prefix);
      expect(Reflect.hasMetadata('routes', Test)).toBe(true);
    });

    it('controller got no values', () => {
      @Controller()
      class Test {}

      expect(Reflect.getMetadata('prefix', Test)).toBe('');
      expect(Reflect.hasMetadata('routes', Test)).toBe(true);
    });
  });

  describe('method decorators', () => {
    it('get decorator create route options', () => {
      class Test {
        @Get('/test-route')
        testMethod() {}
      }

      const routes: IRouteOptions[] = Reflect.getMetadata('routes', Test);

      expect(routes[0].path).toBe('/test-route');
      expect(routes[0].requestMethod).toBe('get');
      expect(routes[0].methodName).toBe('testMethod');
    });

    it('get decorator without route', () => {
      class Test {
        @Get()
        testMethod() {}
      }

      const routes: IRouteOptions[] = Reflect.getMetadata('routes', Test);

      expect(routes[0].path).toBe('/');
      expect(routes[0].requestMethod).toBe('get');
      expect(routes[0].methodName).toBe('testMethod');
    });

    it('get decorator route option without /', () => {
      const route = 'test-route';
      class Test {
        @Post(route)
        testMethod() {}
      }

      const routes: IRouteOptions[] = Reflect.getMetadata('routes', Test);

      expect(routes[0].path).toBe(`/${route}`);
      expect(routes[0].requestMethod).toBe('post');
      expect(routes[0].methodName).toBe('testMethod');
    });
    it('post decorator create route options', () => {
      class Test {
        @Post('/test-route')
        testMethod() {}
      }

      const routes: IRouteOptions[] = Reflect.getMetadata('routes', Test);

      expect(routes[0].path).toBe('/test-route');
      expect(routes[0].requestMethod).toBe('post');
      expect(routes[0].methodName).toBe('testMethod');
    });

    it('post decorator without route', () => {
      class Test {
        @Post()
        testMethod() {}
      }

      const routes: IRouteOptions[] = Reflect.getMetadata('routes', Test);

      expect(routes[0].path).toBe('/');
      expect(routes[0].requestMethod).toBe('post');
      expect(routes[0].methodName).toBe('testMethod');
    });

    it('post decorator route option without /', () => {
      const route = 'test-route';
      class Test {
        @Post(route)
        testMethod() {}
      }

      const routes: IRouteOptions[] = Reflect.getMetadata('routes', Test);

      expect(routes[0].path).toBe(`/${route}`);
      expect(routes[0].requestMethod).toBe('post');
      expect(routes[0].methodName).toBe('testMethod');
    });
  });
});
