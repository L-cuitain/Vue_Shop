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
                  v-model:visible="addVisible"
                  :confirm-loading="confirmLoading"
                  @ok="addUser"
                  @cancel="cancelAddUser"
                >
                  <a-form :rules="rules" v-model:model="form" ref="addForm">
                    <a-row>
                      <a-col :span="24">
                        <a-form-item
                          label="用户名"
                          required
                          has-feedback
                          :wrapper-col="{ span: 20 }"
                          :labelCol="{ span: 4 }"
                          name="username"
                        >
                          <a-input type="text" v-model:value="form.username" />
                        </a-form-item>
                        <a-form-item
                          label="密码"
                          required
                          has-feedback
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
                          has-feedback
                          :wrapper-col="{ span: 20 }"
                          :labelCol="{ span: 4 }"
                          name="email"
                        >
                          <a-input type="email" v-model:value="form.email" />
                        </a-form-item>
                        <a-form-item
                          label="手机号"
                          has-feedback
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
        <!-- 选中按钮 -->
        <template #mg_state="{ text }">
          <a-switch
            v-model:checked="text.mg_state"
            :id="text.id"
            @change="ChooseStatus"
          />
        </template>
        <!-- 选中按钮 end -->

        <template #operation="{ record }">
          <!-- 编辑 -->
          <a-button
            type="primary"
            class="operation_button"
            style="background-color: #409eff; color: #fff"
            @click="showEditModal(record.id)"
            ><EditOutlined
          /></a-button>

          <a-modal
            title="用户修改"
            cancelText="取消"
            okText="确定"
            v-model:visible="isEdit"
            :confirm-loading="confirmLoading"
            @ok="EditUser(record.id)"
            @cancel="cancelEditUser"
          >
            <a-form :rules="EditRules" v-model:model="EditForm" ref="EditForm">
              <a-row>
                <a-col :span="24">
                  <a-form-item
                    label="用户名"
                    has-feedback
                    :wrapper-col="{ span: 20 }"
                    :labelCol="{ span: 4 }"
                    name="username"
                  >
                    <a-input
                      type="text"
                      disabled
                      v-model:value="EditForm.username"
                    />
                  </a-form-item>
                  <a-form-item
                    label="邮箱"
                    has-feedback
                    :wrapper-col="{ span: 20 }"
                    :labelCol="{ span: 4 }"
                    name="email"
                  >
                    <a-input type="email" v-model:value="EditForm.email" />
                  </a-form-item>
                  <a-form-item
                    label="手机号"
                    has-feedback
                    :wrapper-col="{ span: 20 }"
                    :labelCol="{ span: 4 }"
                    name="mobile"
                  >
                    <a-input type="text" v-model:value="EditForm.mobile" />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-modal>
          <!-- 编辑 end -->

          <!-- 删除 -->
          <a-button
            type="danger"
            class="operation_button"
            style="background-color: #f56c6c; color: #fff"
            @click="handleDelete(record.id)"
            ><DeleteOutlined
          /></a-button>
          <!-- 删除 end -->

          <!-- 权限 -->
          <a-button
            class="operation_button"
            style="background-color: #e6a23c; color: #fff"
            @click="showAllotVisible(record)"
            ><SettingOutlined
          /></a-button>
          <!-- 权限弹窗 -->
          <a-modal
            title="分配角色"
            v-model:visible="allotVisible"
            :confirm-loading="confirmLoading"
            @ok="handlePermission(record.id)"
            @cancel="handleRoleCancel()"
          >
            <p>当前的用户: {{ allotUserData.username }}</p>
            <p>当前的角色: {{ allotUserData.role_name }}</p>
            <p>
              分配新角色:
              <!-- 分配角色 -->
              <a-select
                v-model:value="selectRole"
                style="width: 120px"
                @change="showRole"
                ref="select"
                placeholder="请选择角色"
              >
                <a-select-option
                  v-for="item in allotRole"
                  :key="item.id"
                  :value="item.id"
                >
                  <span>{{ item.roleName }}</span>
                </a-select-option>
              </a-select>
              <!-- 分配角色 end -->
            </p>
          </a-modal>
          <!-- 权限弹窗 end -->
        </template>
        <!-- 权限 end -->
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
import { user, role } from "@/api";
//导入 http
import { httpGet, httpPost, httpDelete, httpPut } from "@/utils/http";
//导入删除提示
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

import { createVNode } from "vue";

