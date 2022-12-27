# 取出 一个数字的每一位
我们从简单的开始分析，比如我们要
- 取出个位数 = number % 10
- 取出十位数 = number / 10 % 10
- 取出百位数 = number / 100 % 10
- 取出千位数 = num / 1000 % 10

我们可以得到规律：

**取出n位置上的数 = number / Math.pow(10, n-1) % 10**

```java
public int getNumberByPosition(int number, int position) {
  if(position < 1) return -1

  return (int)(number / Math.pow(10, position - 1) % 10)
}

int num = getNumberByPosition(765432, 1)
```

<br><br>

## int <-> char 之间的转换
注意的是char为数值型的字符

<br>

### int -> char
int类型转char类型，将数字加一个‘0’，并强制类型转换为char即可。
```java
int num = 9;
char c = (char)(num + '0');
```

<br>

### char -> int
char类型装int类型，将字符减一个‘0’即可。
```java
char cnum = '3';
int num = cnum - '0';
```

<br><br>