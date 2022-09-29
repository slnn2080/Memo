package com.sam.servlet;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.List;

public class UploadServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 1. 先判断上传的数据是否为多段数据(只有是多段的数据 才是文件上传的 才能够解析)
    if(ServletFileUpload.isMultipartContent(req)) {

      // 2. 创建 ServletFileUpload 的对象
      // 2.1 先创建 FileItemFactory接口的实现类对象 作为参数传入到 ServletFileUpload构造器里面
      DiskFileItemFactory fileItemFactory = new DiskFileItemFactory();
      // 创建用于解析上传数据的工具类ServletFileUpload
      ServletFileUpload servletFileUpload = new ServletFileUpload(fileItemFactory);

      // 调用工具类的方法 解析上传的数据 得到每一个表单项FileItem
      try {
        List<FileItem> list = servletFileUpload.parseRequest(req);

        // 3. 循环判断 每一个表单项是普通类型 还是上传的文件
        for(FileItem item: list) {
          if(item.isFormField()) {
            // true: 意味着普通表单项
            System.out.println("表单项的name属性名:" + item.getFieldName());
            // UTF-8 解决乱码问题
            System.out.println("表单项的name属性值:" + item.getString("UTF-8"));
          } else {
            // 上传的文件
            System.out.println("表单项的name属性名:" + item.getFieldName());
            System.out.println("上传的文件名:" + item.getName());

            // 将上传的文件写到 桌面 test 文件夹里面
            item.write(new File("/Users/LIUCHUNSHAN/Desktop/file_test/" + item.getName()));
          }
        }

      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }
}
