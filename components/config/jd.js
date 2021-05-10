 function jd() {
  return new Promise(async resolve => {
    try {      let url ='https://cdn.jsdelivr.net/gh/NobyDa/Script/JD-DailyBonus/JD_DailyBonus.js'
               let res = await $http.get(url)
              a = `Key=$storage.get('jd')||""`
               script = res.data.replace(/var Key = ''/, a).replace(/ stop = 0/," stop = 1")            
               eval(script)             
    } catch (err) {     
      console.log(err)
    }
    resolve()
  })
}
   
   module.exports=jd