const cheerio = require("cheerio")
const $ = cheerio.load("<h2 class='title'>hello</h2>")

$("h2.title").text("hello there")
$("h2").addClass("wel")

console.log($.html())