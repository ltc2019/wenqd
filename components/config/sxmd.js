const sxmd = $storage.get("sxmd") || "π΄"
let str = sxmd.split("π΄")
let account = str[0]
let password = str[1]
let ck = null;
let formhash = null;
let result = ""
let header = {
    headers: {
        Host: "www.txtnovel.top",
        cookie: "66",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; Redmi K30) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.83 Mobile Safari/537.36",
    },
};
function login() {
    return new Promise(async (resolve) => {
        try {
            let loginurl = "http://www.txtnovel.top/member.php?mod=logging&action=login&loginsubmit=yes&loginhash=&mobile=2"
            header = {
                headers: {
                    "Host": "www.txtnovel.top",
                    "cookie": "66",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Linux; Android 10; Redmi K30) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.83 Mobile Safari/537.36"
                }
            }
            let data = `formhash=&referer=http%3A%2F%2Fwww.txtnovel.top%2Fforum.php%3Fmobile%3Dyes&fastloginfield=username&cookietime=2592000&username=${account}&password=${password}&questionid=0&answer=&submit=true`
            let res = await $http.post(loginurl, data, {
                header,
                responseType: 'arraybuffer'
            })
            let resdata = require("iconv-lite").decode(res.data, 'gb2312')
            if (resdata.match(/ζ¬’θΏζ¨εζ₯/)) {
                result += "η»ιζε\n"
                console.log("η»ιζε")
                ckk = res.headers["set-cookie"]
                ck = ""
                for (i = 0; i < ckk.length; i++) {
                    ck += ckk[i].split("expires")[0]
                }
            } else {
                console.log("η»ιε€±θ΄₯")
                let message = resdata.match(/<div id=\"messagetext\">.*?<p>(.+?)<\/p>/s)
                result += message[1]
            }
            // let ck=res.headers

        } catch (err) {
            console.log(err);
        }
        resolve();
    });
}

function getformhash() {
    return new Promise(async (resolve) => {
        try {
            let url = `http://www.txtnovel.top/plugin.php?id=dsu_paulsign:sign&mobile=yes`
            let res = await $http.get(url, header)
            formhash = res.data.match(/<input type=\"hidden\" name=\"formhash\" value=\"(.+?)\" \/>/s)[1]
        } catch (err) {
            console.log(err);
        }
        resolve();
    });
}
function sign() {
    return new Promise(async (resolve) => {
        try {

            let url = `http://www.txtnovel.top/plugin.php?id=dsu_paulsign:sign&operation=qiandao&infloat=0&inajax=0&mobile=yes`
            let data = `formhash=${formhash}&qdxq=kx`
            let res = await $http.post(url, data, header)
            let message = res.data.match(/<div id=\"messagetext\">.*?<p>(.+?)<\/p>/s)
            if (message) {
                result += message[1] + "\n"
            }
            else {
                result += "η­Ύε°ε€±θ΄₯\n"
            }
        } catch (err) {
            console.log(err);
        }
        resolve();
    });
}

function info() {
    return new Promise(async (resolve) => {
        try {

            let url = `http://www.txtnovel.top/home.php?mod=space&`

            let res = await $http.get(url, header)
            let message = res.data.match(/<li><em>ιεΈ<\/em>(.+?) ζ<\/li>/)
            if (message) {
                result += "ιεΈοΌ" + message[1]
            }
        } catch (err) {
            console.log(err);
        }
        resolve();
    });
}
async function task() {
    await login()
    header.headers.cookie = ck
    if (ck) {
        await getformhash()
        await sign()
        await info()
        console.log(result)
    } else { }
    return result


}

module.exports = task