//uclub签到 每天获得1积分,30天后每天2积分
//我的邀请链接 https://uclub.ucloud.cn/invite/478
function task() {
    return new Promise(async resolve => {
        try {
            let token=$storage.get("ucloud")||"wenmoux"
            let url = 'https://uclub.ucloud.cn/index/signin/dosign'            
            let res = await $http.post(url, "",{headers:{"X-Requested-With":"XMLHttpRequest","cookie":`token=${token}`}})
         if(res.data.wait)
         {
           msg=res.data.msg
           
         }
         else{
           msg="cookie失效"
         }
         console.log(msg)
        } catch (err) {
          console.log(err)
          msg="签到失败,请求签到接口失败"
          
        }
        resolve(msg)
    })
}


//task()
module.exports=task