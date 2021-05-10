token=""
username=""
accountp=$storage.get("cww")||"003🐴003"
accountp=accountp.split("🐴")
function qmsg(msg) {
  return new Promise(async resolve => {
    try {
      let url = `https://qmsg.zendee.cn:443/send/bc80d26bc71de5bfe4ad1765b298a80b.html?msg=${encodeURI(msg)}`
  let res = await $http.get(url)
  if (res.data.code == 0) {
    console.log('Qmsg酱：发送成功')
  } else {
    console.log('Qmsg酱：发送失败!' + res.data.reason)
  }
    } catch (err) {
   //   info.sign = '签到失败'
      console.log(err)
    }
    resolve()
  })
}

var crypto = require("crypto");
//var axios = require("axios");
var decrypt = function decrypt(data, key) {
  if (key == null) {
    key = crypto
      .createHash("sha256")
      .update("zG2nSeEfSHfvTCHy5LCcqtBbQehKNLXn")
      .digest();
  } else {
    key = crypto
      .createHash("sha256")
      .update(key)
      .digest();
  }
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    key,
    new Uint8Array(16)
  );
  decipher.setAutoPadding(false);
  let decrypted = decipher.update(data, "base64", "utf8");
  decrypted += decipher.final("utf8");
 // console.log(JSON.parse(decrypted.match(/{(.*)}/)[0]))
  return decrypted;
};


//decrypt("6WafpH+G/+hDyIp4Xth47HuRUp3OWI/mxE8FJLj0OZGVAQDl9VcGF/amBrmvth9Hers7f8OE8b3zQTM+WN75DA==")
const mixin = {
  baseUrl: "https://app.hbooker.com", //url 前缀
  standardFlag: true,
  timeout: 15000,
  withCredentials: false //跨域请求是否使用凭证
};
const para = {
  app_version: "2.3.922",
  device_token: "ciweimao_dora.js_zsakvo"
};
function get(options) {
  let params = Object.assign({}, para, options.para);
  return new Promise((resolve, reject) => {
    $http
      .get(mixin.baseUrl + options.url, {
        params: params
      })
      .then(response => {
        let data = decrypt(response.data.trim());
        var lastIndex = data.lastIndexOf("}");
        data = data.substr(0, lastIndex + 1);
        let json = JSON.parse(data);
        resolve(json);
      })
      .catch(err => {
        resolve({ tip: err });
      });
  });
}


var login = async function() {
return  await get({
    url: `/signup/login`,
    para: {
      login_name: accountp[0],
      passwd: accountp[1],
      login_token:"" ,
      account:""
    }
  }).then(res => {
 //  console.log(res)
    return res;
  });
};
//b=login()
//console.log(b)
//书架两本
var shelfbook = async function(collect,id) {
return   await get({
    url: `/bookshelf/${collect}`,
    para: {
      login_token: token,
      account: username,
      shelf_id :"" ,
      book_id:id
    }
  }).then(res => {
    //  console.log(res)
    return res;
  });
};


//登陆

//签到
var sign = async function() {
return   await get({
    url: `/reader/get_task_bonus_with_sign_recommend`,
    para: {
      task_type:1,
      login_token:token, 
      account:username
    }
  }).then(res => {
    console.log(res)
    return res;
  });
};
//阅读章节
var record = async function(cid) {
return   await get({
    url: `/chapter/set_read_chapter_record`,
    para: {
      chapter_id:cid,
      login_token:token,
      account:username
    }
  }).then(res => {
    //  console.log(res)
    return res;
  });
};
var view = async function() {
return   await get({
    url: `/chapter/get_paragraph_tsukkomi_list_new`,
    para: {
      login_token: token,
      account: username,
      count:1000,
      chapter_id:105494781,
      paragraph_index:5,
      page:0
    }
  }).then(res => {
 //     console.log(res)
    return res;
  });
};
//阅读60min
var addr = async function() {
return   await get({
    url: `/reader/add_readbook`,
    para: {
      readTimes:1200,
      getTime:`${getNowFormatDate()} 00:00:01`,
      book_id:100166786,      
      chapter_id:105495180,
      login_token:token ,
      account:username
    }
  }).then(res => {
     console.log(res)
    return res;
  });
};
var gettask = async function() {
return   await get({
    url: `/task/get_all_task_list`,
    para: {
      login_token:token,
      account:username    }
  }).then(res => {
    //  console.log(res)
    return res;
  });
};
function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
      console.log(currentdate)
        return currentdate;
    }
async function task()
{
 a= await login()
 token=a.data.login_token
 username=a.data.reader_info.account
 result=""
  //签到
  await sign()
  //加入书架两本书
  console.log(token)
 await shelfbook("delete_shelf_book",100180114)
 await shelfbook("favor",100180114)
 await shelfbook("delete_shelf_book",100148386)
 await shelfbook("favor",100148386)
 //阅读10章
a=Math.ceil(Math.random()*10000)
for (i=a;i<a+20;i++)
{
await record(i++)
}
//浏览20间贴
await view()
//阅读60min
await addr()
await addr()
await addr()
//阅读10章
let res =await gettask()
tasklist = res.data.daily_task_list
for(i in tasklist )
{
  taskname=tasklist[i].name
  status=tasklist[i].is_finished==1?"已完成":"未完成"
  result+=`任务${parseInt(i)+1}：${taskname}：${status}\n`
}
console.log(result)
return(result)
}
module.exports=task