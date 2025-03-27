<template>
  <page-header-wrapper :title="false">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <div class="charge-item">
        <div class="table-operator">
          <span class="charge-scheme-title">费用预警</span>
          <a-button type="primary" icon="plus">新建</a-button>
        </div>
        <s-table
          ref="table1"
          size="middle"
          rowKey="ID"
          bordered
          tableLayout="auto"
          :columns="column1"
          :data="loadData1"
          :alert="false"
          :showPagination="false"
          >
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <span slot="operation">
            <template>
              <a href="javascript:;">查看</a>
              <a-divider type="vertical" />
              <a href="javascript:;">修改</a>
              <a-divider type="vertical" />
              <a href="javascript:;" style="color: #f5222d">删除</a>
            </template>
          </span>
        </s-table>
      </div>
      <div class="charge-item">
        <div class="table-operator">
          <span class="charge-scheme-title">用量预警</span>
          <a-button type="primary" icon="plus">新建</a-button>
        </div>
        <s-table
          ref="table2"
          size="middle"
          rowKey="ID"
          bordered
          tableLayout="auto"
          :columns="column2"
          :data="loadData2"
          :alert="false"
          :showPagination="false">
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <span slot="MeterType" slot-scope="text">
            {{text === 1 ? '电表' : text === 2 ? '水表' : '流体表'}}
          </span>
          <span slot="Periodic" slot-scope="text">
            <span v-if="text===1">每日</span>
            <span v-else-if="text===2">每周</span>
            <span v-else-if="text===3">每月</span>
            <span v-else-if="text===4">每年</span>
            <span v-else>-</span>
          </span>
          <span slot="operation">
            <template>
              <a href="javascript:;">查看</a>
              <a-divider type="vertical" />
              <a href="javascript:;">修改</a>
              <a-divider type="vertical" />
              <a href="javascript:;" style="color: #f5222d">删除</a>
            </template>
          </span>
        </s-table>
      </div>
      <div class="charge-item">
        <div class="table-operator">
          <span class="charge-scheme-title">水表换表提醒</span>
          <a-button type="primary" icon="plus">新建</a-button>
        </div>
        <s-table
          ref="table3"
          size="middle"
          rowKey="ID"
          bordered
          tableLayout="auto"
          :columns="column3"
          :data="loadData3"
          :alert="false"
          :showPagination="false">
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <span slot="MeterType" slot-scope="text">
            <span v-if="text===1">水表</span>
            <span v-else-if="text===2">流体表</span>
            <span v-else>-</span>
          </span>
          <span slot="operation">
            <template>
              <a href="javascript:;">查看</a>
              <a-divider type="vertical" />
              <a href="javascript:;">修改</a>
              <a-divider type="vertical" />
              <a href="javascript:;" style="color: #f5222d">删除</a>
            </template>
          </span>
        </s-table>
      </div>
      <div class="charge-item">
        <div class="table-operator">
          <span class="charge-scheme-title">短信余额提醒</span>
          <a-button type="primary" icon="plus">新建</a-button>
        </div>
        <s-table
          ref="table4"
          size="middle"
          rowKey="ID"
          bordered
          tableLayout="auto"
          :columns="column4"
          :data="loadData4"
          :alert="false"
          :showPagination="false">
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <span slot="operation">
            <template>
              <a href="javascript:;">查看</a>
              <a-divider type="vertical" />
              <a href="javascript:;">修改</a>
              <a-divider type="vertical" />
              <a href="javascript:;" style="color: #f5222d">删除</a>
            </template>
          </span>
        </s-table>
      </div>
      <div class="charge-item">
        <div class="table-operator">
          <span class="charge-scheme-title">余量预警</span>
          <a-button type="primary" icon="plus">新建</a-button>
        </div>
        <s-table
          ref="table5"
          size="middle"
          rowKey="ID"
          bordered
          tableLayout="auto"
          :columns="column5"
          :data="loadData5"
          :alert="false"
          :showPagination="false">
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <span slot="MeterType" >
            水表
          </span>
          <span slot="operation">
            <template>
              <a href="javascript:;">查看</a>
              <a-divider type="vertical" />
              <a href="javascript:;">修改</a>
              <a-divider type="vertical" />
              <a href="javascript:;" style="color: #f5222d">删除</a>
            </template>
          </span>
        </s-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import {getAlarmSchemeList, getUseValueAlarmList, getWaterRemindList, getSmsBalanceWarn, getReserveAlarmList} from '@/api/dossier'

