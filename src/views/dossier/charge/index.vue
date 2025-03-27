<template>
  <page-header-wrapper :title="false">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <div class="charge-item" v-for="(item, index) in chargeTypeList" :key="index">
        <div class="table-operator">
          <span 
            class="charge-scheme-title"
            ><a-button type="primary" shape="circle" icon="pound" size="small" />设置{{ item.Name }}</span
          >
          <a-button type="primary" icon="plus">新建</a-button>
        </div>
        <s-table
          ref="table"
          size="middle"
          rowKey="ID"
          bordered
          tableLayout="auto"
          :columns="item.column"
          :data="item.loadData"
          :alert="false"
          :showPagination="false"
          :scroll="item.Code === 'DF' ? {x:true,y:true} : {}"
        >
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <span slot="IsSettlement" slot-scope="text">
            <span v-if="text">预付费方式</span>
            <span v-else>后付费方式</span>
          </span>
          <span slot="meterType" slot-scope="text, record">
            <span v-if="record.IsMaxDemandKwh">最大需量电价</span>
            <span v-else-if="!record.IsLadder && !record.IsLadderPrice">复费率单价</span>
            <span v-else-if="record.IsLadder && record.IsLadderPrice">阶梯电价</span>
            <span v-else-if="record.IsLadder && !record.IsLadderPrice">单费率单价</span>
            <span v-else>-</span>
          </span>
          <span slot="IsLadder" slot-scope="text, record">
            <span v-if="!text && !record.IsLadderPrice">是</span>
            <span v-else>否</span>
          </span>
          <span slot="IsLadderPrice" slot-scope="text">
            <span :class="text ? 'text_success' : 'text_danger'">{{
              text ? '是' : '否'
            }}</span>
          </span>
          <span slot="unitPrice" slot-scope="text, record">
            <span v-if="record.IsMaxDemandKwh">
              {{ record.TB_sysScheme && record.TB_sysScheme.length && record.TB_sysScheme[0].Price }}
            </span>
            <span v-else-if="record.IsLadder && record.IsLadderPrice">-</span>
            <span v-else-if="!record.IsLadder && !record.IsLadderPrice">-</span>
            <span v-else>{{
              record.TB_sysScheme && record.TB_sysScheme.length && numFilter(record.TB_sysScheme[0].Price, 4)
            }}</span>
          </span>
          <span slot="maxDemand" slot-scope="text, record">
            <span v-if="record.IsMaxDemandKwh">
              {{ record.TB_sysScheme && record.TB_sysScheme.length && record.TB_sysScheme[0].ConditionKwh }}
            </span>
            <span v-else>-</span>
          </span>
          <span slot="m1" slot-scope="text, record">
            <span v-if="!record.IsMaxDemandKwh && !record.IsLadder && !record.IsLadderPrice && record.RateNumber > 0">{{
              record.TB_sysScheme && record.TB_sysScheme.length && numFilter(record.TB_sysScheme[0].Price, 4)
            }}</span>
            <span v-else>-</span>
          </span>
          <span slot="m2" slot-scope="text, record">
            <span v-if="!record.IsMaxDemandKwh && !record.IsLadder && !record.IsLadderPrice && record.RateNumber > 1">{{
              record.TB_sysScheme && record.TB_sysScheme.length && numFilter(record.TB_sysScheme[1].Price, 4)
            }}</span>
            <span v-else>-</span>
          </span>
          <span slot="m3" slot-scope="text, record">
            <span v-if="!record.IsMaxDemandKwh && !record.IsLadder && !record.IsLadderPrice && record.RateNumber > 2">{{
              record.TB_sysScheme && record.TB_sysScheme.length && numFilter(record.TB_sysScheme[2].Price, 4)
            }}</span>
            <span v-else>-</span>
          </span>
          <span slot="m4" slot-scope="text, record">
            <span v-if="!record.IsMaxDemandKwh && !record.IsLadder && !record.IsLadderPrice && record.RateNumber > 3">{{
              record.TB_sysScheme && record.TB_sysScheme.length && numFilter(record.TB_sysScheme[3].Price, 4)
            }}</span>
            <span v-else>-</span>
          </span>
          <span slot="m5" slot-scope="text, record">
            <span v-if="!record.IsMaxDemandKwh && !record.IsLadder && !record.IsLadderPrice && record.RateNumber > 4">{{
              record.TB_sysScheme && record.TB_sysScheme.length && numFilter(record.TB_sysScheme[4].Price, 4)
            }}</span>
            <span v-else>-</span>
          </span>
          <span slot="m6" slot-scope="text, record">
            <span v-if="!record.IsMaxDemandKwh && !record.IsLadder && !record.IsLadderPrice && record.RateNumber > 5">{{
              record.TB_sysScheme && record.TB_sysScheme.length && numFilter(record.TB_sysScheme[5].Price, 4)
            }}</span>
            <span v-else>-</span>
          </span>
          <span slot="m7" slot-scope="text, record">
            <span v-if="!record.IsMaxDemandKwh && !record.IsLadder && !record.IsLadderPrice && record.RateNumber > 6">{{
              record.TB_sysScheme && record.TB_sysScheme.length && numFilter(record.TB_sysScheme[6].Price, 4)
            }}</span>
            <span v-else>-</span>
          </span>
          <span slot="m8" slot-scope="text, record">
            <span v-if="!record.IsMaxDemandKwh && !record.IsLadder && !record.IsLadderPrice && record.RateNumber > 7">{{
              record.TB_sysScheme && record.TB_sysScheme.length && numFilter(record.TB_sysScheme[7].Price, 4)
            }}</span>
            <span v-else>-</span>
          </span>
          <span slot="l1" slot-scope="text, record">
            <span v-if="!record.IsMaxDemandKwh && record.IsLadder && record.IsLadderPrice && record.RateNumber > 0">{{
              record.TB_sysScheme && record.TB_sysScheme.length && numFilter(record.TB_sysScheme[0].Price, 4)
            }}</span>
            <span v-else>-</span>
          </span>
          <span slot="l2" slot-scope="text, record">
            <span v-if="!record.IsMaxDemandKwh && record.IsLadder && record.IsLadderPrice && record.RateNumber > 1">{{
              record.TB_sysScheme && record.TB_sysScheme.length && numFilter(record.TB_sysScheme[1].Price, 4)
            }}</span>
            <span v-else>-</span>
          </span>
          <span slot="l3" slot-scope="text, record">
            <span v-if="!record.IsMaxDemandKwh && record.IsLadder && record.IsLadderPrice && record.RateNumber > 2">{{
              record.TB_sysScheme && record.TB_sysScheme.length && numFilter(record.TB_sysScheme[2].Price, 4)
            }}</span>
            <span v-else>-</span>
          </span>
          <span slot="l4" slot-scope="text, record">
            <span v-if="!record.IsMaxDemandKwh && record.IsLadder && record.IsLadderPrice && record.RateNumber > 3">{{
              record.TB_sysScheme && record.TB_sysScheme.length && numFilter(record.TB_sysScheme[3].Price, 4)
            }}</span>
            <span v-else>-</span>
          </span>
          <span slot="l5" slot-scope="text, record">
            <span v-if="!record.IsMaxDemandKwh && record.IsLadder && record.IsLadderPrice && record.RateNumber > 4">{{
              record.TB_sysScheme && record.TB_sysScheme.length && numFilter(record.TB_sysScheme[4].Price, 4)
            }}</span>
            <span v-else>-</span>
          </span>
          <span slot="type" slot-scope="text, record">
            <span v-if="record.ChargingMode === '自定义导入'">-</span>
            <span v-else>
              <span v-if="record.TB_sysScheme[0].Explan === null || record.TB_sysScheme[0].Explan === '元/月/m²'">按面积</span>
              <span v-else>按固定金额</span>
            </span>
          </span>
          <span slot="FeeMonths" slot-scope="text, record">
            <span v-if="record.ChargingMode === '自定义导入'">自定义导入</span>
            <span v-else-if="record.ChargingMode === '周期性'">{{
              record.CycNumber ? record.CycNumber + record.CycUnit : '每月'
            }}</span>
            <span v-else>{{ record.ChargingMode }}</span>
          </span>
          <!-- 其它费用单价 -->
          <span slot="commonUnitPrice" slot-scope="text, record">
            <span v-if="record.ChargingMode === '自定义导入'">-</span>
            <span v-else>
              <span
                v-if="record.TB_sysScheme[0].Explan === null || record.TB_sysScheme[0].Explan === '元/月/m²'"
                >{{ numFilter(record.TB_sysScheme[0].Price) + '（元/m²）' }}</span
              >
              <span v-else>{{ numFilter(record.TB_sysScheme[0].Price) + '（元）' }}</span>
            </span>
          </span>
          
          <span slot="action">
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
import { getChargeType } from '@/api/home'
import { getChargeSchemeList } from '@/api/dossier'
import { numFilter } from '@/utils/util'


