import 'reflect-metadata';
import express, { IRoute } from 'express';
import * as env from 'dotenv';

import {
  IRouteOptions,
  Inject,
  Injectable,
} from './util/decorator/index.decorator';
import { AdminController } from './controller/admin.controller';

env.config();

const app = express();

[AdminController].forEach((controller) => {
  const instance = new controller();
  const prefix = Reflect.getMetadata('prefix', controller);

  const routes: IRouteOptions[] = Reflect.getMetadata('routes', controller);

  routes.forEach((route) => {
    app[route.requestMethod](
      prefix + route.path,
      (req: express.Request, res: express.Response) => {
        // Execute our method for this path and pass our express request and response object.
        (instance as any)[route.methodName](req, res);
      },
    );
  });
});

// TODO
@Injectable()
class Repo {
  private readonly cats: Object = {};
  findOne() {
    console.log('hello');
  }
}

class Repo2 {
  findOne() {
    console.log('another one');
  }
}

@Inject([Repo, Repo2])
class Test {
  constructor(private repo: Repo, private repo2: Repo2) {}

  test() {
    this.repo.findOne();
    this.repo2.findOne();
  }
}

[Test].forEach((test) => {
  const injectables: Function[] = Reflect.getMetadata('injectables', test);

  const injectableInstances = [];

  injectables.forEach((injectable) => {
    injectableInstances.push(new injectable());
  });

  const instance = new test(...injectableInstances);

  instance.test();
});

// console.log(app._router.stack);

app.listen(3000, async () => {
  // const connection = await createConnection({
  //   type: 'mysql',
  //   host: process.env.MYSQL_HOST || 'localhost',
  //   port: parseInt(process.env.MYSQL_PORT ?? '', 10) || 3306,
  //   username: process.env.MYSQL_USER,
  //   password: process.env.MYSQL_PASSWORD,
  //   database: process.env.MYSQL_DATABASE,
  //   entities: [`${__dirname}/entity/*.entity.ts`],
  //   synchronize: true,
  // });
  // const response = await getRepository(UserPermission).find();
  // console.log(response);
  // // console.log(connection);
  // console.log('hello');
});

export default app;
