export default {
    result(data){
        let res={
            code:200,
            data:null,
        };

        return new Promise((resolve,reject)=>{
            res={
                ...res,
                data:data||null
            }
            resolve(res);
        });
    },


}