<template>
    <!--头部-->
	<el-header>
    <el-row>
      <el-col :xs="6" :sm="3" :md="3" :lg="2" :xl="2" class="logo">
		    <router-link to="/" style="text-decoration: none"><img src="../../assets/logo.png" style="height: 45px;  padding-top: 6px;" /></router-link>
      </el-col>
      <el-col :sm="5" :md="4" :lg="3" :xl="3" class="hidden-xs-only" style="padding-left: 30px; height:56px">
        <router-link to="/"><h3>能力集成平台</h3></router-link>
      </el-col>
      <el-col :span="1" style=" padding-top: 20px;">
            <nxhamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></nxhamburger>
      </el-col>
      <el-col  :xs="17" :sm="15" :md="16" :lg="18" :xl="18" style="padding-top: 20px; text-align: right;">
        <el-dropdown trigger="hover">
					
					<span class="el-dropdown-link userinfo-inner"><span>欢迎您!&nbsp;&nbsp;</span>{{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
		</el-dropdown>
      </el-col>
    </el-row>
	</el-header>
	
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
	import nxhamburger from '@/components/nx-hamburger'
	import {getToken,removeToken} from '@/utils/auth'
	export default{
		data(){
			return{
				sysUserName: 'admin',
				sysUserAvatar: '',
			}
		},
		
		computed: {
			...mapGetters(['sidebar'])
		},
		/*methods:mapActions([
			'menu_toggle',
			'changeColor'
		]),*/
		methods:{
	
		//退出登录
			logout () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
//					sessionStorage.removeItem('user');
          removeToken('token'); 
					_this.$router.push('/');
				}).catch(() => {

				});
			},
			toggleSideBar() {
				this.$store.dispatch('toggleSideBar')
			},
		},
	    components:{
	      nxhamburger
	    }

	}
	
</script>

<style scoped>
.el-header {
    background:#46a5f9;
    color: #000;
    text-align: left;
    /* line-height: 60px; */
    width: 100%;
/*	position: fixed;top: 0px;
	z-index:100;*/
    }
  h3{color: #ffffff;}
  a{text-decoration: none;}
  
  .el-row{height: 60px !important;}
.el-dropdown-link{
  color: #fff;font-size: 16px}
  .userinfo-inner {
					cursor: pointer;
					color:#fff;
					
				}
.userinfo-inner	img {
			width: 40px;
			height: 40px;
			border-radius: 20px;
			margin: 10px 0px 10px 10px;
			float: right;
		}
</style>
