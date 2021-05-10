module.exports = {
    type: 'list',
    async fetch({
        args,
        page
    }) {
const sendmsg = require("../sendmsg")
        log = ""
        text = `# 关于cookie填写:
  - ### <font color="red">未特殊说明就是全部cookie 🐴是分割符 需要🐴的就是必须要🐴的 就是那个emoji🐴懂了🐴</font>
  - WPS打卡：邀请id(就是账号id) 批量邀请格式uid1@uid2@uid3
  - 书香门第：账号🐴密码
  - 人人影视cookie：账号(邮箱)🐴密码
  - 人人视频：抓包安卓app里的token
  - 刺猬猫：账号(手机号)🐴密码
  - 多看阅读：抓包安卓app里的cookie
  - 橙光app: token,在请求url中🉑找到
  - ucloud:  cookie中的token值
  - 葫芦侠三楼：手机号🐴密码
  - Acfun：手机号🐴密码
  - 网易🐌: app中cookie, _xsrf🐴X-Auth-Token  
  - 爱奇艺：个人中心抓包得authcookie(注意要链接中的)
  - 绅士领域: 抓包app中的u_id,例如每日签到中就有,例 120457
  - 好游快爆：抓包安卓app里,每日任务的随便一个post包,复制请求数据里的scookie,注意不是cookie
  - 晋江小说：抓包晋江网页(手机)cookie  m.jjwxc.net  也可只需要cookie中sid  格式   sid=xxxxxxxxxxx  
  - 时光相册：看[酷安里的这个教程](https://www.coolapk.com/feed/17842335?shareKey=NWYzYWRhMjcyYmQ3NWVlYjcwZDk~&shareUid=2581033&shareFrom=com.coolapk.market_10.3.1),然后填写 手机号(+86也需要)🐴加密后的密码
  `
        this.notice = (await $http.get("https://cdn.jsdelivr.net/gh/Wenmoux/sources/dorajs/notice.md")).data

        taskarr = ["wpsdaka", "rpg66", "ucloud", "sxmd", "andyt", "w2pj", "rrys", "rrsp", "sgxc", "smzdm", "v2ex", "hbooker", "jjwxc", "du163", "duokan", "jd", "hykb", "iqiyi", "hlx", "ssly", "xiang5", "cg163","acfun"]

        items = [{
                style: 'category',
                title: '公告',
                action: {
                    title: '点👴看公告',
                    route: $route("@article", {
                        //     url: url,
                        content: {
                            markdown: this.notice
                        }
                        //title: tag
                    })
                }

            }, {
                title: '配置账号密码',
                style: 'label',
                spanCount: 6,
                route: $route("prefs")
            }, {
                title: '推送方式',
                style: 'label',
                spanCount: 6,

                onClick() {
                    $prefs.open()
                }
            },
            {
                title: '一键签到',
                onClick() {
                    start(signlist)
                }
            }, {
                title: '查看日志',
                spanCount: 10,
                route: $route('@article', {
                    content: {
                        markdown: rizhi
                    }
                })
            },
            {
                title: "清",
                spanCount: 2,
                image: $icon('delete', 'red'),
                //  style: "label",
                onClick: async () => {
                    $storage.remove("log")
                    this.refresh()
                }
            },
            {
                title: "                                  使用须知",
                route: $route("@article", {
                    content: {
                        markdown: text
                    }
                })
            }
        ]
        return items
        async function start(task) {
            $ui.toast('开始签到任务')
            console.log('开始签到任务')
            for (let i = 0; i < task.length; i++) {
                const taski = require(`./config/${taskarr[task[i]]}`)
                $ui.toast(`任务${i + 1}： ${taskar[task[i]].split("-")[0]}`)
                console.log(`任务${i + 1}： ${taskar[task[i]].split("-")[0]}`)

                log += `【${taskar[task[i]].split("-")[0]}】：` + await taski() + "\n"
            }
            time = "🎈" + new Date().toLocaleString() + "🎈\n\n"
            $ui.toast('任务执行完毕')
            await sendmsg(time + log)
            rizhi = time + log + "\n" + rizhi
            $storage.put('log', rizhi)
            console.log('任务执行完毕')
        }

    }
}