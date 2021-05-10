let i = 1
let url = 'http://zt.wps.cn/2018/clock_in/api/get_question?member=wps'
let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

invite_sid = [   
    'V02S2UBSfNlvEprMOn70qP3jHPDqiZU00a7ef4a800341c7c3b',
    'V02StVuaNcoKrZ3BuvJQ1FcFS_xnG2k00af250d4002664c02f',
    'V02SWIvKWYijG6Rggo4m0xvDKj1m7ew00a8e26d3002508b828',
    'V02Sr3nJ9IicoHWfeyQLiXgvrRpje6E00a240b890023270f97',
    'V02SBsNOf4sJZNFo4jOHdgHg7-2Tn1s00a338776000b669579',
    'V02S2oI49T-Jp0_zJKZ5U38dIUSIl8Q00aa679530026780e96',
    'V02ShotJqqiWyubCX0VWTlcbgcHqtSQ00a45564e002678124c',
    'V02SFiqdXRGnH5oAV2FmDDulZyGDL3M00a61660c0026781be1',
    'V02S7tldy5ltYcikCzJ8PJQDSy_ElEs00a327c3c0026782526',
    'V02SPoOluAnWda0dTBYTXpdetS97tyI00a16135e002684bb5c',
    'V02Sb8gxW2inr6IDYrdHK_ywJnayd6s00ab7472b0026849b17',
    'V02SwV15KQ_8n6brU98_2kLnnFUDUOw00adf3fda0026934a7f',
    'V02SC1mOHS0RiUBxeoA8NTliH2h2NGc00a803c35002693584d',
    'V02SAsbOACT0vh1pR3SWdzUiz2KNVhU00a7496770038e8fd62',
    'V02SOHmSyt-J52gTX8kWGcSYOmnnLPQ00ac916190044e9e868',
    'V02SJ3SESnhJH-rLJ_riC2Sd2-eapPA00afae20b0044e9e8d5',
    'V02SECrT46tD21sXH6xz115M7lUJ1ZQ00aac73d70044e86754'
]

//可网页登录https://zt.wps.cn查看两个id 一个在分享链接 一个在cookie里
wpsinviteid = $storage.get('wps') || "123456"
async function wpsdaka() {
    if (wpsinviteid.match(/@/)) {
        uid = wpsinviteid.split("@")
    } else {
        uid = [wpsinviteid]
    }
    
    for (i = 0; i < invite_sid.length;i++) {
     console.log(`第${i+1}个人被邀请中......${invite_sid[i] }`) 
    for (id of uid) {
        console.log(`为${id}邀请......`)
        let invitedata = `invite_userid=${id}&client_code=040ce6c23213494c8de9653e0074YX30&client=alipay`
        let inviteurl = 'http://zt.wps.cn/2018/clock_in/api/invite'
        
//正常版                      
        let res = await $http.post(inviteurl, invitedata, {
      headers: { sid: invite_sid[i] }
    })   
    }    
    await sleep(2000)    
    //    eval(str)
    }
    dk = '邀请完毕'
    console.log(dk)
    return (dk)
}




module.exports = wpsdaka