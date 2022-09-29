package com.sam.utils;

import org.apache.commons.beanutils.BeanUtils;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public class WebUtils {
  public static <T> T copyParamToBean(T bean, Map map) {
    try {
      BeanUtils.populate(bean, map);
    } catch (Exception e) {
      e.printStackTrace();
    }

    return bean;
  }

  public static int ParseInt(String strInt, int defaultValue) {
    try {
      return Integer.parseInt(strInt);
    } catch (Exception e) {
//      e.printStackTrace();
    }

    // 当没有转换成功的时候 我们返回个默认值
    return defaultValue;
  }
}
