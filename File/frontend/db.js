const mysql = require("mysql")

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "atguigudb"
})

// 封装的方法
const query = (sql, params, callback) => {
  pool.getConnection((err, conn) => {
    if(err) {
      console.log("连接 mysql 失败")
      throw err
    }

    conn.query(sql, params, (err, data, fields) => {
      if(err) {
        console.log("sql执行失败")
        conn.release()
        return
      }

      // 将怎么使用data的逻辑 放在回调里面 由调用者决定
      callback && callback(data, fields)
      conn.release()
    })
  })
}

// 测试下
let sql = "select * from employees where employee_id = 100"

// 查询语句不需要参数
let params = []

query(sql, params, function(data, fields) {
  console.log(data[0].last_name)
})


exports.query = query