import { message, Modal } from "ant-design-vue";

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
      addVisible: false,

      //设置用户显示框的显示和隐藏
      confirmLoading: false,

      //设置分配角色的显示和隐藏
      allotVisible: false,

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
            message: "请输入用户名",
            tigger: "blur"
          },
          {
            whitespace: true,
            message: "不能有空格",
            tigger: "blur"
          },
          {
            max: 15,
            min: 2,
            message: "长度必须为2到15位之间",
            tigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            tigger: "blur"
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
            message:
              "密码格式不正确 至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符",
            tigger: "blur"
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
      },

      //修改框弹出
      isEdit: false,

      //定义修改表单数据模型对象
      EditForm: {
        username: "",
        email: "",
        mobile: ""
      },

      //定义修改表单规则
      EditRules: {
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            tigger: "blur"
          },
          {
            type: "email",
            message: "必须为邮箱格式"
          }
        ],
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
            tigger: "blur"
          },
          {
            max: 13,
            min: 13,
            message: "长度必须为13位"
          }
        ]
      },

      //分配角色用户属性显示
      allotUserData: {},
      //分配角色列表
      allotRole: [],
      //默认选择角色
      selectRole: null
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

    //显示用户列表
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
      this.addVisible = true;
    },

    //显示用户修改提示框
    async showEditModal(userId) {
      console.log(userId);
      //获取url
      let url = user.UserList;

      //发送请求  获取ID指定的用户信息
      let results = await httpGet(`${url}/${userId}`);

      //判断响应状态码
      if (results.meta.status == 200) {
        this.EditForm.username = results.data.username;
        this.EditForm.email = results.data.email;
        this.EditForm.mobile = results.data.mobile;
      }

      //显示编译文本框
      this.isEdit = true;
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
      let results = await httpPost(url, params);

      console.log(results);

      if (results.meta.status == 201) {
        this.addVisible = false;
        // 清空表单中的输入框
        this.$refs.addForm.resetFields();
        message.success(results.meta.msg);
        //重新调用查询列表方法
        this.ShowList();
      }
    },

    //取消添加用户
    cancelAddUser() {
      this.$refs.addForm.resetFields();
    },

    //删除列表项
    handleDelete(userId) {
      Modal.confirm({
        title: "删除警告",
        icon: createVNode(ExclamationCircleOutlined),
        content: "你确定要删除此项嘛?",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          //获取地址
          let url = user.UserList;

          //发送Delete请求
          let results = await httpDelete(`${url}/${userId}`);

          //判断请求后状态码
          if (results.meta.status == 200) {
            this.visible = false;
            //提示框
            message.success(results.meta.msg);
            //重新调用获取数据方法
            this.ShowList();
          } else {
            //提示框
            message.error(results.meta.msg);
          }
        }
      });
    },

    //编辑页面
    async EditUser(userId) {
      console.log(userId);
      //获取表单的参数
      let params = await this.$refs.EditForm.validate();
      // console.log(params);

      //获取地址
      let url = user.UserList;
      let results = await httpPut(`${url}/${userId}`, {
        email: params.email,
        mobile: params.mobile
      });

      //判断响应状态码
      if (results.meta.status == 200) {
        this.isEdit = false;
        //提示修改成功
        message.success(results.meta.msg);
        //重新调用获取数据方法
        this.ShowList();
      } else {
        //提示修改失败
        message.error(results.meta.msg);
      }
    },

    //取消编辑用户
    cancelEditUser() {
      this.$refs.EditForm.resetFields();
    },

    //显示分配角色弹窗
    async showAllotVisible(user) {
      //获取user对象中的数据 存入
      this.allotUserData = user;
      //获取请求地址
      let url = role.GetRoles;
      //发送请求  根据id 获取 此用户数据
      let results = await httpGet(`${url}`);

      //判断相应状态码
      if (results.meta.status == 200) {
        //将分配的角色传给数组
        this.allotRole = results.data;

        //显示弹窗
        this.allotVisible = true;
      }
    },

    showRole(value) {
      console.log(value);
    },

    //分配角色确定事件
    async handlePermission(userId) {
      //获取选中的 角色id
      let roleId = this.selectRole;

      //发起请求
      let results = await httpPut(`users/${userId}/role`, {
        rid: roleId
      });

      //判断相应状态码
      if (results.meta.status == 200) {
        //默认选择重置
        this.selectRole = null;
        //提示成功信息
        message.success(results.meta.msg);
        //重新调用获取用户数据
        this.ShowList();
      } else {
        //默认选择重置
        this.selectRole = null;
        //提示失败信息
        message.error(results.meta.msg);
      }

      //关闭弹窗
      this.allotVisible = false;
    },

    //取消分配角色
    handleRoleCancel() {
      //默认选择重置
      this.selectRole = null;
    },

    //改变用户状态
    async ChooseStatus(check, event) {
      console.log(event.target.id);
      //发起请求
      let results = await httpPut(`users/${event.target.id}/state/${check}`);

      //判断响应状态码
      if (results.meta.status == 200) {
        message.success(results.meta.msg);
      } else {
        message.error(results.meta.msg);
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
