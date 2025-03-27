<template>
  <a-card 
    class="area-tree-box" 
    :loading="loading"
    :bordered="false" 
    size="small" 
    title="区域信息"
    :headStyle="{padding: '8px 12px'}">
    <div class="tree-main">
      <a-input-search style="margin-bottom: 8px" placeholder="Search"  />
      <a-tree
        :tree-data="treeData"
        :replace-fields="replaceFields"
        :defaultExpandedKeys="defaultExpandedKeys"
        :defaultSelectedKeys="defaultSelectedKeys"
      >
        <!-- <template slot="title" slot-scope="{ title }">
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span style="color: #f50">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }}</span>
        </template> -->
      </a-tree>
    </div>
  </a-card>
</template>

<script>
import { getAreaRoomTree } from '@/api/home'

export default {
  data(){
    return {
      loading: false,
      searchValue: '',
      treeData: [],
      defaultExpandedKeys: [],
      defaultSelectedKeys: [],
      replaceFields: {
        children: 'children',
        title: 'name',
        key: 'id'
      }
    }
  },
  created(){
    this.getAreaRoomTree()
  },
  methods: {
    getAreaRoomTree(){
      this.loading = true
      getAreaRoomTree().then(res => {
        if (res.success && res.data) {
          const data = this.handleTreeData(res.data)
          console.log('area tree', data)
          this.treeData = data
          data.length && this.defaultExpandedKeys.push(data[0].id)
          data.length && this.defaultSelectedKeys.push(data[0].id)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    handleTreeData(data, id = 0) {
      const that = this
      const tree = []
      let temp
      for (let i = 0; i < data.length; i++) {
        if (data[i].pId === id) {
          const obj = data[i]
          temp = that.handleTreeData(data, data[i].id)
          if (temp.length > 0) {
            obj.children = temp
          }
          tree.push(obj)
        }
      }
      return tree
    },
    // onExpand(expandedKeys) {
    //   this.expandedKeys = expandedKeys
    //   this.autoExpandParent = false
    // },
    // onChange(e) {
    //   const value = e.target.value
    //   const expandedKeys = dataList
    //     .map(item => {
    //       if (item.title.indexOf(value) > -1) {
    //         return getParentKey(item.key, gData)
    //       }
    //       return null
    //     })
    //     .filter((item, i, self) => item && self.indexOf(item) === i)
    //   Object.assign(this, {
    //     expandedKeys,
    //     searchValue: value,
    //     autoExpandParent: true,
    //   })
    // },
  }
}
</script>

<style lang="less" scoped>
.area-tree-box {
  margin-right: 15px;
  width: 200px;
  height: 100%;
}

</style>
<style>
.tree-main {
  height: calc(100vh - 220px);
  overflow:auto;
}
</style>