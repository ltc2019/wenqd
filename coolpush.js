function cp(msg) {
  return new Promise(async resolve => {
    try {
      let url = `${$prefs.get('cpapi')}?c=${encodeURI(msg)}`
  let res = await $http.get(url)
  console.log(res.data)
  if (res.data.code == 200) {
    console.log('酷推：发送成功')
  } else {
    console.log('酷推：发送失败!' + res.data.reason)
  }
    } catch (err) {
      //info.sign = '签到失败'
      console.log(err)
    }
    resolve()
  })
}







module.exports = cp
