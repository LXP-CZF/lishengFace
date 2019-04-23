<template>
	<section>
		<!--工具条-->
		<el-row>
		<el-col :span="24">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
						<span>查询</span>
				</div>
        	<el-form :inline="true" :model="filters" ref="filters">
				<el-form-item :label="type_name" prop="name">
					<el-input v-model="filters.name" placeholder="请输入"></el-input>
				</el-form-item>
					<el-form-item :label="identification" prop="name">
					<el-input v-model="filters.name" placeholder="请输入"></el-input>
				</el-form-item>
                <el-form-item :label="code" prop="name">
					<el-input v-model="filters.name" placeholder="请输入"></el-input>
				</el-form-item>
				<!-- <el-form-item :label="statue" prop="value">
					<el-select v-model="filters.value" placeholder="请选择" >
						<el-option label="启用" value="suc" ></el-option>
						<el-option label="停用" value="error"></el-option>
					</el-select>
			  </el-form-item> -->
        <br/>
				<el-form-item>
					<el-button type="primary" size="small" icon="el-icon-search" v-on:click="getUsers">查询</el-button>
					<el-button  size="small" icon="el-icon-delete" v-on:click="resetForm('filters')">重置</el-button>
				</el-form-item>
			</el-form>
			</el-card>
		
		</el-col>
		<!-- button -->
    <el-col :span="24" class="btns">
     <el-button type="success" size="mini" icon="el-icon-edit" @click="handleAdd">新增接口</el-button>
	 <el-button type="danger" size="mini" icon="el-icon-delete" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
		</el-col>
		<!--列表-->
		<h3>{{title}}</h3>
		<el-table size="small" :data="users" class="tb-users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" @row-click="handleCurrentChange1" :default-sort = "{prop: 'birth', order: 'descending'}" style="width: 97%; margin-top: 7px;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index"  width="60">
			</el-table-column>
			<el-table-column prop="name" :label="type_name" width="130">
			  <template scope="scope">
						<el-input size="small" v-model="scope.row.name" placeholder="请输入内容" @change="handleEdit1(scope.$index, scope.row)"></el-input> <span>{{scope.row.name}}</span>
				</template>
			</el-table-column>
            <el-table-column prop="name" :label="identification" width="130" >

			</el-table-column>
            <el-table-column prop="name" :label="code" width="130" >
			</el-table-column>
            <el-table-column prop="addr" :label="remark" width="220">
			</el-table-column>
			<el-table-column prop="sex" :label="statue" width="130" :formatter="formatSex">
			</el-table-column>
             
			<el-table-column label="操作" >
				<template scope="scope">
          <el-button type="success" size="mini" @click="handleSelect(scope.$index, scope.row)">查看</el-button>
					<el-button type="warning" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
				<el-form-item :label="type_name" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item :label="remark">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
                <el-form-item :label="identification">
					<el-select v-model="editForm.name">
						<el-option label="HTcompare" value="HTcompare" active></el-option>
						<el-option label="ocr" value="ocr"></el-option>
					</el-select>
				</el-form-item>
                <el-form-item :label="code">
					<el-select v-model="editForm.name" placeholder="请选择" >
						<el-option label="HTcompare001" value="HTcompare001" ></el-option>
						<el-option label="ocr001" value="ocr001"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

      <el-dialog title="查看" :visible.syn="selectFormVisible" @close="selectFormVisible=false" >
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item :label="type_name" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item :label="remark">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
                <el-form-item :label="identification">
					<el-select v-model="editForm.name">
						<el-option label="HTcompare" value="HTcompare" active></el-option>
						<el-option label="ocr" value="ocr"></el-option>
					</el-select>
				</el-form-item>
                <el-form-item :label="code">
					<el-select  v-model="editForm.name" placeholder="请选择" >
						<el-option label="HTcompare001" value="HTcompare001" ></el-option>
						<el-option label="ocr001" value="ocr001"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!--新增界面-->
		<el-dialog title="新增" :visible.syn="addFormVisible" @close="addFormVisible=false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item :label="type_name" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="描述">
					<el-input  auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item :label="identification" prop="value">
					<el-select v-model="filters.value" placeholder="请选择" >
						<el-option label="HTcompare" value="HTcompare" ></el-option>
						<el-option label="ocr" value="ocr"></el-option>
					</el-select>
			  </el-form-item>
              <el-form-item :label="code" prop="value1">
					<el-select v-model="filters.value1"  placeholder="请选择" >
						<el-option label="HTcompare001" value="HTcompare001" ></el-option>
						<el-option label="ocr001" value="ocr001"></el-option>
					</el-select>
			  </el-form-item>
                <el-form-item :label="statue">
					<el-radio-group v-model="editForm.sex">
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
				
		</el-row>
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
                type_name:'接口名称',
                statue:'状态',
                identification:'标识',
                code:'代码',
                 remark:'备注',
                title:'接口管理列表',
				users: [],
				total: 0,
				page: 1,
				pagesize:20,
				listLoading: false,
				downloadLoading:false,
				sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                selectFormVisible:false,
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
		 handleCurrentChange1(row, event, column) {
                console.log(row, event, column, event.currentTarget)
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
			 handleEdit1(index, row) {
                console.log(index, row);
            },
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
            },
            //显示查看页面
            handleSelect: function (index, row) {
				this.selectFormVisible = true;
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
.btns{margin: 20px 2% 15px 2%; text-align: left !important;}
h3{margin: 20px 2% 10px 2%;}

.tb-users .el-input {
    display: none
}
.tb-users .current-row .el-input {
    display: block
}
.tb-users .current-row .el-input+span {
    display: none
}
</style>