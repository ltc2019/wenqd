module.exports = {
  type: 'list',
  async fetch({ args }) {
    let items = []
    tag = ['WPS-wps', '京东-jd', '人人影视-rrys', '人人视频-rrsp', '网易云音乐-wyy', '什么值得买-smzdm', 'V2ex-v2ex', "时光相册-sgxc", "书香门第-sxmd","书友社区-andyt","刺猬猫-cww",,"多看阅读-duokan","晋江app-jjwxc","好游快爆-hykb","爱奇艺-iqiyi","吾爱破解-w2pj","葫芦侠签到-hlx","绅士领域-ssly","网易🐌读书-du163","橙光app-rpg66","ucloud社区-ucloud","香网小说-xiang5","网易云游戏-cg163","Acfun-acfun"]
    tag.map(data => {
      data = data.split('-')
      items.push({
        title: data[0],
        style: 'label',
        onClick: async () => {
          this.options(data[1])
        }
      })
    })   
    return items
  },
  async options(data) {
    const option = await $input.select({
      title: '选项',
      options: [{
        title: "查看",
        onClick() {
          $router.to(
            $route("@article", {
              content: {
                text: $storage.get(data) || ""
              }

            })
          )
        }
      },
      {
        title: "设置",
        async onClick() {
          let ok = await $input.text({
            title: '配置',
            hint: '请输入对应cookie或者账号,具体查询使用须知,无特殊说明就是全部cookies',
            value: ''
          })

          if (ok) {
            $storage.put(data, ok)
            $ui.toast("配置成功,请返回重进插件")
          }
        }
      },
      {
        title: "删除"
      }]
    })
    if (option) {
      option.onClick()
    }
  }




}
