# jenkins部署三中心前端

1、Jenkins新建工作任务

新建任务名称，选择构建一个自由风格的软件项目

![image-20200617095610789](/Users/jqb/Library/Application Support/typora-user-images/image-20200617095610789.png)

2、General，填写项目相关描述

![image-20200617103044076](/Users/jqb/Library/Application Support/typora-user-images/image-20200617103044076.png)

3、Gogs Webhook，填写相关构建参数：**environment、project_parameter、oauth2Url、adminUrl**

![image-20200617103328380](/Users/jqb/Library/Application Support/typora-user-images/image-20200617103328380.png)

![image-20200617103345190](/Users/jqb/Library/Application Support/typora-user-images/image-20200617103345190.png)

4、源码管理，添加程序远端仓库地址

![image-20200617103620726](/Users/jqb/Library/Application Support/typora-user-images/image-20200617103620726.png)

5、构建触发器、构建环境（不存在跳过）

6、构建，shell脚本

```shell
cd $WORKSPACE
variable=("tc_admin_web" "tc_oauth2_web")
for var in ${variable[@]};do
cd $var
if [ $var == 'tc_oauth2_web' ];
then
  echo "" >> ./env/${environment}
  echo "VUE_APP_FOLDER_NAME=\"${project_parameter}\"" >> ./env/${environment}
  echo "VUE_APP_OAUTH2_URL=\"${oauth2Url}\"" >> ./env/${environment}
else
  echo "" >> ./env/${environment}
  echo "VUE_APP_API_URL=\"${adminUrl}\"" >> ./env/${environment}
fi

yarn --registry=http://10.12.102.194:4873/
yarn run build:${environment}

tar -zcvf dist.tar.gz dist
cd ..
done
```

7、构建后操作

![image-20200617104705484](/Users/jqb/Library/Application Support/typora-user-images/image-20200617104705484.png)