export default {
  components: {
    STable,
  },
  data() {
    return {
      queryParam: {},
      chargeTypeList: [],
    }
  },
  created() {
    this.getChargeType()
  },
  methods: {
    numFilter(number, value) {
      return numFilter(number, value)
    },
    getChargeType() {
      getChargeType({
        type: 1,
      }).then((res) => {
        // this.sysChargingTypeList = JSON.parse(JSON.stringify(res.data))
        const list = res.data.map((item) => {
          return {
            column: this.filterColumn(item),
            loadData: null,
            ...item,
          }
        })
        const eleArr = list.filter(item => item.Id === 1)
        const waterArr = list.filter(item => item.Id === 2)
        const flowArr = list.filter(item => item.Id === 5)
        const water9267Arr = list.filter(item => item.Code === 'BDFKSF')
        const otherArr = list.filter(item => ![1,2,5].includes(item.Id) && item.Code !== 'BDFKSF')
        this.chargeTypeList = eleArr.concat(waterArr, flowArr,water9267Arr,otherArr)
        this.chargeTypeList.forEach((item) => {
          item.loadData = (parameter) => {
            const requestParameters = Object.assign({ sysChargingTypeId: item.Id, pageIndex: 1 }, parameter, {
              pageSize: 150,
            })
            return getChargeSchemeList(requestParameters).then((res) => {
              return res.data
            })
          }
        })
        
      })
    },
    filterColumn(scheme) {
      const list = [
        {
          title: '序号',
          width: 50,
          show: true,
          scopedSlots: { customRender: 'serial' },
        },
        {
          title: '名称',
          dataIndex: 'Name',
          width: 100,
          show: true,
        },
        {
          title: '扣费方式',
          dataIndex: 'IsSettlement',
          width: 90,
          scopedSlots: { customRender: 'IsSettlement' },
          show: scheme.Code === 'DF',
        },
        {
          title: '电价类型',
          dataIndex: 'meterType',
          width: 90,
          scopedSlots: { customRender: 'meterType' },
          show: scheme.Code === 'DF',
        },
        {
          title: scheme.Code === 'DF' ? '费率数' : '阶梯数',
          dataIndex: 'RateNumber',
          width: 60,
          show: ['DF', 'SF', 'LTF'].includes(scheme.Code),
        },
        {
          title: '是否复费率',
          dataIndex: 'IsLadder',
          width: 60,
          scopedSlots: { customRender: 'IsLadder' },
          show: scheme.Code === 'DF',
        },
        {
          title: '是否阶梯价',
          dataIndex: 'IsLadderPrice',
          width: 90,
          scopedSlots: { customRender: 'IsLadderPrice' },
          show:['SF', 'LTF'].includes(scheme.Code),
        },
        {
          title: '费率单价(元/kwh)',
          colSpan: 8,
          width:60,
          dataIndex: 'm1',
          scopedSlots: { customRender: 'm1' },
          show: scheme.Code === 'DF',
        },
        {
          colSpan: 0,
          width:60,
          dataIndex: 'm2',
          scopedSlots: { customRender: 'm2' },
          show: scheme.Code === 'DF',
        },
        {
          colSpan: 0,
          width:60,
          dataIndex: 'm3',
          scopedSlots: { customRender: 'm3' },
          show: scheme.Code === 'DF',
        },
        {
          colSpan: 0,
          width:60,
          dataIndex: 'm4',
          scopedSlots: { customRender: 'm4' },
          show: scheme.Code === 'DF',
        },
        {
          colSpan: 0,
          width:60,
          dataIndex: 'm5',
          scopedSlots: { customRender: 'm5' },
          show: scheme.Code === 'DF',
        },
        {
          colSpan: 0,
          width:60,
          dataIndex: 'm6',
          scopedSlots: { customRender: 'm6' },
          show: scheme.Code === 'DF',
        },
        {
          colSpan: 0,
          width:60,
          dataIndex: 'm7',
          scopedSlots: { customRender: 'm7' },
          show: scheme.Code === 'DF',
        },
        {
          colSpan: 0,
          width:60,
          dataIndex: 'm8',
          scopedSlots: { customRender: 'm8' },
          show: scheme.Code === 'DF',
        },
        {
          title: '阶梯单价' + (scheme.Code === 'DF' ? '(元/kwh)' : '(元/m³)'),
          colSpan: 5,
          width:60,
          dataIndex: 'l1',
          scopedSlots: { customRender: 'l1' },
          show: ['DF', 'SF', 'LTF'].includes(scheme.Code),
        },
        {
          colSpan: 0,
          width:60,
          dataIndex: 'l2',
          scopedSlots: { customRender: 'l2' },
          show: ['DF', 'SF', 'LTF'].includes(scheme.Code),
        },
        {
          colSpan: 0,
          width:60,
          dataIndex: 'l3',
          scopedSlots: { customRender: 'l3' },
          show: ['DF', 'SF', 'LTF'].includes(scheme.Code),
        },
        {
          colSpan: 0,
          width:60,
          dataIndex: 'l4',
          scopedSlots: { customRender: 'l4' },
          show: ['DF', 'SF', 'LTF'].includes(scheme.Code),
        },
        {
          colSpan: 0,
          width:60,
          dataIndex: 'l5',
          scopedSlots: { customRender: 'l5' },
          show: ['DF', 'SF', 'LTF'].includes(scheme.Code),
        },
        {
          title: scheme.Code === 'DF' ? '单费率价格(元/kwh)' :  ['SF', 'LTF'].includes(scheme.Code) ? '单价(元/m³)' : '单价',
          dataIndex: 'unitPrice',
          scopedSlots: { customRender: 'unitPrice' },
          width: 90,
          show: true,
        },
        {
          title: '最大需量价格(元/kw)',
          dataIndex: 'maxDemand',
          scopedSlots: { customRender: 'maxDemand' },
          width: 90,
          show: scheme.Code === 'DF',
        },
        
        {
          title: '创建时间',
          dataIndex: 'AddTime',
          width: 90,
          show: true,
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          fixed: 'right',
          show: true,
          scopedSlots: { customRender: 'action' },
        },
      ]
      const otherColumn = [
        {
          title: '序号',
          width: 50,
          scopedSlots: { customRender: 'serial' },
        },
        {
          title: '名称',
          width: 100,
          dataIndex: 'Name',
        },
        {
          title: '收费类型',
          dataIndex: 'type',
          width: 100,
          scopedSlots: { customRender: 'type' },
        },
        {
          title: '单价',
          width: 150,
          dataIndex: 'commonUnitPrice',
          scopedSlots: { customRender: 'commonUnitPrice' },
        },
        {
          title: '收费月',
          width: 150,
          dataIndex: 'FeeMonths',
          scopedSlots: { customRender: 'FeeMonths' },
        },
        {
          title: '创建时间',
          width: 150,
          dataIndex: 'AddTime',
        },
        {
          title: '操作',
          width: 150,
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ]
      if (['DF', 'SF', 'LTF', 'BDFKSF'].includes(scheme.Code)) {
        return list.filter((item) => item.show)
      } else {
        return otherColumn
      }
    },
  },
}
</script>

<style lang="less" scoped>
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
