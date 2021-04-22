# HTTP状态码

## 1. 2XX 成功

- 200 OK
- 204 No Content 请求成功但是没有资源返回
- 206 Partial Content 客户端进行了范围请求，服务器成功执行了这部分请求
  - 响应报文中包含`Content-Range`指定范围的实体内容

## 2. 3XX 重定向

- 301 Moved Permanently
  - 永久性重定向，表示请求资源已被分配了新的URI，以后使用资源现在所指的URI
- 302 Found
  - 临时重定向，表示请求的资源已被分配了新的URI，希望用户（本次）能使用新的URI访问
- 303 See Other
  - 表示请求对应的资源存在着另一个URI，应使用GET方法定向获取请求的资源。
- 304 Not Modified
  - 客户端发送附带条件的请求（请求报文中包含`If-Mathch,If-Modified-Since,If-None-Match,If-Range,If-Unmodified-Since`中任一首部）时，服务器允许请求访问资源，但因发生请求未满足条件的情况后，直接返回304 Not Modified(`服务器端资源为改变，可直接使用客户端未过期的缓存`)
- 307 Temporary Redirect
  - 临时重定向

## 3. 4XX 客户端错误

- 400 Bad Request
  - 请求报文存在语法错误
- 401 Unauthorized
  - 发送请求需要通过HTTP认证
  - 返回401的响应必须包含一个适用于被请求资源的`WWW-Authenticate`首部用以质询用户信息
- 403 Forbidden
  - 对请求资源的访问被服务器拒绝了
- 404 Not Found
  - 服务器上没有请求的资源

## 4. 5XX 服务器错误

- 500 Internal Server Error
  - 服务器执行请求时发生错误
- 503 Service Unavailable
  - 服务器暂时处于超负载或正在进行停机维护