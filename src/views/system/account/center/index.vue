<template>
  <page-header-wrapper :title="false">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="true"
        showPagination="auto"
      >
        <!-- <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span> -->
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">配置</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)">订阅报警</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import {getOrderRecord} from '@/api/system'

export default {
  components: {
    STable
  },
  data () {
    return {
      mdl: null,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({order: true}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getOrderRecord(requestParameters)
          .then(res => {
            console.log('res========', res)
            return res.result
          })
      },
      columns: [],

    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
   
  }
}
</script>

<style lang="less" scoped>

</style>
