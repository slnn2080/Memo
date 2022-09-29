class castvox {
  /**
   *  複数の際、セパレータで結合する
   */
  safe_join = (str_list, separator) => {
    if (str_list.length <= 0) {
      return "";
    }
    if (str_list.length <= 1) {
      return str_list[0];
    }
    console.log(str_list);
    return str_list.join(separator);
  };
  /**
   * 生年月日から歳を計算する
   * @type {string} birth_date 基本情報の生年月日 例2020-01-01
   */
  get_age = (birth_date) => {
    const birthdate = birth_date.replace(/-/g, "");
    const today = new Date();
    const targetdate =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();
    return Math.floor((targetdate - birthdate) / 10000);
  };

  /**
   * 靴のサイズ間の数を取得する
   * @type {Number} be_number 最初の数
   * @type {Number} af_number 最後の数
   */
  get_shoes = (be_number, af_number) => {
    let i = be_number * 2;
    let number = [];
    for (i; i <= af_number * 2; ++i) {
      number.push(i / 2);
    }
    return number;
  };

  /**
   * 数字の間の数を取得する
   * @type {Number} be_number 最初の数
   * @type {Number} af_number 最後の数
   */
  get_number = (be_number, af_number) => {
    let i = be_number;
    let number = [];
    for (i; i <= af_number; i++) {
      number.push(i);
    }
    return number;
  };

  /**
   * 今年から100年前の数を取得する
   */
  get_year = () => {
    const d = new Date();
    const now = d.getFullYear();
    return this.get_number(now - 100, now);
  };
  /** 日付.を取得
   *
   */
  get_date = (d) => {
    const date = new Date(d);
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  };
  /** 日付.を取得
   *
   */
  get_datetime = (d) => {
    const date = new Date(d);
    return `${date.getFullYear()}.${
      date.getMonth() + 1
    }.${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  /**
   * 都道府県
   * @returns {({gender_type: number, gender_name: string}|{gender_type: number, gender_name: string}|{gender_type: number, gender_name: string})[]}
   * @private
   */
  get_all_prefectures = () => {
    return [
      "北海道",
      "青森県",
      "岩手県",
      "宮城県",
      "秋田県",
      "山形県",
      "福島県",
      "茨城県",
      "栃木県",
      "群馬県",
      "埼玉県",
      "千葉県",
      "東京都",
      "神奈川県",
      "新潟県",
      "富山県",
      "石川県",
      "福井県",
      "山梨県",
      "長野県",
      "岐阜県",
      "静岡県",
      "愛知県",
      "三重県",
      "滋賀県",
      "京都府",
      "大阪府",
      "兵庫県",
      "奈良県",
      "和歌山県",
      "鳥取県",
      "島根県",
      "岡山県",
      "広島県",
      "山口県",
      "徳島県",
      "香川県",
      "愛媛県",
      "高知県",
      "福岡県",
      "佐賀県",
      "長崎県",
      "熊本県",
      "大分県",
      "宮崎県",
      "鹿児島県",
      "沖縄県",
    ];
  };
  get_all_gender = () => {
    return [
      {
        gender_type: 1,
        gender_name: "男性",
      },
      {
        gender_type: 2,
        gender_name: "女性",
      },
      {
        gender_type: 0,
        gender_name: "その他",
      },
    ];
  };

  /**
   * 表示文字列に変換
   * @param format
   * @param dt
   * @returns {string}
   * @private
   * @todo util化
   */
  convert_time_str(format, dt) {
    let format_str = format;
    format_str = format_str.replace(/YYYY/g, dt.getFullYear());
    format_str = format_str.replace(/MM/g, dt.getMonth() + 1);
    format_str = format_str.replace(/DD/g, dt.getDate());
    format_str = format_str.replace(/hh/g, dt.getHours());
    format_str = format_str.replace(/mm/g, dt.getMinutes());
    format_str = format_str.replace(/ss/g, dt.getSeconds());
    return format_str;
  }

  /**
   * カテゴリ
   *
   * @param category
   * @returns {string}
   */
  category_name(category) {
    return ["法人", "個人"][category];
  }

  approvals() {
    return [
      {
        type: "none",
        text: "-",
        slug: "",
      },
      {
        type: "danger",
        text: "未承認",
        slug: "no_approval",
      },
      {
        type: "light",
        text: "却下",
        slug: "reject",
      },
      {
        type: "success",
        text: "承認済",
        slug: "fix_approval",
      },
    ];
  }
  get_approvals(slug) {
    return this.approvals().findIndex((app) => app.slug === slug);
  }
  plans() {
    return [
      {
        text: "なし",
        value: 0,
      },
      {
        text: "5名",
        value: 1,
      },
      {
        text: "10名",
        value: 2,
      },
      {
        text: "20名",
        value: 3,
      },
      {
        text: "30名",
        value: 4,
      },
    ];
  }
  /**
   * 承認名前取得
   */
  approval_name(approval) {
    return this.approvals().map((app) => app.text)[approval];
  }

  /**
   *  複数階層オブジェクト参照
   * @param obj
   * @param key
   * @param undefinedValue
   * @returns {*}
   */
  ref_obj(obj, key, undefinedValue) {
    var k = key.split(".");
    for (var i = 0, v = obj; i < k.length; i++) {
      if (!(k[i] in v)) {
        console.error(k[i], "undefined");
        return undefinedValue;
      }
      try {
        //JSON配列のことがあるのでJSONパースを試みる
        v = JSON.parse(v[k[i]]);
      } catch (e) {
        v = v[k[i]];
      }
    }
    return v;
  }

  roles() {
    return {
      corporate: 1,
      production: 2,
      both: 3,
    };
  }

  has_role(role_str, val) {
    return (this.roles()[role_str] & val) !== 0;
  }
}

export default (get, inject) => {
  inject("castvox", new castvox());
};
