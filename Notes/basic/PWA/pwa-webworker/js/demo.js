// 计算 1-1亿之间的所有数的和
let total = 0
for(let i = 0; i < 100000000; i++) {
  total += i
}

console.log("this:", this)
console.log("self:", self)
console.log("judge:", this == self)

this.postMessage({total})