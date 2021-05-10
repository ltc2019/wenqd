module.exports = {
    type: 'list',
    async fetch({
        args,
        page
    }) {
        log = ""
        console.log(signlist)
        let items = [{
            title: "已添加",
            style: "category"
        }]
        let items1 = [{
            title: "未添加",
            style: "category"
        }]
        taskar.map(data => {
            data = data.split("-")
            if (signlist.indexOf(data[1]) != -1) {
                items.push({
                    title: data[0],
                    spanCount:6,
                    image: data[3] ? data[3] : "https://cdn.jsdelivr.net/gh/Wenmoux/checkbox/icon/%E6%87%92%E5%BE%97%E6%89%BE%E5%9B%BE.jpg",
                    summary: data[2],
                    async onClick() {
                            i = signlist.indexOf(data[1])
                            signlist.splice(i, 1)
                            $storage.put('signlist', signlist)
                            $ui.toast('取消收藏成功')
                            this.refresh()          
                    }
                })
            } else {
                items1.push(
                    {
                        title: data[0],
                        spanCount:6,
                        image: data[3] ? data[3] : "https://cdn.jsdelivr.net/gh/Wenmoux/checkbox/icon/%E6%87%92%E5%BE%97%E6%89%BE%E5%9B%BE.jpg",
                        summary: data[2],
                        async onClick() {
                          if (signlist.indexOf(data[1]) == -1) {
                            signlist.push(data[1])
                            $storage.put('signlist', signlist)
                            $ui.toast("添加任务成功,请退出并重进插件")
                            //  global.tasklist = $storage.get('tasklist')
                          //  this.refresh()
                          }else{                            
                            $ui.toast("已经添加过啦")
                          }

                        }
                    }
                )

            }

        })       
        return  [...items,...items1]        
    }
}