<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="selectbar">
			<el-form :inline="true" :model="filters" @submit.native.prevent>
				<el-form-item>
					<el-input @keyup.enter.native="handleFilter()"  v-model="filters.crtName" placeholder="姓名或账户" style="width:115%;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" icon="el-icon-search" @click="handleFilter">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="users" border highlight-current-row v-loading="listLoading" style="width: 97%;">
           <el-table-column align="center" label="id" width="65">
            <template scope="scope">
            <span>{{scope.row.id}}</span>
                </template>
                </el-table-column>
                <el-table-column width="200px" align="center" label="菜单"><template scope="scope">
                <span>
                    {{scope.row.menu}}</span>
                </template>

                </el-table-column>
                <el-table-column width="200px" align="center" label="操作"><template scope="scope">
                <span>
                    {{scope.row.opt}}</span>
                </template>

                </el-table-column>
                <el-table-column width="200px" align="center" label="资源路径"><template scope="scope">
                <span>
                    {{scope.row.uri}}</span>
                </template>

                </el-table-column>
                <el-table-column width="200px" align="center" label="操作时间"><template scope="scope">
                <span>
                    {{scope.row.crtTime}}</span>
                </template>

                </el-table-column>
                <el-table-column width="200px" align="center" label="操作人ID"><template scope="scope">
                <span>
                    {{scope.row.crtUser}}</span>
                </template>

                </el-table-column>
                <el-table-column width="200px" align="center" label="操作人"><template scope="scope">
                <span>
                    {{scope.row.crtName}}</span>
                </template>

                </el-table-column>
                <el-table-column width="200px" align="center" label="操作主机"><template scope="scope">
                <span>
                    {{scope.row.crtHost}}</span>
                </template>
                </el-table-column>        
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			 <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="filters.page" :page-sizes="[10,20,30, 50]" :page-size="filters.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
		</el-col>
	</section>
</template>

<script>
	import { getDairy } from '@/api/dairy.js'
	export default {
		data() {
			return {
				
				users: [],
				total: 0,
				filters: {
					page: 1,
				    limit:10,
				 	crtName:undefined
				},
				listLoading: false,
				sels: [],//列表选中列
			}
		},
		mounted() {
			this.getUsers();
		},
		methods: {
			handleSizeChange(val) {
					this.filters.limit = val;
					this.getUsers();
			},
			handleCurrentChange(val) {
				this.filters.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
                this.listLoading=true;
				getDairy(this.filters).then((res) => {
					if(res.data.status===200){
					this.total = res.data.data.total;
                    this.users = res.data.data.rows;
                    this.listLoading = false;
					}else{
						this.$message({
							message: res.data.message,
							type: 'error'
						});
					}
				}).catch((error) => {
						this.$message({
							message: error,
							type: 'error'
						});
				});
			},
			handleFilter(){
				this.getUsers();
			},
			
		},
	
	}

</script>

<style scoped>
.el-dialog{text-align: left;}
.selectbar{
	padding-bottom: 0px; 
	text-align: left;
	margin: 0px 0px -10px 0px;
}
.toolbar{
	width:97%;
	background:#fff;
	padding:20px 30px;
	text-align: left;
}
</style>