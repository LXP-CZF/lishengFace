<template>
<el-main :style="{height:isminHeight-60+'px'}">
  <breadcrumb></breadcrumb>
  <section class="app-main" >
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
  </section>
</el-main>
</template>

<script>
import breadcrumb from '@/components/nx-breadcrumb'
import {mapGetters,mapActions} from 'vuex'
export default{
    components:{
			breadcrumb
		},
		data(){
			return{
			
			}
    },
    mounted(){
      this.sidebar.minheight=document.documentElement.clientHeight;
       this.$nextTick(() => {
        this.sidebar.minheight=document.documentElement.clientHeight;
      })
    // 挂载 reisze 事件 → 屏幕缩放时监听宽度变化
    window.onresize = () => {
        return (() => {
           this.sidebar.minheight=document.documentElement.clientHeight;
        })()
    }

   },
		methods:{
     
		},
		computed: {
      ...mapGetters(['sidebar']),
      isminHeight(){
        return this.sidebar.minheight
      }
		},
	

	}

</script>
<style>
.el-main{padding: 0px !important;margin:0 auto;width: 100%;overflow-x: hidden}
.app-main{width: 100%;overflow-x: hidden;    margin: 20px 1% 10px 1.5%;}
</style>

