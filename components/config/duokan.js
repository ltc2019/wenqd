header={headers :{
'cookie': $storage.get("duokan")||"",
'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 5.1; MX5 Build/LMY47I)',
}}
device=header.headers.cookie.match(/device_id=(.+?);/)
did=device?device[1]:""

 function getc(){
  t=parseInt(new Date().getTime()/1000)
  list=(did+"&"+t).split("")
  for(c=0,i=0;i<list.length;i++)
  {
    c= (c * 131 + list[i].charCodeAt()) % 65536        
  }
  data=`_t=${t}&_c=${c}`
  return(data) 
}
 function sign() {
  return new Promise(async resolve => {
    try {
      let url ='https://www.duokan.com/checkin/v0/checkin'
               let res = await $http.post(url,getc(),header)               
               result+=`签到: ${res.data.msg}\n`                       
    } catch (err) {     
      console.log(err)
      result+="cookie失效❗️❗️\n"
    }
    resolve()
  })
}

 function getO() {
  return new Promise(async resolve => {
    try {
      let url ='https://www.duokan.com/hs/v4/channel/query/2027'
               let res = await $http.get(url)
                bid=res.data.items[0].data.book_id                      
  data=`payment_name=BC&ch=VSZUVB&book_id=${bid}&price=0&allow_discount=1`
   let furl="https://www.duokan.com/store/v0/payment/book/create"
   let fres= await $http.post(furl,data,header)
  a=`今日限免：${fres.data.book.title} • ${fres.data.msg}`
   result += a
    } catch (err) {     
      console.log(err)
      result+="今日限免购买失败"
    }
    resolve()
  })
}  
async  function task(){
  result=""
   await sign()
   await getO()
   console.log(result)
   return result
 } 
 module.exports=task
 
 //每日签到
 //今日限免购买
 //大转盘
 //看视频看广告