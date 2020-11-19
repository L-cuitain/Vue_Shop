<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: #000; font-weight: bold"
        >首页</a-breadcrumb-item
      >
      <a-breadcrumb-item>用户管理</a-breadcrumb-item>
      <a-breadcrumb-item>用户列表</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <!-- 添加用户 -->
      <a-form>
        <a-row>
          <a-col :span="12">
            <a-row :gutter="16">
              <!-- 输入内容文本框 -->
              <a-col :span="13">
                <a-form-item :wrapperCol="{ span: 24 }">
                  <a-input-search
                    v-model:value="content"
                    placeholder="请输入内容"
                    style="width: 300px; margin-right: 20px"
                    @search="onSearch"
                  />
                </a-form-item>
              </a-col>
              <!-- 输入内容文本框 end -->

              <a-col :span="8">
                <a-button
                  type="primary"
                  @click="showModal"
                  style="margin-top: 4px"
                >
                  添加用户
                </a-button>
                <a-modal
                  title="添加用户"
                  cancelText="取消"
                  okText="确定"
                  v-model:visible="visible"
                  :confirm-loading="confirmLoading"
                  @ok="addUser"
                >
                  <a-form :rules="rules" v-model:model="form" ref="addForm">
                    <a-row>
                      <a-col :span="24">
                        <a-form-item
                          label="用户名"
                          required
                          :wrapper-col="{ span: 20 }"
                          :labelCol="{ span: 4 }"
                          name="username"
                        >
                          <a-input type="text" v-model:value="form.username" />
                        </a-form-item>
                        <a-form-item
                          label="密码"
                          required
                          :wrapper-col="{ span: 20 }"
                          :labelCol="{ span: 4 }"
                          name="password"
                        >
                          <a-input-password
                            type="password"
                            v-model:value="form.password"
                          />
                        </a-form-item>
                        <a-form-item
                          label="邮箱"
                          :wrapper-col="{ span: 20 }"
                          :labelCol="{ span: 4 }"
                          name="email"
                        >
                          <a-input type="email" v-model:value="form.email" />
                        </a-form-item>
                        <a-form-item
                          label="手机号"
                          :wrapper-col="{ span: 20 }"
                          :labelCol="{ span: 4 }"
                          name="mobile"
                        >
                          <a-input type="text" v-model:value="form.mobile" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-form>
                </a-modal>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-form>
      <!-- 添加用户 end  -->

      <!-- 渲染用户数据列表 -->
      <a-table
        :row-key="record => record.id"
        :columns="columns"
        :data-source="UserList.users"
        :pagination="false"
        bordered
      >
        <template #mg_state="{ text }">
          <a-switch :checked="text.mg_state" />
        </template>

        <template #operation>
          <a-button
            type="primary"
            class="operation_button"
            style="background-color: #409eff; color: #fff"
            ><EditOutlined
          /></a-button>
          <a-button
            type="danger"
            class="operation_button"
            style="background-color: #f56c6c; color: #fff"
            ><DeleteOutlined
          /></a-button>
          <a-button
            class="operation_button"
            style="background-color: #e6a23c; color: #fff"
            ><SettingOutlined
          /></a-button>
        </template>
      </a-table>
      <!-- 渲染用户数据列表 end -->

      <!-- 分页查询 -->
      <div class="page_info">
        <a-pagination
          show-quick-jumper
          show-less-items
          @change="onChange"
          :total="UserList.total"
          :page-size="2"
          :show-total="total => `共 ${total} 条数据`"
        />
      </div>
      <!-- 分页查询 end -->
    </div>
  </div>
</template>

<script>
//导入 api
import { user } from "@/api";
//导入 http
import { httpGet , httpPost } from "@/utils/http";

import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined
} from "@ant-design/icons-vue";

const columns = [
  {
    title: "#",
    dataIndex: "index",
    key: "index"
  },
  {
    title: "姓名",
    dataIndex: "username",
    key: "username"
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "电话",
    key: "mobile",
    dataIndex: "mobile"
  },
  {
    title: "角色",
    key: "role_name",
    dataIndex: "role_name"
  },
  {
    title: "状态",
    key: "mg_state",
    slots: { customRender: "mg_state" }
  },
  {
    title: "操作",
    key: "operation",
    slots: { customRender: "operation" }
  }
];

export default {
  data() {
    return {
      content: "",
      //当前页码
      pageNum: 1,
      //每页显示条数
      pageSize: 2,
      //表格项
      columns,
      //数据列表
      UserList: [],

      //添加用户显示框
      visible: false,
      confirmLoading: false,

      formInline: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },

      //定义表单数据模型对象
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },

      //定义表单规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名"
          },
          {
            whitespace: true,
            message: "不能有空格"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码"
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
            message:
              "密码格式不正确 至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符"
          }
        ],
        email: [
          {
            type: "email",
            message: "必须为邮箱格式"
          }
        ],
        mobile: [
          {
            max: 13,
            min: 13,
            message: "长度必须为13位"
          }
        ]
      }
    };
  },
  created() {
    this.ShowList();
  },
  methods: {
    //文本框输入内容
    onSearch(value) {
      console.log("输入的值为: ", value);
    },
    async ShowList() {
      //获取请求地址
      let url = user.UserList;
      //获取参数
      let params = {
        pagenum: this.pageNum,
        pagesize: this.pageSize
      };

      //发起请求 获取数据列表
      let results = await httpGet(url, params);
      // console.log(results);

      if (results.meta.status == 200) {
        this.UserList = results.data;
        this.UserList.users.forEach((element, index) => {
          element.index = index + 1;
        });
      }
    },

    //切换列表页数据
    onChange(pageNumber) {
      //改变当前页码
      this.pageNum = pageNumber;
      //重新调用ShowList方法
      this.ShowList();
    },

    //添加用户显示提示框
    showModal() {
      this.visible = true;
    },

    //添加User数据
    async addUser() {
      //获取表单数据
      let params = await this.$refs.addForm.validate();

      console.log(params);

      //获取请求地址
      let url = user.UserList;
      console.log(url);
      //发送请求
      let results = await httpPost(url,params);

      console.log(results);

      if(results.meta.status== 200){
        this.visible = false;
        this.confirmLoading = false;
      }
    }
  },

  components: {
    EditOutlined,
    DeleteOutlined,
    SettingOutlined
  }
};
</script>

<style>
.ipt_search {
  float: left;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.operation_button {
  margin-right: 10px;
}

.page_info {
  margin-top: 20px;
}
</style>
