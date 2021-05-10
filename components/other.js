module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    let items = []
    let list = [
      '快爆助手',
      '多看书豆',
      'wps助手'
    ]
    list.map(data => {
      items.push({
        title: data,

        style: 'list',
        async onClick() {
          const result = $dora.isSubscribed(data)
          if (result) {
            $ui.toast('你已经订阅过他了')
             $ui.viewUser(data)
          } else {
            const result = await $dora.subscribe(data)
            $ui.toast(`subscribe result: ${result}`)
          }
        }
      })
    })





    return items
  }
  
}
