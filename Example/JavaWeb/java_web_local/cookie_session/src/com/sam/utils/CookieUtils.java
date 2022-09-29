package com.sam.utils;

import javax.servlet.http.Cookie;

public class CookieUtils {
  // 查找指定名称的cookie对象
  public static Cookie findCookie(String name, Cookie[] cookies) {
    if(name == null || cookies == null || cookies.length == 0) return null;

    for (Cookie cookie : cookies) {
      if(name.equals(cookie.getName())) {
        return cookie;
      }
    }

    return null;
  }
}
