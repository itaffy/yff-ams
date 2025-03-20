<template>
  <page-header-wrapper :title="false">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :lg="6" :md="8" :sm="24">
              <a-form-item label="用户名称">
                <a-input v-model="queryParam.userName" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :lg="6" :md="8" :sm="24">
              <a-form-item label="手机号码">
                <a-input v-model="queryParam.userPhone" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :lg="4" :md="6" :sm="24">
              <span class="table-page-search-submitButtons" >
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="Id"
        :columns="columns"
        :data="loadData"
        :alert="false"
        showPagination="auto"
      >
         <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="State" slot-scope="text">
          <a-tag :color="!text ? 'green' :'red'">{{ !text ? '启用' : '禁用'}}</a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a href="javascript:;" @click="handleEdit(record)">修改</a>
            <a-divider type="vertical" />
            <a href="javascript:;" style="color:#f5222d" @click="delet(record)">删除</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import {getUserList} from '@/api/system'
export default {
  components: {
    STable
  },
  data(){
    return {
      mdl: null,
      // 查询参数
      queryParam: {
        userName: '',
        userPhone: ''
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        for (const key in requestParameters) {
          if (Object.hasOwnProperty.call(requestParameters, key)) {
            const element = requestParameters[key]
            if (element === '') {
              delete requestParameters[key]
            }
          }
        }
        return getUserList(requestParameters)
          .then(res => {
            return res.data
          })
      },
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '用户名称',
          dataIndex: 'UserName'
        },
        {
          title: '手机号码',
          dataIndex: 'UserPhone',
        },
        {
          title: '角色名称',
          dataIndex: 'RoleNames'
        },
        {
          title: '区域权限名称',
          dataIndex: 'PrecinctNames'
        },
        {
          title: '状态',
          dataIndex: 'State',
          scopedSlots: { customRender: 'State' }
        },
        {
          title: '添加时间',
          dataIndex: 'AddTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        },
      ],

    }
  },
}
</script>

<style lang="less" scoped>

</style>