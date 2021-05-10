let result = ""
function andyt() {
    return new Promise(async resolve => {
        try {
            let config = {
    headers: {
        "cookie":  $storage.get("andyt") ||"" }
}
res = await $http.get(`https://sq.wgrid.cn/sign.php?mobile=2`, config)
//console.log(res.data)
let formhash = res.data.match(/formhash=(.+?)&/)
if (formhash) {
    let signurl = `https://sq.wgrid.cn/plugin.php?id=k_misign:sign&operation=qiandao&formhash=${formhash[1]}&from=insign`
    res2 = await $http.get(signurl, config)
    result+=res2.data
    console.log(result)
} else {
  result+="cookie失效"
    console.log("cookie失效")
}       
 } catch (err) {
   result+="签到出错"
   console.log(err)
            //sgxc="登陆失败❗️❗️" + err.response.data.message+"\n"
        }
        resolve()
    })
}
async function task() {
    await andyt()    
    return result
}

module.exports = task