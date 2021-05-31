<template>
  <div class="login">
    <div class="loading-box">
      <div class="loading-box-top">
        <span>后台模板</span>
      </div>

      <c-form :rules="rules" :model="userInfo" ref="formInfo" class="userInfo" @submit.native.prevent>
        <div class="bottom-title">系统登录</div>
        <c-form-item prop="username">
          <c-input v-model="userInfo.username" placeholder="请输入用户名" prefix-icon="bg-user"
                      @keyup.enter.native.prevent="login('formInfo')"></c-input>
        </c-form-item>
        <c-form-item prop="password">
          <c-input
            placeholder="请输入密码"
            v-model="userInfo.password"
            show-password
            prefix-icon="bg-pwd"
            @keyup.enter.native.prevent="login('formInfo')"
          ></c-input>
        </c-form-item>
        <!-- <c-checkbox v-model="checked">记住账号</c-checkbox> -->
        <c-button class="btnSum" @click="login('formInfo')">登  录</c-button>
      </c-form>
    </div>
  </div>
</template>
<script>
// import { userLogin,getTreeList } from "@/services/common.js"
// import { userLogin } from "@/services/common.js"
import { getMenu } from "@/utils/index.js"
import { addRoutes } from "./permission.js"
export default {
  data() {
    return {
      checked: false,
      userInfo: {
        username: "33012119690521235X",
        password: "123456"
        // username:"",
        // password:""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods:{
    login(formName){
      this.$refs[formName].validate(valid => {
        if(valid){
          // let params ={
          //   userAccount: this.userInfo.username,
          //   password: this.userInfo.password
          // }
          // userLogin(params).then(res =>{
          //   if(res && res.success){
          //     return res.data
          //   }else{
          //     this.$message({
          //       message: res.message,
          //       type: 'warning'
          //     });
          //   }
          // }).then(data =>{
          //   console.log(data)
            // localStorage.setItem("staffId",data.staffId)
            // localStorage.setItem("staffName",data.staffName)
            // localStorage.setItem("userId",data.staffId)
            // localStorage.setItem("roleId",data.roleId)
            // localStorage.setItem("departmentId",data.department)
            localStorage.setItem("staffId", "001")
            localStorage.setItem("staffName", "系统用户")
            localStorage.setItem("userId", "001")
            localStorage.setItem("roleId", "001")
            localStorage.setItem("departmentId", "管理员")
            // let params ={
            //   roleId:data.roleId,
            //   staffId: data.staffId
            // }
            // getTreeList(params).then((res) =>{
            //   if(res && res.data){
                let _menuData = [
                  {
                    "id":"BASP",
                    "text":"示例",
                    "icon":"",
                    "leaf":true,
                    "expanded":true,
                    "url":"",
                    "children":[
                      {
                        "id":"BASP_01",
                        "text":"表格",
                        "leaf":false,
                        "expanded":true,
                        "url":"",
                        "children":[
                          {
                            "id":"BASP_01_02",
                            "text":"表格1",
                            "leaf":false,
                            "expanded":true,
                            "url":"/wraptable",
                            "children":[
                            ],
                            "icon":"待定",
                            "nodeType":2,
                            "systemType":0,
                            "pids":[
                              "BASP",
                              "BASP_01"
                            ]
                          },
                          {
                            "id":"BASP_01_03",
                            "text":"表格2",
                            "leaf":false,
                            "expanded":true,
                            "url":"/wraptableproxy",
                            "children":[],
                            "icon":"待定",
                            "nodeType":2,
                            "systemType":0,
                            "pids":[
                              "BASP",
                              "BASP_01"
                            ]
                          },
                        ]
                      }
                    ]
                  },
                ]
                localStorage.setItem("getTheeList",JSON.stringify(_menuData))
                getMenu()
                addRoutes(getMenu())
                let beforeRouter =localStorage.getItem("beforeRouter")
                if(beforeRouter && beforeRouter != "/login"){
                  beforeRouter = localStorage.getItem("beforeRouter")
                }else{
                  beforeRouter = "/home"
                }
                this.$router.replace("/home")
                // let beforeRouter = localStorage.getItem("beforeRouter") && localStorage.getItem("beforeRouter") == "/login " ? "/home" : localStorage.getItem("beforeRouter")
                  // this.$nextTick(() =>{
                    // this.$router.replace(beforeRouter)
                  // })
              // }
            // })
          // })
        // }else{
        //   return false;
        }
      })
    }
  },
  mounted(){
    localStorage.removeItem("getTheeList")
  }
};
</script>
<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  font-size: 24px;
  background: #a1c6f0 url("~@/assets/img/bg.png") no-repeat;
  background-size: 100%;
  display: flex;
  align-items: center;
  .loading-box {
    margin: 0 auto;
    display: flex;
    width: 400px;
    flex-direction: column;
    .loading-box-top {
      background:rgba(52,79,131,1);
      box-shadow:0px 20px 44px -20px rgba(0,18,53,0.3);
      border-radius:0px 0px 4px 4px;
      height: 72px;
      text-align: center;
      line-height: 72px;
      span {
        font-size: 28px;
        font-weight: bold;
        color:rgba(255,255,255,1);
      }
    }
    .userInfo {
      background-color: white;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      .bottom-title {
        height: 90px;
        line-height: 90px;
        font-size: 20px;
        text-align: center;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.85);
        opacity: 1;
      }
      .el-input {
        margin-left: 40px;
        width: 320px;

        .el-input__prefix {
          display: flex;
          align-items: center;
          margin-left: 5px;
          .bg-user {
            background: url("~@/assets/img/user.png") no-repeat;
            width: 14px;
            height: 14px;
            background-size: 100% 100%;
            vertical-align: middle;
          }
          .bg-pwd {
            background: url("~@/assets/img/pwd.png") no-repeat;
            width: 14px;
            height: 14px;
            background-size: 100% 100%;
            vertical-align: middle;
          }
        }
        .el-input__clear {
          line-height: 40px;
        }
      }
      .el-form-item__error{
        margin-left: 40px;
      }
      .el-checkbox {
        margin-left: 40px;
        margin-top: 2px;
        .el-checkbox__inner {
          border: 1px solid rgba(217, 217, 217, 1);
        }
        .el-checkbox__label {
          font-size: 16px;
          font-weight: 300;
          color: rgba(0, 0, 0, 0.45);
          opacity: 1;
        }
      }
      .btnSum.el-button {
        width: 80%;
        height: 44px !important;
        line-height: 44px;
        margin: 28px auto;
        background:rgba(52,79,131,1);
        box-shadow:0px 20px 44px -20px rgba(0,18,53,0.3);
        border-radius:4px;
        border: none;
        span {
          font-size: 20px;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>
