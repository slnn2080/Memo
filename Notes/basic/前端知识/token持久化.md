## 概要
对于实现token的持久化 我们不仅仅要保存在 Vuex 中 同时也要保存在浏览器中的哪个部分里

根据保存的位置不同 实现的方式也不同

<br>

```js
// vuex-persistedstate
https://www.npmjs.com/package/vuex-persistedstate

// リロードしても大丈夫。そう、vuex-persistedstateならね。
https://qiita.com/_masa_u/items/b58b92c283f4e770e094
```

<br>

## 方式1: SessionStorage中保存
```js
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const createStore = () => {
  return new Vuex.Store({
    ...rootStore,
    modules: {
    // 省略
    },
    plugins: [
      createPersistedState({
        key: 'access_token',

        // 永続化したいステートのみ記述
        paths: [
          'loginStore.loginAdapter.accessToken',
        ],
        storage: window.sessionStorage
      })
    ]
  });
};
```

<br>

## 方式2: 在 Cookies 中保存
并且发送请求的时候要携带 cookie

在前端为了能够简单的使用 cookie 这里使用了 
```js
npm i js-cookie
```

```js
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

const createStore = () => {
  return new Vuex.Store({
    ...rootStore,
    modules: {
    // 省略
    },
    plugins: [
      createPersistedState({
        key: 'access_token',

        // 管理対象のステートを指定。pathsを書かない時は`modules`に書いたモジュールに含まれるステート全て。`[]`の時はどれも保存されない
        paths: [
          'loginStore.loginAdapter.accessToken',
        ],
        storage: {
          getItem: key => Cookies.get(key),
          setItem: (key, value) => Cookies.set(key, value, { expires: 1, secure: true, sameSite: 'strict' }),
          removeItem: key => Cookies.remove(key)
        }
      })
    ]
  });
};
```

```js
/*
  * リクエスト発効前に発火するイベントのハンドラ設定
  */
context.$axios.onRequest((config: AxiosRequestConfig) => {
  const token = context.store.getters[loginTypes.GETTER_GET_ACCESS_TOKEN];
  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`;
  }

  // 管理者権限かつローカル環境以外のみ抽出
  const actor = context.store.getters[loginTypes.GETTER_GET_ACTOR];
  if (Actor.TEST_MANAGER <= actor && actor <= Actor.SUPERVISOR && process.env.NODE_ENV !== 'development') {
    config.headers.common.Cookis = `${token}`;
    config.headers.common.Authorization = null;
  }

  // APIリクエストのログに保存します。
  Utils.saveRequestLog(config);
});
```