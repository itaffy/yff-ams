<template>
  <page-header-wrapper :title="false">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :lg="6" :md="8" :sm="24">
              <a-form-item label="费用名称">
                <a-input v-model="queryParam.name" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :lg="6" :md="8" :sm="24">
              <a-form-item label="收费类型">
                <a-select v-model="queryParam.changType" placeholder="请选择">
                  <a-select-option v-for="(item,index) in options" :key="index" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
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
        <span  slot="chargeType" slot-scope="text, record">
          <span v-if="record.Id < 3">余额收费</span>
          <span v-else-if="record.Code === 'BDFKSF'">充值余量</span>
          <span v-else>
            <span v-if="record.changType">余额收费(自动扣费)</span>
            <span v-else>账单收费</span>
          </span>
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
import {getChargeTypeList} from '@/api/system'
import { mapGetters } from 'vuex'

export default {
  components: {
    STable
  },
  data(){
    return {
      mdl: null,
      // 查询参数
      queryParam: {
        name: '',
        changType: ''
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
        return getChargeTypeList(requestParameters)
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
          title: '费用名称',
          dataIndex: 'Name'
        },
        {
          title: '编号',
          dataIndex: 'Code',
        },
        {
          title: '收费类型',
          dataIndex: 'changType',
          scopedSlots: { customRender: 'chargeType' }
        },
        {
          title: '备注',
          dataIndex: 'Explan',
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
  computed: {
    ...mapGetters(['userInfo', 'is9267']),
    options() {
      const list = [
        {
          label: '全部',
          value: ''
        },
        {
          label: '账单收费',
          value: '0'
        },
        {
          label: '余额收费（自动扣费）',
          value: '1'
        },
        {
          label: '充值余量',
          value: '2'
        }
      ]
      return this.is9267 ? list : list.filter(item => item.value !== '2')
    }
  }
}
</script>

<style lang="less" scoped>

</style>