export default {
  components: {
    STable,
  },
  data(){
    return {
      queryParam: {
        pageSize:150
      },
      loadData1:parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        for (const key in requestParameters) {
          if (Object.hasOwnProperty.call(requestParameters, key)) {
            const element = requestParameters[key]
            if (element === '') {
              delete requestParameters[key]
            }
          }
        }
        return getAlarmSchemeList(requestParameters)
          .then(res => {
            return res.data
          })
      },
      column1: [
        {
          title: '序号',
          dataIndex: 'serial',
          scopedSlots: { customRender: 'serial' },
        },
        {
          title: '方案名称',
          dataIndex: 'Name',
        },
        {
          title: '报警余额(元)',
          dataIndex: 'AlarmMoney',
        },
        {
          title: '跳闸时长(分钟)',
          dataIndex: 'AlarmTime',
        },
        {
          title: '创建时间',
          dataIndex: 'AddTime',
        },
        {
          title: '备注',
          dataIndex: 'Explan',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 160
        },
      ],
      loadData2:parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        for (const key in requestParameters) {
          if (Object.hasOwnProperty.call(requestParameters, key)) {
            const element = requestParameters[key]
            if (element === '') {
              delete requestParameters[key]
            }
          }
        }
        return getUseValueAlarmList(requestParameters)
          .then(res => {
            return res.data
          })
      },
      column2: [
        {
          title: '序号',
          dataIndex: 'serial',
          scopedSlots: { customRender: 'serial' },
        },
        {
          title: '方案名称',
          dataIndex: 'Name',
        },
        {
          title: '设备类型',
          dataIndex: 'MeterType',
          scopedSlots: { customRender: 'MeterType' },
        },
        {
          title: '报警用量',
          dataIndex: 'UseValue',
        },
        {
          title: '重复周期',
          dataIndex: 'Periodic',
          scopedSlots: { customRender: 'Periodic' },
        },
        {
          title: '跳闸时长(分钟)',
          dataIndex: 'AlarmTime',
        },
        {
          title: '备注',
          dataIndex: 'Explan'
        },
        {
          title: '创建时间',
          dataIndex: 'AddTime'
        },
        {
          title: '创建人',
          dataIndex: 'AddUserName'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 160
        },
      ],
      loadData3:parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        for (const key in requestParameters) {
          if (Object.hasOwnProperty.call(requestParameters, key)) {
            const element = requestParameters[key]
            if (element === '') {
              delete requestParameters[key]
            }
          }
        }
        return getWaterRemindList(requestParameters)
          .then(res => {
            return res.data
          })
      },
      column3: [
        {
          title: '序号',
          dataIndex: 'serial',
          scopedSlots: { customRender: 'serial' },
        },
        {
          title: '方案名称',
          dataIndex: 'Name',
        },
        {
          title: '设备类型',
          dataIndex: 'MeterType',
          scopedSlots: { customRender: 'MeterType' },
        },
        {
          title: '提醒读数',
          dataIndex: 'AlarmValue',
        },
        {
          title: '备注',
          dataIndex: 'Explan'
        },
        {
          title: '创建时间',
          dataIndex: 'AddTime'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 160
        },
      ],
      loadData4:parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        for (const key in requestParameters) {
          if (Object.hasOwnProperty.call(requestParameters, key)) {
            const element = requestParameters[key]
            if (element === '') {
              delete requestParameters[key]
            }
          }
        }
        return getSmsBalanceWarn(requestParameters)
          .then(res => {
            return res.data ? res.data : { Data: [] }
          })
      },
      column4: [
        {
          title: '序号',
          dataIndex: 'serial',
          scopedSlots: { customRender: 'serial' },
        },
        {
          title: '提醒余额',
          dataIndex: 'rembalance',
        },
        {
          title: '短信接收对象',
          dataIndex: 'receiveuser',
        },
        {
          title: '创建时间',
          dataIndex: 'createtime'
        },
        {
          title: '创建人',
          dataIndex: 'createuser',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 160
        },
      ],
      loadData5:parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        for (const key in requestParameters) {
          if (Object.hasOwnProperty.call(requestParameters, key)) {
            const element = requestParameters[key]
            if (element === '') {
              delete requestParameters[key]
            }
          }
        }
        return getReserveAlarmList(requestParameters)
          .then(res => {
            return res.data
          })
      },
      column5: [
        {
          title: '序号',
          dataIndex: 'serial',
          scopedSlots: { customRender: 'serial' },
        },
        {
          title: '方案名称',
          dataIndex: 'Name',
        },
        {
          title: '设备类型',
          dataIndex: 'MeterType',
        },
        {
          title: '报警余量(m³)',
          dataIndex: 'AlarmVal'
        },
        {
          title: '囤积量(m³)',
          dataIndex: 'HoardVal',
        },
        {
          title: '可透支量(m³)',
          dataIndex: 'OverdraftVal',
        },
        {
          title: '备注',
          dataIndex: 'Explan',
        },
        {
          title: '创建时间',
          dataIndex: 'AddTime',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 160
        },
      ]
    }
  },
  created() {

  },
  methods: {
    
  }
}
</script>

<style scoped lang="less">
.charge-item {
  margin-bottom: 24px;
  .table-operator {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .charge-scheme-title {
      font-weight: 600;
      font-size: 16px;
    }
  }
}
</style>