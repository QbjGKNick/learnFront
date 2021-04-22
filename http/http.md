# HTTP

## 1. HTTP报文

报文结构图：

|   报文首部    |
| :-----------: |
| 空行（CR+LF） |
|   报文主体    |

## 2. 请求报文及响应报文结构



- 报文（message）

由8位组字节流组成

- 实体（entity）

作为请求或响应的有效载荷数据

## 3. 内容编码

编码方式：

- gzip（GNU zip）
- compress（UNIX 系统的标准压缩）
- deflate （zlib）
- identify （不进行编码）

## 3.内容协商

