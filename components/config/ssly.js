//绅士领域 注册时候推荐码填：2984317

s1={
  "url":"https://hk.hksslyapp.xyz/mz_pbl/app_con/add_sign.php",
  "name":"绅士领域",
  "type":"post",
  "data":`time=1600797047&mac=43f4923e7a18172b61128850c9079324&u_id=${$storage.get("ssly")||"135969"}`,
  "check":"state",
  "value":0,
  "error":"erro",
  "return":"sms"
  
  
  
}
function ssly() {
  console.log(s1.name)
    return new Promise(async resolve => {
        try {
            let url = `https://hk.hksslyapp.xyz/mz_pbl/app_con/add_sign.php`
            let data = s1.data
            //`time=1600797047&mac=43f4923e7a18172b61128850c9079324&u_id=${$storage.get("ssly")||"135969"}`
            let res = await $http.post(url, data)
     //     console.log(res)
            if (res.data[s1.check] == 0) {
                msg = res.data[s1.error]
            } else if (res.data.state == 1) {
                msg = res.data[s1.return]
            } else {
                console.log(res.data)
                msg = "签到失败,原因未知"
            }
            console.log(msg)
        } catch (err) {
            console.log(err)
            msg = "签到接口请求失败"

        }
        resolve(msg)
    })
}

module.exports=ssly
