
import { route, GET } from 'awilix-koa';

@route('/view')
export default class  {
  @route('')
  @GET()
  async actionTest(ctx, next) {
    ctx.type='html';
    ctx.body = await ctx.render('books/list',{
      info:"8楼大神，世界为之颤抖"
    })
  }

}