<template>
	<section>
		<!--工具条-->
		<el-col :span="24">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
						<span>查询</span>
				</div>
        <el-form :inline="true" :model="filters" ref="filters">
				<el-form-item label="类型名称" prop="name">
					<el-input v-model="filters.name" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" icon="el-icon-search" @click="getUsers">查询</el-button>
					<el-button  size="small" icon="el-icon-delete" @click="resetForm('filters')">重置</el-button>
				</el-form-item>
			</el-form>
			</el-card>
		</el-col>
		<!-- button -->
    <el-col :span="24" class="btns">
     <el-button type="success" size="mini" icon="el-icon-edit" @click="handleAdd">新增</el-button>
		 <el-button type="danger" size="mini" icon="el-icon-delete">批量删除</el-button>
		</el-col>
		<!--列表-->
		<h3>{{title}}</h3>
		<el-table size="mini" :data="users" highlight-current-row v-loading="listLoading"  :default-sort = "{prop: 'id', order: 'descending'}" style="width: 97%; margin-top: 7px;">
			<el-table-column type="selection" width="100">
			</el-table-column>
			<el-table-column prop="id" label="ID号"   width="160" >
			</el-table-column>
			<el-table-column prop="name" :label="username" width="170" sortable>
			</el-table-column>
			<el-table-column prop="password" :label="password" width="230" :formatter="formatPassword">
			</el-table-column>
			<el-table-column prop="sex" :label="sex" width="130" :formatter="formatSex">
			</el-table-column>
			<el-table-column prop="state" :label="state" :formatter="formatState">
			</el-table-column> 
			<el-table-column label="操作" >
				<template scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
				<el-form-item :label="username" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				 <el-form-item :label="sex" prop="sex">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
          <el-form-item :label="password" prop="password">
					<el-input v-model="editForm.password" auto-complete="off"></el-input>
				</el-form-item>
				 <el-form-item :label="state" prop="state">
					<el-radio-group v-model="editForm.state">
						<el-radio class="radio" :label="1">登录</el-radio>
						<el-radio class="radio" :label="0">未登录</el-radio>
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
				<el-form-item :label="username" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item :label="sex" prop="sex">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
          <el-form-item :label="password" prop="password">
					<el-input v-model="addForm.password" auto-complete="off"></el-input>
				</el-form-item>
				 <el-form-item :label="state" prop="state">
					<el-radio-group v-model="addForm.state">
						<el-radio class="radio" :label="1">登录</el-radio>
						<el-radio class="radio" :label="0">未登录</el-radio>
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
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '@/api/api';
  
	export default {
		data() {
			var validateInput = (rule, value, callback) => {
				if (!this.checkSpecialKey(value)) {
					callback(new Error("不能含有特殊字符和空格！！"));
				} else {
					callback();
				}
			};
			return {
				filters: {
					ID: '',
              },
				username:'用户名',
				state:'状态',
				sex:'性别',
				password:'密码',
				title:'能力类型管理表',
				users: [],
				total: 0,
				page: 1,
				pagesize:10,
				listLoading: false,
				downloadLoading:false,
				sels: [],//列表选中列
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
					 {required: true, message: "请输入用户名", trigger: "blur" },
          {validator: validateInput, trigger: ["blur", "change"] },
          {pattern:/^[A-Za-z0-9]+$/,message: "用户名不能为中文", trigger: ["blur", "change"] },
          { min:3,max:13, message: "请输入正确的账号格式，长度3~13个字符", trigger: ["blur"]}
					],
					password: [
						{ required: true, message: "请输入密码", trigger: "blur" },
						{validator: validateInput, trigger: ["blur", "change"] },
						{pattern:/^[A-Za-z0-9]+$/,message: "密码不能为中文", trigger: ["blur", "change"] },
						{ min:5,max:13, message: "请输入正确的密码格式，长度6~13个字符", trigger: ["blur"]}
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					password: '',
					state: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{required: true, message: "请输入用户名", trigger: "blur" },
          {validator: validateInput, trigger: ["blur", "change"] },
          {pattern:/^[A-Za-z0-9]+$/,message: "用户名不能为中文", trigger: ["blur", "change"] },
          // {pattern:/^[^ ]+$/,message: "用户名不能含有空格", trigger: ["blur", "change"] },
          { min:3,max:13, message: "请输入正确的账号格式，长度3~13个字符", trigger: ["blur"]}
					],
					password: [
						{ required: true, message: "请输入密码", trigger: "blur" },
						{validator: validateInput, trigger: ["blur", "change"] },
						{pattern:/^[A-Za-z0-9]+$/,message: "密码不能为中文", trigger: ["blur", "change"] },
						// {pattern:/^[^ ]+$/,message: "密码不能含有空格", trigger: ["blur", "change"] },
						{ min:5,max:13, message: "请输入正确的密码格式，长度6~13个字符", trigger: ["blur"]}
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					password: '',
					state: '',
				}
			}
		},
		methods: {
				//校验用户名方法
			checkSpecialKey(str) {
				var specialKey = "[`~!#$^&*()=|{}':;'\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？] ‘'";
				for (var i = 0; i < str.length; i++) {
					if (specialKey.indexOf(str.substr(i, 1)) != -1) {
						return false;
					}
				}
				return true;
			},
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
				//状态显示转换
			formatState: function (row, column) {
				return row.state == 1 ? '登录' : row.sex == 0 ? '未登录' : '离线';
			},
			//密码显示转换
			formatPassword: function (row, column) {
				return row.password == null ? '未设置密码' : row.password;
			},
			//点击分页
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表,分页
			getUsers() {
				this.listLoading = true;
				this.$axios.post('/webgame/user/findAllByPage',{
					"data": {
						"name": this.filters.name
					},
					"pageNo": this.page,
					"pageSize": this.pagesize
				}).then((res) => {
					this.total = res.data.data.total;
					this.users = res.data.data.list;
					this.listLoading = false;
				}).catch(function (error) {
					this.$message({
									message: error,
									type: 'error'
								});
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let ID = row.id;
				this.$axios.delete('/webgame/user/del/'+ID).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {
           this.$message({
							message: '该用户不可删除',
							type: 'error'
						});
				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
		// 	//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					password: '',
					state: '',
				};
			},
		// 	//编辑
			editSubmit () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							// let para = Object.assign({}, this.editForm);
							let para = this.editForm;
							let ID=this.editForm.id;
						this.$axios.post('/webgame/user/update/'+ID,para).then((res) => {
								this.editLoading = false;
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
		// 	//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = this.addForm;
							// para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							this.$axios.post('/webgame/user/create',para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								if(res.data.ok===false){
										this.$message({
									message: '该用户已存在',
									type: 'error'
								});
								}else{
								this.$message({
									message: '新增成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
								}
								
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
		// 	//批量删除
		// 	batchRemove: function () {
		// 		var ids = this.sels.map(item => item.id).toString();
		// 		this.$confirm('确认删除选中记录吗？', '提示', {
		// 			type: 'warning'
		// 		}).then(() => {
		// 			this.listLoading = true;
		// 			//NProgress.start();
		// 			let para = { ids: ids };
		// 			batchRemoveUser(para).then((res) => {
		// 				this.listLoading = false;
		// 				//NProgress.done();
		// 				this.$message({
		// 					message: '删除成功',
		// 					type: 'success'
		// 				});
		// 				this.getUsers();
		// 			});
		// 		}).catch(() => {

		// 		});
		// 	},
		// handleDownload() {
	  //     this.downloadLoading = true
	  //     import('@/vendor/Export2Excel').then(excel => {
	  //       const tHeader = ['name', 'sex', 'age', 'birth', 'addr']
	  //       const filterVal = ['name', 'sex', 'age', 'birth', 'addr']
	  //       const data = this.formatJson(filterVal, this.users)
	  //       excel.export_json_to_excel({
	  //         header: tHeader,
	  //         data,
	  //         filename: 'table-list'
	  //       })
	  //       this.downloadLoading = false
	  //     })
	  //   },
	  //   formatJson(filterVal, jsonData) {
	  //     return jsonData.map(v => filterVal.map(j => {
	  //       if (j === 'timestamp') {
	  //         return parseTime(v[j])
	  //       } else {
	  //         return v[j]
	  //       }
	  //     }))
		// 	},
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
.box-card{width: 97%;min-height: 100px; height: auto; margin-top: -20px; text-align: center; border-radius: 5px;}
.pagination{background: white;margin: -6px 0px 10px 0px;text-align:center;width:97%;height: 60px;padding-top: 15px}
.btns{margin: 20px 2% 15px 2%; text-align: left !important;}
h3{margin: 20px 2% 10px 2%;}
</style>