
import { route, GET } from 'awilix-koa';

@route('/api')
export default class  {
  @route('')
  @GET()
  async actionList(ctx, next) {
    ctx.body =await ctx.format.result({code:9874,data:'api controll'});
    
  }

}