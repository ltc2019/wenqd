        hlxstr=$storage.get("hlx")||"1359699🐴nndkdkkd"
        hlxaccount=hlxstr.split("🐴")
        key = ""
        
        loginstatus = 0
        keystatus = 0
        hlxm=""
        function login() {
            return new Promise(async resolve => {
                try {
                    let url = 'http://floor.huluxia.com/account/login/ANDROID/4.0?platform=2&gkey=000000&app_version=4.0.0.7&versioncode=20141436&market_id=floor_web&_key=&device_code=%5Bd%5Dcaf1329e-04e5-4459-84b7-b7513d2e2b12'
                    let data = `account=${hlxaccount[0]}&login_type=2&password=${require("md5")(hlxaccount[1])}`
                    let res = await $http.post(url, data)
                    if (res.data.status == 0) {
                        console.log("登陆失败：" + res.data.msg)
                        hlxm+="登陆失败：" + res.data.msg
                        loginstatus = 0
                    } else if (res.data.status == 1) {
                        loginstatus = 1
                        console.log("用户 " + res.data.user.nick + " 登陆成功,_key为：" + res.data._key)
                        key = res.data._key
                        $storage.put("huluxiakey", key)
                    }
                } catch (err) {
                    console.log(err)
                    hlxm += "登陆接口请求出错"
                }
                resolve()
            })
        }


        function check() {
            return new Promise(async resolve => {
                try {
                    let url = `http://floor.huluxia.com/user/status/ANDROID/2.1?platform=2&gkey=000000&app_version=4.0.0.7&versioncode=20141436&market_id=floor_web&_key=${key}&device_code=%5Bd%5Dcaf1329e-04e5-4459-84b7-b7513d2e2b12`
                    let res = await $http.get(url)
                    if (res.data.status == 0) {
                        console.log("_key失效,尝试重新登陆...")
                        keystatus = 0
                    } else if (res.data.status == 1) {
                        keystatus = 1
                        console.log("_key有效,即将开始签到...")
                    }
                } catch (err) {
                    console.log(err)

                }
                resolve()
            })
        }

        function sign() {
            return new Promise(async resolve => {
                try {                        
                    let res = await $http.get("http://floor.huluxia.com/category/list/ANDROID/2.0")
                    .then(res =>{
                            res.data.categories.map(async (list) => {
                        if (list.categoryID !== 0) {
                             await $http.get(`http://floor.huluxia.com/user/signin/ANDROID/4.0?platform=2&gkey=000000&app_version=4.0.0.7&versioncode=20141436&market_id=floor_web&_key=${key}&device_code=%5Bd%5Dcaf1329e-04e5-4459-84b7-b7513d2e2b12&cat_id=${list.categoryID}`)                 
                        }
                    })
                    })
                 hlxm+="各板块签到成功"
                } catch (err) {
                    console.log(err)
                    hlxm+="签到接口请求出错"
                }
                resolve()
            })
        }

async function hlx(){
        if ($storage.get("huluxiakey")) {
            console.log("本地存在_key,正在检测_key是否失效...")
            key = $storage.get("huluxiakey")
            await check()
            if (keystatus == 0) {
                await login()
                await sign()
            } else {
                await sign()
            }
        } else {
            console.log("未检测到_key,即将开始登陆...")
            await login()
            if (loginstatus == 1) {
                console.log("登陆或者_key成功,即将开始签到...")
                await sign()
            }
        }
console.log(hlxm)
return hlxm
}

module.exports=hlx







   