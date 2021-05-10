module.exports = {
  type: 'topTab',
  async fetch({ args, page }) {
    return [
  
      {
        style: 'simple',
        title: '任务',
        route:$route("task")
      },
      {
        style: 'simple',
        title: '列表',
        route:$route("tasklist")
      }/*,
        {
        style: 'simple',
        title: '其它',
        route:$route("other")
      }*/
    ]
  }
}
