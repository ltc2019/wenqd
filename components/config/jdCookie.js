/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
let CookieJDs = [
  'shshshfpa=4f95e5a0-4ff3-be8d-a393-0b7257b3c604-1585495378;shshshfpb=zoX7yVhHU%2047b6yi93Rgdcg%3D%3D;whwswswws=;__jdu=1950843848;pinId=Yd_dwdfdeI8_-BOx8_MOPA;commonAddress=138549750;regionAddress=138549750;mba_muid=1950843848;TrackID=1vk9L9EzFyXJTXDUR-UJ58EZnOJSJIoUgtWWyoR9xIepOk0W2VJ789jl-6uSD6ifcR51JgB0en3-2UebcMK9KbRpFJk3t7hzz2fghJjv3-jxakhkNeEC3drOWHcmu12wi;webp=1;visitkey=61986505853256892;__jdv=122270672%7Cdirect%7C-%7Cnone%7C-%7C1614575340380;autoOpenApp_downCloseDate_auto=1614777813481_10800000;areaId=27;ipLoc-djd=27-2442-31864-0;__jdc=122270672;shshshfp=1bc5b74e47163aad4ba10a74dcd9274a;3AB9D23F7A4B3C9B=CZHQVMHWOBLSMXBFCZCO6PRJR3QGH26SCA5SSGVK7MKTCFSWTGU4LUT5PYIKKFSPWRSHW4ZHEHOZWQOTJWHA637FYY;jcap_dvzw_fp=u3BXDYV4PAboEBdM-pjQOBNZZxuhvHDnyRfLI2RaRfLvvq5v0Obewr5nMNVpZloLs1eVdw==;TrackerID=TOmwIfiQW82bxXFkIL2JxWlrQKfXF6efKWXWJfn-h_OYLgWM6SJy2Kyp0fMdBH1MPkkDjm66aQcDl3mRrD7vtFOxkRW4qNW-cOoy3vyBvPBTg05BaszOMOALt6RXu20r;pt_key=AAJgTwRlADAxD2z7e-hJUpk3vve_3uTISoCgawTRKUy_tL1BM0a6va9MKX1KnswWCvRibORKrvQ;pt_pin=jd_68997b52ea865;pt_token=g55kf2qq;pwdt_id=jd_68997b52ea865;sfstoken=tk01me7f31cb7a8sMysyeDMrMXgyZZTUpUcy6EsucS9qVyy6T8IszLTooBN2G6s8xG1AOTCHgU+CL+Vu8dobBhbUijX1;__jda=122270672.1950843848.1583407736.1615791177.1615802239.94;mobilev=html5;__jdb=122270672.2.1950843848|94.1615802239;mba_sid=1615802239443715291976996388.2;__jd_ref_cls=JDReact_StartReactModule',//账号一ck,例:pt_key=XXX;pt_pin=XXX;
  '',//账号二ck,例:pt_key=XXX;pt_pin=XXX;如有更多,依次类推
]
// 判断环境变量里面是否有京东ck
if (process.env.JD_COOKIE) {
  if (process.env.JD_COOKIE.indexOf('&') > -1) {
    CookieJDs = process.env.JD_COOKIE.split('&');
  } else if (process.env.JD_COOKIE.indexOf('\n') > -1) {
    CookieJDs = process.env.JD_COOKIE.split('\n');
  } else {
    CookieJDs = [process.env.JD_COOKIE];
  }
}
if (JSON.stringify(process.env).indexOf('GITHUB')>-1) {
  console.log(`请勿使用github action运行此脚本,无论你是从你自己的私库还是其他哪里拉取的源代码，都会导致我被封号\n`);
  !(async () => {
    await require('./sendNotify').sendNotify('提醒', `请勿使用github action、滥用github资源会封我仓库以及账号`)
    await process.exit(0);
  })()
}
CookieJDs = [...new Set(CookieJDs.filter(item => !!item))]
console.log(`\n====================共${CookieJDs.length}个京东账号Cookie=========\n`);
console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)
if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
for (let i = 0; i < CookieJDs.length; i++) {
  if (!CookieJDs[i].match(/pt_pin=(.+?);/) || !CookieJDs[i].match(/pt_key=(.+?);/)) console.log(`\n提示:京东cookie 【${CookieJDs[i]}】填写不规范,可能会影响部分脚本正常使用。正确格式为: pt_key=xxx;pt_pin=xxx;（分号;不可少）\n`);
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieJD' + index] = CookieJDs[i].trim();
}
