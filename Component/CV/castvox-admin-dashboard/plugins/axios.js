export default function ({ app, route, $axios, redirect, store }) {
  // handle api errors
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    // not found - show page
    if (code === 404) {
      app.$toast.error("404 Not Found <br>");
      redirect("/404");
    }
    // logout the user if the session expired
    if (app.$auth.loggedIn && [401, 419].includes(code)) {
      app.$toast.error("セッションが切れましたのでログアウトしました。 <br>", {
        dismissible: false,
      });
      logout();
    }
    if ([422].includes(code)) {
      if (error.response.config.url.includes("/login")) {
        if (error.response.data.errors.password) {
          app.$toast.error(
            `${code}エラー<br/>` +
              "パスワードが正しくありません。有効なパスワードを設定してください。<br>" +
              error,
            {
              dismissible: false,
            }
          );
        }
        if (error.response.data.errors.email) {
          app.$toast.error(
            `${code}エラー<br/>` +
              "メールアドレスが正しくありません。有効なメールアドレスを設定してください。<br>" +
              error,
            {
              dismissible: false,
            }
          );
        }
      } else {
        app.$toast.error(
          `${code}エラー<br/>` +
            "入力値が正しくありません。正しい入力値を設定してください。<br>" +
            error,
          {
            dismissible: false,
          }
        );
      }
    }
    if ([400].includes(code)) {
      if (error.response.config.url.includes("/login")) {
        app.$toast.error(
          `${code}エラー<br/>` +
            "パスワードが正しくありません。正しいパスワードを設定してください。<br>" +
            error,
          {
            dismissible: false,
          }
        );
      } else {
        app.$toast.error(
          `${code}エラー<br/>` +
            "不正な入力値が入力されました。正しい値を入力してください。<br>" +
            error,
          {
            dismissible: false,
          }
        );
      }
    }
    if ([500].includes(code)) {
      app.$toast.error(
        `${code}エラー<br/>` +
          "サーバーエラーが発生しました　管理者にお問い合わせください<br>" +
          error,
        {
          dismissible: false,
        }
      );
    }
    if (error.response.config.url.includes("/me")) {
      //meのエラーはトークンをリセットする
      app.$auth.strategy.token.reset();
      app.$toast.error("不正な認証情報でアクセスが発生しました。<br>" + error, {
        dismissible: false,
      });
    }

    if (error == "Error: Network Error") {
      app.$toast.error("通信エラーが発生しました<br>" + error, {
        dismissible: false,
      });
    }
    // throw other errors
    return Promise.reject(error);
  });

  async function logout() {
    await app.$auth.logout();
    app.$auth.setToken("local", false);
    store.commit("alerts/removeAll");
    if (route.path !== "/login") {
      redirect({ name: "login" });
    }
  }
}
