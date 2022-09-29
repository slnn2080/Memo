const { override, fixBabelImports, addLessLoader } = require('customize-cra')

  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      libraryDirectory: 'es',
      style: true,
    }),

    // 更改主题
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,

        // 修改存储主题颜色的变量值
        // modifyVars: { '@primary-color': 'red' }
      }
    })
  );