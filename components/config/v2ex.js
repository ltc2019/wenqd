once = null
ckstatus = 1
info = ""
const header = {
  headers: {
    Referer: 'https://www.v2ex.com/mission',
    "Host": "www.v2ex.com",
    "user-agent": "Mozilla/5.0 (Linux; Android 10; Redmi K30) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.83 Mobile Safari/537.36",
    cookie: `${$storage.get("v2ex")}` || ""
  }
}
function check() {
  return new Promise(async resolve => {
    try {
      let url = 'https://www.v2ex.com/mission/daily'
      let res = await $http.get(url, header)
      /// console.log(res.data)
      reg1 = /需要先登录/
      if (reg1.test(res.data)) {
        ckstatus = 0
        info += "cookie失效❌❌❌"
      } else {
        reg = /每日登录奖励已领取/
        if (reg.test(res.data)) {
          info += "今天已经签到过啦\n"
          status = 1
        }
        else {
          reg = /redeem\?once=(.*?)'/
          once = res.data.match(reg)[1]
          console.log(`获取成功 once:${once}`)
        }
      }
    } catch (err) {
      console.log(err)
    }
    resolve()
  })
}
//每日签到
function daily() {
  return new Promise(async resolve => {
    try {
      let url = `https://www.v2ex.com/mission/daily/redeem?once=${once}`
      let res = await $http.get(url, header)
      reg = /已成功领取每日登录奖励/
      if (reg.test(res.data)) {
        info += "签到成功✅"
      }
      else {
        info += "签到失败❗️❗️❗️"
      }
    } catch (err) {
      console.log(err)
    }
    resolve()
  })
}



function balance() {
  return new Promise(async resolve => {
    try {
      let url = 'https://www.v2ex.com/balance'
      let res = await $http.get(url, header)
      reg = /\d+?\s的每日登录奖励\s\d+\s铜币/
   //   console.log(res.data)
      let cc =res.data.match(/<td class=\"d\" style=\"text-align: right;\">(\d+).0<\/td>/)
  // console.log(cc[1])
      let bb=res.data.match(reg)[0].match(/\d+/g)
    let aa=`| ${bb[0]} |${bb[1]}  | ${cc[1]} |`  
    console.log(aa)
      info += res.data.match(reg)[0]
    } catch (err) {
      console.log(err)
    }
    resolve()
  })
}

async function task() {
  await check()
  if (ckstatus == 1) {
    if (once) {
      await daily()
    }
    await balance()
  }
  else {
  }
  console.log(info)
  return (info)
}
//console.log(new Date().toLocaleString())
//
module.exports = task