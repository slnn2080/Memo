// module.exports = {
//   presets: [
//     ["@babel/preset-env", 
//       {
//         useBuiltIns: "usage",
//         corejs: 3,
//         targets: {
//           "chrome": "58", 
//           "ie": "11", 
//           "firefox": "60", 
//           "safari": "11", 
//           "edge": "11"
//         }
//       }
//     ]
//   ],
//   plugins: [
//     ["@babel/plugin-transform-runtime", {
//       "corejs": 3
//     }]
//   ]
// }

module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}