data = $storage.get("rrys")||"wnnn@qq.com🐴mmsmdmdmdm"
b = data.split('🐴')
let username = b[0]
let password = b[1]
rr=[]
function getuid() {
  return new Promise(async resolve => {
    try {
      url =
    'http://a.zmzapi.com/index.php?g=api/public&m=v2&accesskey=519f9cab85c8059d17544947k361a827&client=2&a=login&account=' +
    username +
    '&password=' +
    password
  res = await $http.get(url)
 
  data = res.data.data
  rr.token = data.token
  rr.uid = data.uid
    } catch (err) {
      console.log(err)
    }
    resolve()
  })
}


function getck() {
  return new Promise(async resolve => {
    try {
      url2 =
    'http://h5.rrhuodong.com/index.php?g=api/mission&m=index&a=login&uid=' +
    rr.uid +
    '&token=' +
    rr.token
  res2 = await $http.post(url2, '')
  rr.cookie = res2.headers['set-cookie']

    } catch (err) {
      console.log(err)
    }
    resolve()
  })
}

function sign() {
  return new Promise(async resolve => {
    try {
      url4 = 'http://h5.rrhuodong.com/index.php?g=api/mission&m=clock&a=store&id=2'
  res4 = await $http.post(url4, '', { headers: { cookie: rr.cookie[0] } })
  $ui.toast(res4.data.info)
  //console.log(res4.data)
    } catch (err) {
      console.log(err)
    }
    resolve()
  })
}
function getinfo() {
  return new Promise(async resolve => {
    try {
url3 = 'http://h5.rrhuodong.com/index.php?g=api/mission&m=index&a=user_info'
  res3 = await $http.post(url3, '', { headers: { cookie: rr.cookie[0] } })
  rr.point = res3.data.data.point
 // console.log(res3.data)
  b='\n人人钻 : ' +rr.point
//  await  notice('人人影视签到\n'+res4.data.info+b)
    } catch (err) {
      console.log(err)
    }
    resolve()
  })
}



async function rrysign() {
  await getuid(),
  await getck(),
  await sign(),
  await getinfo()
  result=''+res4.data.info+b
  console.log(result)
  return (result)
  
  
}

module.exports = rrysign
