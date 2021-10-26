<template>
  <div>
    <a-breadcrumb separator=">" style="margin: 16px 0">
      <a-breadcrumb-item style="color: #000; font-weight: bold"
        >首页</a-breadcrumb-item
      >
      <a-breadcrumb-item href="">权限管理</a-breadcrumb-item>
      <a-breadcrumb-item href="">角色列表</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <a-table
        :rowKey="(record) => record.id"
        :columns="RolesColumns"
        :data-source="RolesData"
        :pagination="false"
        childrenColumnName="asd"
        bordered
      >
        <template #index="{ index }">
          {{ index + 1 }}
        </template>

        <!-- 额外的展开行 -->
        <template #expandedRowRender="{ record }">
         <!-- 一级渲染 -->
          <a-row :class="['bdbottom' , 'vcenter' , index1 == 0 ? 'bdtop' : ''] " v-for="(item1,index1) in record.children" :key="item1.id">
            <a-col :span="5">
              <a-tag
                color="blue"
                closable
                style="padding: 7px 14px"
                @close="handleClose(item1.id)"
              >
                {{ item1.authName }}</a-tag
              >
              <CaretRightOutlined />
            </a-col>
            <!-- 二三级渲染 -->
            <a-col :span="19">
              <!-- 二级渲染   -->
              <a-row :class="['bdbottom','vcenter']" v-for="item2 in item1.children" :key="item2.id">
                <a-col :span="6">
                  <a-tag
                    color="green"
                    closable
                    style="padding: 7px 14px"
                    @close="handleClose(item2.id)"
                  >
                    {{ item2.authName }}</a-tag
                  >
                </a-col>
                <!-- 三级渲染 -->
                <a-col :span="18">
                    <a-tag
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    color="orange"
                    closable
                    style="padding: 7px 14px"
                    @close="handleClose(item3.id)"
                  >
                    {{ item3.authName }}</a-tag
                  >
                </a-col>
                <!-- 三级渲染 end -->
              </a-row>
              <!-- 二级渲染 -->
            </a-col>
            <!-- 二三级渲染 end -->
          </a-row>
          <!-- 一级渲染 end -->
        </template>

        <template #operation>
          <!-- 编辑 -->
          <a-button
            type="primary"
            class="operation_button"
            style="background-color: #409eff; color: #fff"
            ><EditOutlined /> 编辑</a-button
          >
          <!-- 编辑 end -->

          <!-- 删除 -->
          <a-button
            type="danger"
            class="operation_button"
            style="background-color: #f56c6c; color: #fff"
            ><DeleteOutlined /> 删除</a-button
          >
          <!-- 删除 end -->

          <!-- 分配权限 -->
          <a-button
            class="operation_button"
            style="background-color: #e6a23c; color: #fff"
            ><SettingOutlined /> 分配权限</a-button
          >
          <!-- 分配权限 end -->
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
//导入 请求接口
import { role } from "../api/index";
import { httpGet } from "../utils/http";

//导入图标
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  CaretRightOutlined,
} from "@ant-design/icons-vue";

export default {
  name: "Roles",
  data() {
    return {
      RolesColumns: [
        {
          title: "#",
          key: "index",
          slots: { customRender: "index" },
        },
        {
          title: "角色名称",
          dataIndex: "roleName",
        },
        {
          title: "角色描述",
          dataIndex: "roleDesc",
        },
        {
          title: "操作",
          key: "operation",
          slots: { customRender: "operation" },
        },
      ],
      RolesData: [],
    };
  },

  created() {
    this.showRoles();
  },

  methods: {
    //显示角色列表
    async showRoles() {
      //获取请求地址
      let url = role.GetRoles;

      //发起请求 获取角色列表
      let results = await httpGet(url);

      //判断相应状态码
      if (results.meta.status == 200) {
        this.RolesData = results.data;
      }
    },

    //删除角色指定权限
    async handleClose(){
      //获取请求地址
    }
  },

  components: {
    EditOutlined,
    DeleteOutlined,
    SettingOutlined,
    CaretRightOutlined,
  },
};
</script>

<style>
.operation_button {
  margin-right: 10px;
}

/* 设置标签间距 */
.ant-tag {
  padding: 2px 14px;
  font-size: 14px;
}

.ant-tag {
  margin: 7px;
}

/* 设置标签居中和边框 */
.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>