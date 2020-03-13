import Koa from 'koa';
import {createContainer,Lifetime} from 'awilix';
import {loadControllers,scopePerRequest} from 'awilix-koa';
import co from 'co';
import render from 'koa-swig';
import serve from 'koa-static'

import config from './config';
import format from './middlewares/format';

const container=createContainer();
container.loadModules([__dirname+'/models/*.js'],{
    formatName:'camelCase',
    Lifetime:Lifetime.SCOPED
});
const app = new Koa();
app.use(serve(config.assetsDir));
app.context.format=format;
app.context.render = co.wrap(
    render({
      root: config.viewDir,
      autoescape: true,
      cache: false, // disable, set to false
      ext: 'html',
      varControls:['[[',']]']
    })
  );

require('./middlewares/errorHandler').default.error(app);
app.use(scopePerRequest(container));
app.use(loadControllers(__dirname+'/controllers/*.js'));
app.listen(config.port,()=>{
    console.log(`server is running over ${config.port} port`);
});