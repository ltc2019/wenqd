//邀请链接 http://sc.xiang5.com/2.2/invite/share?uid=5563201
function task() {
    return new Promise(async resolve => {
        try {
            let url = 'http://m.xiang5.com/dosign'            
            let res = await $http.post(url, "",{headers:{"X-Requested-With":"XMLHttpRequest","cookie":$storage.get("xiang5")||"wenmoux"}})     
            if(res.data.status==1)
         {
           msg=`签到成功✅✅获得${res.data.money}香豆,连签${res.data.continue}天`
           
         }
         else{
           msg=res.data.info
         }
        console.log(msg)
        } catch (err) {
          console.log(err)
          
        }
        resolve(msg)
    })
}


//task()
module.exports=task