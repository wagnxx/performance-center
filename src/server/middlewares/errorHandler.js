export default {
    error(app){
        app.use(async (ctx,next)=>{
            try {
                await next();
                
            } catch (error) {
                // 
                ctx.status=error.status||500;
                ctx.body="出差了:"+error
                
            }
            
        });
        app.use(async (ctx,next)=>{
            await next();
            if(ctx.status==404){
                ctx.body="页面找不到"
            }else{
                return;
            }
        });



    }
}

 