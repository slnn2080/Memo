require('@rushstack/eslint-patch/modern-module-resolution')
module.exports = {
  root: true,
  extends: [
    // vue语法的eslint插件
    'plugin:vue/vue3-recommended',
    // '@vue/eslint-config-prettier',
    '@vue/eslint-config-standard-with-typescript'
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    // 函数名后面是否有空格
    '@typescript-eslint/space-before-function-paren': 0,
    // 统一类型的定义方式
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'comma',
          requireLast: false
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false
        }
      }
    ]
  }
}
