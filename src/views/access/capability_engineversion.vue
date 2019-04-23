<template>
	<section>
		<!--工具条-->
		<el-col :span="24">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>查询</span>
                </div>
                <el-form :inline="true" :model="filters" ref="filters">
				<el-form-item :label="units" prop="name">
					<el-input v-model="filters.name" placeholder="请输入"></el-input>
				</el-form-item>
                <el-form-item label="能力引擎" prop="value1">
					<el-select v-model="filters.value1" placeholder="请选择" >
						<el-option label="正常" value="suc" ></el-option>
      			        <el-option label="停用" value="error"></el-option>
					</el-select>
			  </el-form-item>
                <el-form-item label="能力类型" prop="value">
					<el-select v-model="filters.value" placeholder="请选择" >
						<el-option label="正常" value="suc" ></el-option>
      			        <el-option label="停用" value="error"></el-option>
					</el-select>
			  </el-form-item>
              <br/>
				<el-form-item>
					<el-button type="primary" size="small" icon="el-icon-search" v-on:click="getUsers">查询</el-button>
                    <el-button  size="small" icon="el-icon-delete" v-on:click="resetForm('filters')">重置</el-button>
				</el-form-item>
				
			
			</el-form>
            </el-card>	
            <h3>{{title}}</h3>
		</el-col>
		<!-- button -->
        
    <el-col :span="24" class="btns">
     <el-button type="success" size="mini" icon="el-icon-edit" @click="handleAdd">加载引擎</el-button>
		 <!-- <el-button type="danger" size="mini" icon="el-icon-delete" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
		</el-col>
		<!--列表-->
		
		<el-table size="mini" :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" :default-sort = "{prop: 'birth', order: 'descending'}" style="width: 97%; margin-top: 7px;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index"  width="60">
			</el-table-column>
			<el-table-column prop="name" :label="type_name" width="80">
			</el-table-column>
            <el-table-column type="index" :label="engine_version" width="80">
			</el-table-column>
            <el-table-column prop="name" :label="units" width="80">
			</el-table-column>
			<el-table-column prop="sex" :label="statue" width="80" :formatter="formatSex">
			</el-table-column>
            <el-table-column prop="sex" :label="type" width="80" :formatter="formatSex">
			</el-table-column>
			<el-table-column prop="birth" :label="start_date" width="130" sortable>
			</el-table-column>
            <el-table-column prop="name" :label="creater" width="80" >
			</el-table-column>
            <el-table-column prop="name" :label="changer" width="100" >
			</el-table-column>
			<el-table-column prop="birth" :label="end_date" width="130">
			</el-table-column>
			<el-table-column label="操作" >
				<template scope="scope">
					<el-button type="primary" plain size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<!-- <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="pagination">
			<el-pagination layout="prev, pager, next" background  @current-change="handleCurrentChange"  :page-size="pagesize" :current-page="page" :total="total">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.syn="editFormVisible" @close="editFormVisible=false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				
                <el-form-item :label="statue">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">启用</el-radio>
						<el-radio class="radio" :label="0">停用</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :visible.syn="addFormVisible" @close="addFormVisible=false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item :label="type_name" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item :label="vender">
					<el-input v-model="addForm.addr" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item :label="type">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">启用</el-radio>
						<el-radio class="radio" :label="0">停用</el-radio>
					</el-radio-group>
				</el-form-item>
                <el-form-item label="api_key">
					<el-input auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="api_secret">
					<el-input auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item :label="statue">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">启用</el-radio>
						<el-radio class="radio" :label="0">停用</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '@/common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '@/api/api';
  
	export default {
		data() {
			return {
				filters: {
					name: '',
					value1:'',
					value:'',
                },
                type_name:'引擎名称',
                engine_version:'引擎版本',
                statue:'状态',
                type:'类型',
                units:'能力单元',
                start_date:'创建日期',
                creater:'创建人',
                changer:'最后修改者',
                end_date:'最后修改日期',
                title:'能力单元管理表',
				users: [],
				total: 0,
				page: 1,
				pagesize:20,
				listLoading: false,
				downloadLoading:false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '启用' : row.sex == 0 ? '停用' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					console.log(this.users);
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '修改成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '新增成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
		handleDownload() {
	      this.downloadLoading = true
	      import('@/vendor/Export2Excel').then(excel => {
	        const tHeader = ['name', 'sex', 'age', 'birth', 'addr']
	        const filterVal = ['name', 'sex', 'age', 'birth', 'addr']
	        const data = this.formatJson(filterVal, this.users)
	        excel.export_json_to_excel({
	          header: tHeader,
	          data,
	          filename: 'table-list'
	        })
	        this.downloadLoading = false
	      })
	    },
	    formatJson(filterVal, jsonData) {
	      return jsonData.map(v => filterVal.map(j => {
	        if (j === 'timestamp') {
	          return parseTime(v[j])
	        } else {
	          return v[j]
	        }
	      }))
			},
			resetForm(formName) {
        this.$refs[formName].resetFields();
      }
		},
		mounted() {
			this.getUsers();
		},
	
	}

</script>

<style scoped>
.el-dialog{text-align: left;}
.box-card{width: 97%;min-height: 100px; height: auto; text-align: center; border-radius: 5px;}
.pagination{background: white;margin: -6px 0px 10px 0px;text-align:center;width:97%;height: 60px;padding-top: 15px}
.btns{margin: 8px 2% 8px 2%; text-align: left !important;}
h3{margin: 25px 2% 0px 2%;}
</style>