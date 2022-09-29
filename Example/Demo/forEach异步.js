// 函数在这个环境里面运行的规则是什么
function Foo() {
  // 全局变量
  getName = function() {
    console.log(1)
  }

  // 如果new Foo this是构造函数的实例对象
  return this
}

Foo.getName = function () {
  console.log(2)
}

Foo.prototype.getName = function() {
  console.log(3)
}

var getName = function() {
  console.log(4)
}

function getName() {
  console.log(5)
}


console.log(Foo())
// Foo.getName()
// getName()
// Foo().getName()
// getName()
// new Foo.getName()
// new Foo().getName()
// new new Foo().getName()

