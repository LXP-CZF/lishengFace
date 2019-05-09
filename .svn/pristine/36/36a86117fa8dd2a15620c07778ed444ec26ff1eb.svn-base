<template>
<div>
<el-row>
  <el-col :span="24">
    <el-button-group>
      <el-button type="primary" size="medium"  icon="el-icon-plus" @click="handlerAdd">添加</el-button>
      <el-button type="primary" size="medium" icon="el-icon-edit" @click="handlerEdit">编辑</el-button>
      <el-button type="primary" size="medium" icon="el-icon-delete" @click="handleDelete">删除</el-button>
    </el-button-group>
  </el-col>
</el-row>
  <el-row style="background:#fff;width: 97%;margin-top: 11px;padding:20px 0px 20px 0px;">
  <el-col :span="8" style='margin-left:22px'>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
    <el-tree class="filter-tree" :data="treeData" node-key="id" highlight-current :props="defaultProps" :filter-node-method="filterNode" ref="groupTree" @node-click="getNodeData" default-expand-all> </el-tree>
  </el-col>
  <el-col :span="15">
    <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
      <el-form-item label="名称">
        <el-input v-model="form.name" :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="编码">
        <el-input v-model="form.code" :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item v-if="formStatus == 'update'">
        <el-button type="primary"  @click="update">更新</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
      <el-form-item v-if="formStatus == 'create'">
        <el-button type="primary"  @click="create">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</div>
</template>

<script>
import {getTree,getNode,UpdateNode,delNode,Addrole} from '@/api/roles'
export default {
  name: 'groupDetail',
  props: {
    type: {
      default: '1'
    }
  },
  data() {
    return {
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      listQuery: {
        groupType: this.type,
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      labelPosition: 'right',
      form: {
        code: undefined,
        name: undefined,
        description: undefined,
        groupType: this.type
      },
      currentId: -1
    }
  },
  watch: {
    filterText(val) {
      this.$refs.groupTree.filter(val);
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getTree(this.listQuery).then(data => {
        this.treeData = data.data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data) {
      if (!this.formEdit) {
        this.formStatus = 'update';
      }
      getNode(data.id).then(response => {
        this.form = response.data.data;
      });
      this.currentId = data.id;
    },
    handlerEdit() {
      if (this.form.id) {
        this.formEdit = false;
        this.formStatus = 'update';
      }
    },
    handlerAdd() {
      this.resetForm();
      this.formEdit = false;
      this.formStatus = 'create';
    },
    handleDelete() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delNode(this.currentId).then(() => {
          this.getList();
          this.resetForm();
          this.onCancel();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        });
      });
    },
    update() {
      UpdateNode(this.form.id, this.form).then(() => {
        this.getList();
        this.$message({
          message: '创建成功',
          type: 'success'
        });
      });
    },
    create() {
      Addrole(this.form).then(() => {
        this.getList();
        this.$message({
          message: '创建成功',
          type: 'success'
        });
      });
    },
    onCancel() {
      this.formEdit = true;
      this.formStatus = '';
    },
    resetForm() {
      this.form = {
        parentId: this.currentId,
        code: undefined,
        name: undefined,
        description: undefined,
        groupType: this.type
      };
    },
   
  }
}
</script>
<style scoped>
   .filter-tree{
      border: 1px solid #dcdfe6;
      }
</style>

