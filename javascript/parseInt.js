

/**
 * 
[10.18, 1, 2, 24].map(parseInt)
=> parseInt('10.18', 0) => 10
=> parseInt('1', 1) => NaN
=> parseInt('2', )


 parseInt机制：先value变成字符串，然后再从字符串的第一个字符开始，
 查找有效的字符（遇到非有效字符停止查找，不论后面是否还有数字字符，都不找了）
 把找到的有效数字字符(这个数字必须是小于radix)转换为数字，如果一个都没有找到结果就是NaN

 parseInt(value, radix)
-> radix这个值是一个进制，不传或者0默认都是按照10处理
（特殊情况：如果value是以0x开头，则默认值不是10而是16）
-> 进制的取值范围是：2~36，不在这个范围的运行结果一定是NaN
-> 把value看做radix进制，最后把radix进制转换为十进制

把一个值转化为十进制
126（八进制） => 十进制 86
1*8^2+2*8^1+6*8^0 = 64 + 16 + 6 = 86
 */