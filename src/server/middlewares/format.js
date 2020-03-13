export default {
    result({code,data}){
        let res={
            code:200,
            data:null,
        };

        return new Promise((resolve,reject)=>{
            res={
                ...res,
                code:code||200,
                data:data||null
            }
            resolve(res);
        });
    },


}