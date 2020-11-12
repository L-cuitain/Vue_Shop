<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header></a-layout-header>
      <a-layout-content>
        <a-row>
          <a-col :span="6" offset="9">
            <a-form :rules="rules" :model="form" ref="loginForm">
              <!-- 顶部logo和标题 -->
              <a-row>
                <a-col :span="24">
                  <h2 class="title">
                    <img src="../assets/logo.png" alt="" class="logo" />Vue Shop
                  </h2>
                  <span class="desc"
                    >vue shop 是西湖区最具影响力的 Web 设计规范(误)</span
                  >
                </a-col>
              </a-row>
              <!-- 中间描述 -->
              <!-- 标签页 -->
              <a-row class="login-form">
                <a-col :span="24">
                  <a-tabs>
                    <a-tab-pane key="1" tab="账号密码登录">
                      <!-- 账号登录表单 -->
                      <a-form-item :wrapperCol="{ span: 24 }" name="username">
                        <a-input
                          size="large"
                          type="username"
                          placeholder="账户: admin"
                          v-model:value="form.username"
                        >
                          <template #prefix
                            ><UserOutlined style="color:rgba(0,0,0,.25)"
                          /></template>
                        </a-input>
                      </a-form-item>
                      <a-form-item :wrapperCol="{ span: 24 }" name="password">
                        <a-input-password
                          size="large"
                          type="password"
                          placeholder="密码: admin or ant.design"
                          v-model:value="form.password"
                        >
                          <template #prefix
                            ><LockOutlined style="color:rgba(0,0,0,.25)"
                          /></template>
                        </a-input-password>
                      </a-form-item>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="手机号登录" force-render>
                      <!-- 手机登录表单 -->
                      <a-form-item :wrapperCol="{ span: 24 }" >
                        <a-input
                          size="large"
                          type="mobile"
                          placeholder="手机号"
                        >
                          <template #prefix
                            ><MobileOutlined style="color:rgba(0,0,0,.25)"
                          /></template>
                        </a-input>
                      </a-form-item>

                      <!-- 验证码栏 -->
                      <a-row :gutter="20">
                        <a-col :span="16">
                          <!-- 验证码 -->
                          <a-form-item :wrapperCol="{ span: 24 }" >
                            <a-input
                              size="large"
                              type="code"
                              placeholder="验证码"
                            >
                              <template #prefix
                                ><MailOutlined style="color:rgba(0,0,0,.25)"
                              /></template>
                            </a-input>
                          </a-form-item>
                        </a-col>

                        <!-- 获取验证码 -->
                        <a-col :span="8">
                          <a-button size="large">获取验证码</a-button>
                        </a-col>
                      </a-row>
                    </a-tab-pane>
                  </a-tabs>
                </a-col>
              </a-row>

              <!-- 选项栏 -->
              <a-row class="option">
                <a-col :span="6">
                  <a-checkbox>
                    自动登陆
                  </a-checkbox>
                </a-col>
                <a-col :span="4" offset="14">
                  <a href="#">忘记密码</a>
                </a-col>
              </a-row>

              <!-- 确定按钮 -->
              <a-row>
                <a-col :span="24">
                  <a-button size="large" type="primary" block @click="handleSubmit">
                    确定
                  </a-button>
                </a-col>
              </a-row>

              <!-- 其他登录方式 -->
              <a-row class="other">
                <a-col :span="24">
                  <span style="float:left"
                    >其他登录方式
                    <AlipayCircleOutlined class="icon-font" />
                    <TaobaoCircleOutlined class="icon-font" />
                    <WeiboCircleOutlined class="icon-font" />
                  </span>
                  <a href="#" style="float:right">注册账户</a>
                </a-col>
              </a-row>
            </a-form>
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined
} from "@ant-design/icons-vue";

export default {
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
    MobileOutlined,
    MailOutlined,
    AlipayCircleOutlined,
    TaobaoCircleOutlined,
    WeiboCircleOutlined
  },
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      value: "",
      checked: false,
      //定义表单数据模型对象
      form: {
        username : "",
        password : "",
        // mobile : "",
        // code : ""
      },
      //定义表单校验规则
      rules : {
        //给字段添加规则
        username : [
          {
            required : true , message : "请输入用户名", trigger : "blur"
          },
          {
            min : 4 , max : 16 , message : "长度在4-16个字符之间" , trigger : "blur"
          }
        ],
        password : [
          {
            required : true , message : "请输入密码" , trigger : "blur"
          },
          {
            min : 6 , max : 16 , message : "长度在6-16个字符之间" , trigger : "blur"
          }
        ],
        // mobile : [
        //   {
        //     required : true , message : "请输入电话号码" , trigger : "blur"
        //   },
        //   {
        //     min : 11 , max : 11 , message : "长度必须为11位" , trigger : "blur"
        //   }
        // ],
        // code : [
        //   {
        //     required : true , message : "请输入验证码" , trigger : "blur"
        //   },
        //   {
        //     min : 5 , message : "长度不能小于5" , trigger : "blur"
        //   }
        // ]
      },
    };
  },
  methods: {
    handleSubmit(){
      this.$refs.loginForm.validate().then(() => {
        console.log("values",this.form);
      })
      .catch(error => {
        console.log("error",error);
      })
    }
  }
};
</script>

<style scoped>
#components-layout-demo-basic {
  text-align: center;
}

#components-layout-demo-basic,
.ant-layout {
  height: 100%;
  background: url("/image/background.svg");
}

#components-layout-demo-basic .ant-layout-header {
  height: 110px;
  background-color: transparent;
}
#components-layout-demo-basic .ant-layout-footer {
  height: 144px;
  line-height: 1.5;
}
#components-layout-demo-basic
  > .ant-layout
  #components-layout-demo-basic
  > .ant-layout:last-child {
  margin: 0;
}

.shop-title {
  height: 44px;
  padding: 0 95px;
}

.logo {
  width: 44px;
  height: 100%;
  margin-right: 16px;
  cursor: pointer;
}

.title {
  font-size: 28px;
  color: rgba(0, 0, 0, 0.85);
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-weight: 600;
  margin-bottom: 0;
  cursor: pointer;
}

.desc {
  display: block;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 12px;
  margin-bottom: 40px;
}

.formData {
  height: 129px;
}

.ant-row ant-form-item {
  margin-right: 0;
}

.option {
  margin-bottom: 24px;
}

.other {
  margin-top: 24px;
}

.icon-font {
  vertical-align: middle;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.2);
  margin-left: 16px;
  cursor: pointer;
  transition: all 0.4s;
}

.icon-font:hover {
  color: #1890ff;
}

.ant-form-explain{
  text-align : left;
}
</style>