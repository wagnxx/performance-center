
import { route, GET } from 'awilix-koa';

@route('/manage')
export default class  {
  @route('')
  @GET()
  async actionList(ctx, next) {
    ctx.body =await ctx.render('manage/index');
  }

}