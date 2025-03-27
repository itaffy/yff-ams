<template>
  <page-header-wrapper :title="false">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="ID"
        :columns="columns"
        :data="loadData"
        :alert="false"
        :showPagination="false"
        defaultExpandAllRows
      >
        <span slot="action" slot-scope="text, record">
          <template>
            <a href="javascript:;"  @click="editItem(record, 'edit')">修改</a>
            <a-divider type="vertical" />
            <a href="javascript:;"  @click="editItem(record,'child')">新建子级</a>
            <span v-if="record.ParentID !== 0">
              <a-divider  type="vertical" />
              <a href="javascript:;"  @click="editItem(record,'some')">新建同级</a>
              <a-divider  type="vertical" />
              <a href="javascript:;" style="color:#f5222d" @click="deleteItem(record)">删除</a>
            </span>
          </template>
        </span>
      </s-table>
    </a-card>

    <a-modal
      title="新建区域"
      :width="640"
      :visible.sync="visible"
      :confirmLoading="confirmLoading"
      @ok="okHandle"
      @cancel="cancelHandle"
    >
      <a-spin :spinning="confirmLoading">
        <a-form-model 
          ref="form" 
          :model="form" 
          :rules="rules" 
          :label-col="labelCol" 
          :wrapper-col="wrapperCol" 
        >
          <a-form-model-item label="所属区域" prop="parentId">
            <a-tree-select
              v-model="form.parentId"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="treeData"
              placeholder="请选择"
              :disabled="disabledParent"
              tree-default-expand-all
              :replaceFields="treeSelectFields"
            >
              <span  slot="Name" slot-scope="{ Name }">
                {{ Name }}
              </span>
            </a-tree-select>
          </a-form-model-item>
          <a-form-model-item label="区域名称" prop="areaName">
            <a-input v-model="form.areaName" placeholder="请输入"/>
          </a-form-model-item>
          <a-form-model-item label="备注">
            <a-input v-model="form.explan" placeholder="请输入" />
          </a-form-model-item>
        </a-form-model>
      </a-spin>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import {getAreaList, addArea,} from '@/api/dossier'
import {listToTree} from '@/utils/util'
import cloneDeep from 'lodash.clonedeep'


export default {
  components: {
    STable
  },
  data(){
    return {
      queryParam: {
        name: ''
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
        return getAreaList(requestParameters)
          .then(res => {
            const data = listToTree(cloneDeep(res.data))
            this.treeData = data
            return {Data: data}
          })
      },
      columns: [
        {
          title: '区域名称',
          dataIndex: 'Name'
        },
        {
          title: '添加时间',
          dataIndex: 'AddTime'
        },
        {
          title: '备注',
          dataIndex: 'Explan'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '280px',
          scopedSlots: { customRender: 'action' }
        },
      ],
      expandedRowKeys: [],
      visible: false,
      confirmLoading: false,
      form: {
        id: 0,
        parentId: '',
        areaName: '',
        explan: ''
      },
      rules: {
        areaName: [{required: true, message: '区域名称不能为空', trigger: 'blur' }],
        parentId: [{required: true, message: '所属区域不能为空', trigger: 'change' }],
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      treeData:[],
      treeSelectFields: {
        children: 'children',
        title: 'Name',
        key: 'ID',
        value: 'ID'
      },
      disabledParent: false
    }
  },
  methods: {
    getAreaList(params) {
      getAreaList(params).then(res => {
        const data = listToTree(cloneDeep(res.data))
        this.treeData = data
      })
    },
    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    okHandle(){
      this.confirmLoading = true
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('form submit', this.form)
          this.confirmLoading = false
          if (this.form.id) {
            updateArea(this.form).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              this.$refs.form.resetFields()
              this.$refs.table.refresh(true)
              this.$message.success(res.msg)
            })
          } else {
            addArea(this.form).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              this.$refs.form.resetFields()
              this.$refs.table.refresh(true)
              this.$message.success(res.msg)
            })
          }
        } else {
          console.log('error submit!!')
          this.confirmLoading = false
          return false
        }
      })
    },
    cancelHandle(){
      this.visible = false
      this.$refs.form.resetFields()
    },
    editItem(row, flag) {
      console.log('row', row)
      this.visible = true
      if (flag === 'edit') {
        this.form = {
          id: row.ID,
          parentId: row.ParentID,
          areaName: row.Name,
          explan: row.Explan
        }
        this.disabledParent = this.form.parentId === 0
        this.getAreaList({disableAreaId: row.ID})
      } else if (flag === 'some') {
        this.form.id = ''
        this.form.parentId = row.ParentID
        this.form.areaName = ''
        this.form.explan = ''
        this.disabledParent = true
      } else if (flag === 'child') {
        this.form.id = ''
        this.form.areaName = ''
        this.form.explan = ''
        this.form.parentId = row.ID
        this.disabledParent = true
      }
    }
  }
}
</script>

<style></style>