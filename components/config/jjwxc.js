function task() {
    return new Promise(async resolve => {
        try {
            let url = 'https://m.jjwxc.net/my/signIn'            
            let data = $storage.get("jjwxc")||""
            let res = await $http.get(url,{headers:{"cookie":$storage.get("jjwxc")||"","x-requested-with":"XMLHttpRequest"}})
         if(res.data&&res.data.message)
         {
         str=`${res.data.message}`
         }
         else {
           str="cookie失效"
         }
         console.log(str)
        } catch (err) {
          console.log(err)
          str=`签到失败！cookie失效` 
        }
        resolve(str)
    })
}

module.exports=task