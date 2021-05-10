if (typeof $dora == 'undefined') {
 console.error('This project runs only in Dora.js.')
 console.error('Please visit https://dorajs.com/ for more information.')
  process.exit(-1)
}
console.info('你他娘的运行成功了')

global.taskar= ["wps-0-每日邀请10好友-https://cdn.jsdelivr.net/gh/Wenmoux/checkbox/icon/wps.jpg","橙光游戏app-1-每日签到+登陆奖励-https://cdn.jsdelivr.net/gh/Wenmoux/checkbox/icon/jpush_notification_icon.jpg","ucloud社区-2-每日签到-https://cdn.jsdelivr.net/gh/Wenmoux/checkbox/icon/ucloud.ico","书香门第-3-每日签到得金币-https://cdn.jsdelivr.net/gh/Wenmoux/checkbox/icon/%E4%B9%A6%E9%A6%99%E9%97%A8%E7%AC%AC.jpg", "书友社区-4-每日签到-https://cdn.jsdelivr.net/gh/Wenmoux/checkbox/icon/%E4%B9%A6%E5%8F%8B%E7%A4%BE%E5%8C%BA.jpg","吾爱破解-5-每日签到-https://cdn.jsdelivr.net/gh/Wenmoux/checkbox/icon/%E5%90%BE%E7%88%B1%E7%A0%B4%E8%A7%A3.jpg","人人影视-6-每日签到", "人人视频-7-每日任务签到答题福利开宝箱","时光相册-8-每日签到领空间","什么值得买-9-每日签到","v2ex-10-每日签到","刺猬猫-11-每日任务(除了订阅章节)","晋江签到-12-晋江每日签到得月石","网易🐌读书-13-蜗牛壳","多看阅读-14-每日签到每日限免","京东-15-多合一签到","好游快爆-16-所有爆米花任务,包括签到游戏预约分享体验抖音观看照料好友邀请下载","爱奇艺-17-每日签到,摇一摇,每日浏览任务","葫芦侠-18-所有板块签到","绅士领域-19-每日签到得硬币","香网小说-20-每日签到","网易云游戏-21-每日签到得免费时长","Acfun-22-每日任务+签到"]
global.signlist = $storage.get('signlist')||[]
global.rizhi = $storage.get('log')||""

const oldConsoleLog = console.log;
  global.console.log = function (msg) {
    // 忽略 pnp 日志
    if (msg === 'dependencyNameMatch') {
      return;
    }
    if (typeof msg === 'object') {
      if (msg.issuer && msg.dependencyNameMatch) {
        return;
      }
      if (
        msg.issuerInformation ||
        msg.issuerLocator ||
        msg.dependencyName ||
        msg.dependencyReference
      ) {
        return;
      }
    }
    oldConsoleLog.apply(oldConsoleLog, arguments);
  };