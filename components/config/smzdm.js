const header = {
  headers: {
    Referer: 'https://www.smzdm.com/',
    cookie: $storage.get("smzdm") || ""
  }
}
function smzdm() {
  return new Promise(async resolve => {
    try {
      let url = 'https://zhiyou.smzdm.com/user/checkin/jsonp_checkin?callback=&_='
      let res = await $http.get(url, header)
      if (res.data.error_code == 0) {
        data = `签到成功!\n签到天数: ${res.data.data.checkin_num} | Lv:${res.data.data.rank} | 经验值:${res.data.data.exp}`
      } else {
        data = res.data.error_msg
      }
      $ui.toast(data)
      result = '' + data
      //  console.log(data)
    } catch (err) {
      console.log(err)
    }
    resolve()
  })
}

async function task() {
  await smzdm()
  console.log(result)
  return result
}
module.exports = task
