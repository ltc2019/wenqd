let iqiyicookie = $storage.get("iqiyi")||""
let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function sign() {  
    iqyinfo = ""
    dailytasklist = []
    end = ""
    await checkin()
    await getask()
    await startask()
    await sleep(10000)
    await getReward()
    await lottery()
    await check()
    await getinfo()
    return iqyinfo
}

function checkin() {
    return new Promise(async resolve => {
        try {
            const headers = {
                Cookie: iqiyicookie
            };
            const url2 = `https://tc.vip.iqiyi.com/taskCenter/task/userSign?P00001=${iqiyicookie}&platform=b6c13e26323c537d&lang=zh_CN&app_lm=cn&deviceID=pcw-pc&version=v2`;
            let res2 = await $http.get(url2, {
                headers
            })
            if (res2.data.code = "SIGNED" || res2.data.code == "A0000") {
               iqyinfo += `每日签到：${res2.data.msg} ‖ 获得${res2.data.data.rewardMap.growth}成长值 ‖ 积分${res2.data.data.rewardMap.integral}\n`
            }
            else 
            {
              iqyinfo+=JSON.stringify(res.data)
              console.log(res.data)
            }    
               
        } catch (err) {
            console.log(err)
              iqyinfo+="签到失败失败\n"
        }
        resolve()
    })
}

function check() {
    return new Promise(async resolve => {
        try {
            const url = `https://cards.iqiyi.com/views_category/3.0/vip_home?secure_p=iPhone&scrn_scale=0&dev_os=0&ouid=0&layout_v=6&psp_cki=${iqiyicookie}&page_st=suggest&app_k=8e48946f144759d86a50075555fd5862&dev_ua=iPhone8%2C2&net_sts=1&cupid_uid=0&xas=1&init_type=6&app_v=11.4.5&idfa=0&app_t=0&platform_id=0&layout_name=0&req_sn=0&api_v=0&psp_status=0&psp_uid=451953037415627&qyid=0&secure_v=0&req_times=0`;
            const headers = {
                'sign': '7fd8aadd90f4cfc99a858a4b087bcc3a',
                't': '479112291'
            };
            let res = await $http.get(url, {
                headers
            })
            data = JSON.stringify(res.data)
            if (data.match(/\"text\":\"\d.+?到期\"/)) {
                end = data.match(/\"text\":\"(\d.+?到期)\"/)[1];

            }
        } catch (err) {
            console.log(err)

        }
        resolve()
    })
}

function lottery(cookie) {
    return new Promise(async resolve => {
        try {
            lmsg = "摇一摇："
            for (i = 0; i < 3; i++) {
                let res = await $http.get(`https://iface2.iqiyi.com/aggregate/3.0/lottery_activity?app_k=0&app_v=0&platform_id=0&dev_os=0&dev_ua=0&net_sts=0&qyid=0&psp_uid=0&psp_cki=${iqiyicookie}&psp_status=0&secure_p=0&secure_v=0&req_sn=0`)
               
                if (res.data.daysurpluschance != 0 && res.data.awardName && res.data.code == 0)
                 {
                    lmsg += res.data.awardName + " ‖ "
                }
                 else if (res.data.kv && res.data.kv.msg && res.data.code == 0) 
                 {
                    lmsg += res.data.kv.msg
                    break;
                }
                 else if(res.data.code == 3)
                  {
                    lmsg += res.data.errorReason
                    break;
                }
            }
            iqyinfo+=lmsg+"\n"
           console.log(lmsg)
        } catch (err) {
            console.log(err)
           iqyinfo += "摇一摇出错\n"
        }
        resolve()
    })
}




function getask(cookie) {
    return new Promise(async resolve => {
        try {
            let res = await $http.get(`https://tc.vip.iqiyi.com/taskCenter/task/queryUserTask?P00001=${iqiyicookie}`)
            if (res.data.code == "A00000") {
                for (i of res.data.data.tasks.daily) {
                    dailytasklist.push({
                        name: i.name,
                        status: i.status,
                        taskCode: i.taskCode,
                        taskReward: i.taskReward.task_reward_growth
                    })
                }
            }
            console.log(dailytasklist)
        } catch (err) {
            console.log(err)
        }
        resolve()
    })
}




function startask(cookie) {
    return new Promise(async resolve => {
        try {
            for (i of dailytasklist) {
                if (i.status == 2) {
                    let res = await $http.get(`https://tc.vip.iqiyi.com/taskCenter/task/joinTask?P00001=${iqiyicookie}&taskCode=${i.taskCode}&platform=bb136ff4276771f3&lang=zh_CN`)
                    console.log(res.data)
                }
            }
        } catch (err) {
            console.log(err)
        }
        resolve()
    })
}


function getReward(cookie) {
    return new Promise(async resolve => {
        try {
          rrr=""
            for (i of dailytasklist) {
                if (i.status == 0) {
                    let res = await $http.get(`https://tc.vip.iqiyi.com/taskCenter/task/getTaskRewards?P00001=${iqiyicookie}&taskCode=${i.taskCode}&platform=bb136ff4276771f3&lang=zh_CN`)
                    console.log(res.data)
                    if (res.data.code = "A00000") {
                        rrr += `完成任务 ${i.name},获得${i.taskReward}成长值\n`
                    }
                }
            }
            console.log(rrr)

        } catch (err) {
            console.log(err)
        }
        resolve()
    })
}


function getinfo() {
    return new Promise(async resolve => {
        try {
            //console.log(res.data.data.tasks.daily[0])
            let res = await $http.get(`http://serv.vip.iqiyi.com/vipgrowth/query.action?P00001=${iqiyicookie} `)
            if (res.data.code = "A00000") {
                data = res.data.data
                iqyinfo += `会员等级Lv${data.level} ‖ 会员${end}\n今日获得${data.todayGrowthValue}成长值 ‖ 当前成长值${data.growthvalue} ‖ 升级需要${data.distance}成长值`
            //    console.log(info)
            }
        } catch (err) {
            console.log(err)
            iqyinfo += "查询失败"
        }
        resolve()
    })
}

module.exports=sign