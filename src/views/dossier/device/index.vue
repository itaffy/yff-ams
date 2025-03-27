<template>
  <page-header-wrapper :title="false">
    <div class="content">
      <area-tree></area-tree>
      <div style="flex:1">
        <a-card 
          :body-style="{padding: '20px 24px'}" 
          :bordered="false" 
          :tab-list="tabList" 
          :active-tab-key="activeTabKey"
          size="small"
          @tabChange="key => onTabChange(key)">
          <p v-if="activeTabKey === 'concentrator'">
            concentrator content
          </p>
          <p v-if="activeTabKey === 'collector'">
            collector content
          </p>
          <p v-if="activeTabKey === 'electMeter'">
            electMeter content
          </p>
          <p v-if="activeTabKey === 'waterMeter'">
            waterMeter content
          </p>
          <p v-if="activeTabKey === 'liquidMeter'">
            liquidMeter content
          </p>
          <p v-if="activeTabKey === 'room'">
            room content
          </p>
          <p v-if="activeTabKey === 'owner'">
            owner content
          </p>
        </a-card>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
import AreaTree from '@/components/AreaTree'

export default {
  components: {
    AreaTree
  },
  data(){
    return {
      tabList: [
        {
          key: 'concentrator',
          tab: '集中器',
        },
        {
          key: 'collector',
          tab: '采集器',
        },
        {
          key: 'electMeter',
          tab: '电表',
        },
        {
          key: 'waterMeter',
          tab: '水表',
        },
        {
          key: 'liquidMeter',
          tab: '流体表',
        },
        {
          key: 'room',
          tab: '房间',
        },
        {
          key: 'owner',
          tab: '业主',
        },
      ],
      activeTabKey: 'concentrator'
    }
  },
  methods: {
    onTabChange(key) {
      this.activeTabKey = key
    },
  },
}
</script>

<style scoped lang="less">
.content {
  display: flex;
  
  
}
</style>