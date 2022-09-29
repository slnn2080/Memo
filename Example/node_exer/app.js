const cheerio = require("cheerio")
let iconv = require("iconv-lite")
let request = require("request")
// let url = "https://www.dydytt.net/html/gndy/rihan/index.html"

// request(url, {
//   encoding: null
// } ,(err, res, body) => {

//   const bufs = iconv.decode(body, 'gb2312')
//   const html = bufs.toString("utf8")
//   console.log(html)
// })

// 将上面的请求封装成promise方法
const req = (url) => {
  return new Promise((resolve, reject) => {
    request(url, {
      encoding: null
    } ,(err, res, body) => {
      if(res.statusCode === 200) {
        const bufs = iconv.decode(body, 'gb2312')
        const html = bufs.toString("utf8")
        resolve(html)
      } else {
        reject(err)
      }
    })
  })
  
}
const host = "https://www.dydytt.net"
const uri = "/html/gndy/rihan/list_6_2.html"
let pageArr = []
for(let i=1; i<= 100; i++) {
  pageArr.push(host + `/html/gndy/rihan/list_6_${i}.html`)
}

// 这个arr中装着一个分类下所有的电影页面
console.log(pageArr)

// 我们要请求 pageArr 中的每一项 但是我们需要的是 在一个请求结束后再进行下一个请求
pageArr.reduce((rs, url) => {
  return rs.then(() => {
    return new Promise(async (resolve) => {
      await req(url)
      resolve()
    })
  })
}, Promise.resolve())
    // 这种方式会等待上一个req请求完成后 再执行下一个请求
    // rs就是我们的默认值 Promise.resolve()

req(host + uri).then(res => {

  // 使用 cheerio 加载html页面
  const $ = cheerio.load(res)

  // $就可以操作html文档了
  $(".co_content8 ul table tbody tr:nth-child(2) td:nth-child(2) b a:nth-child(2)").each((i, item) => {
    // 我们找到的是一个dom
    let link = $(item).attr("href")
    // console.log(link) // /html/gndy/jddy/20210621/61553.html 所有的url

    // 我们拿到每一个 电影标题的 uri部分后 再次根据uri部分发送请求 我们需要得到电影的详情页面
    getMovieDetail(link)
  })
})

// 再封装了await方法 根据uri部分 发送请求 获取电影详情的页面
const getMovieDetail = async (url) => {
  const html = await req(host + url)
  // console.log(html) // 我们能够拿到每一个电影详情页的内容

  // 这里也是一样 我们要使用 cheerio 加载html 要操作html
  const $ = cheerio.load(html)
  const movie = {
    // 电影名:
    name: $("#header > div > div.bd2 > div.bd3 > div.bd3l > div.co_area2 > div.title_all > h1 > font").text(),
    // 电影详情:
    img: $("#Zoom > span > img").attr("src"),
    // 下载链接
    link: $("")
  }
  // console.log(movie)
}