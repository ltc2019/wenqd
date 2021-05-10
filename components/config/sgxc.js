 str=$storage.get("sgxc")||"1359699🐴nndkdkkd"
 str1=str.split("🐴")
 phone=str1[0]
 password=str1[1]
let header = {
    headers: {
        "User-Agent": "EverPhoto/2.7.0 (Android;2702;ONEPLUS A6000;28;oppo)",
        "x-device-mac": "02:00:00:00:00:00",
        "application": "tc.everphoto",
        "authorization": "Bearer 94P6RfZqvVQ2hH4jULaYGI",
        "x-locked": "1",
        "content-length": "0"
    }
}

token = null
sgxc=""
function balance() {
    return new Promise(async resolve => {
        try {
            let url = 'https://web.everphoto.cn/api/auth'
            data = `mobile=${phone}&password=${password}`
            let res = await $http.post(url, data, header)
            token = res.data.data.token
        } catch (err) {
            sgxc="登陆失败❗️❗️" + err.response.data.message+"\n"
        }
        resolve()
    })
}

function check() {
    return new Promise(async resolve => {
        try {
            let url = 'https://api.everphoto.cn/users/self/checkin/v2'
            data = ""
                let res = await $http.post(url, data, header)    
            if (res.data.code == 0) {
                if (!res.data.data.checkin_result) {
                  sgxc+="已签到过或签到失败⁉️⁉️"
                } else {
                  
                   sgxc+="签到成功✅✅"
                }
            } else {
             sgxc+="签到失败❌❌"
                console.log("签到失败❌❌")
            }
        } catch (err) {
            console.log(err.response.data.message)
        }
        resolve()
    })
}
async function task() {
   await balance()
    header.headers.authorization = `Bearer ${token}`
  await check()
  console.log(sgxc)
  return(""+sgxc) 
    
}

module.exports=task

