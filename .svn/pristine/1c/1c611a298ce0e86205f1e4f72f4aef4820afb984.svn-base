<template>
<el-main :style="{height:isHeight-36+'px'}">
  <!-- <breadcrumb></breadcrumb> -->
  <tagsView></tagsView>
  <section class="app-main" >
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
  </section>
</el-main>
</template>

<script>
import breadcrumb from '@/components/nx-breadcrumb'
 import tagsView from '@/views/layout/TagsView'
import {mapGetters,mapActions} from 'vuex'
export default{
    components:{
      breadcrumb,
      tagsView
		},
		data(){
			return{
			
			}
    },
    mounted(){
      this.getheight();
       this.$nextTick(() => {
        this.getheight();
      })
    // 挂载 reisze 事件 → 屏幕缩放时监听宽度变化
    window.onresize = () => {
        return (() => {
           this.getheight();
        })()
    }

   },
		methods:{
     ...mapActions(['getheight'])
		},
		computed: {
      ...mapGetters(['sidebar']),
      isHeight(){
        return this.sidebar.height
      }
		},
	

	}

</script>
<style>
.el-main{padding: 0px !important;margin:0 auto;width: 100%;overflow-x: hidden !important;}
.app-main{width: 100%;overflow-x: hidden;    margin: 20px 1% 35px 1.5%;}
</style>

