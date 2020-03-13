import { route, GET } from 'awilix-koa';

@route('/test')
export default class {
  @route('')
  @GET()
  actionList(ctx, next) {
    ctx.body = 'list index page';
  }

  @route('/type')
  @GET()
  actionType(ctx, next) {
    ctx.body = 'list type';
  }
}
