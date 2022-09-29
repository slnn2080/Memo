package com.sam.io;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;

public class FileUtilTest {
  public static void main(String[] args) throws IOException {
    // 复制一个文件
    File srcFile = new File("Hello.txt");
    File destFile = new File("Hello2.txt");
    FileUtils.copyFile(srcFile, destFile);
  }
}
