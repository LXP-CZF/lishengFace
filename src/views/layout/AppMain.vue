<template>
<el-main>
  <breadcrumb></breadcrumb>
  <section class="app-main">
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
  </section>
</el-main>
</template>

<script>
import breadcrumb from '@/components/nx-breadcrumb'
export default{
    components:{
			breadcrumb
		},
		data(){
			return{
			
			}
    },
     mounted(){
      this.getHeight();
      // 数据首次加载完后 → 获取宽度，并设置其高度
    this.$nextTick(() => {
      this.getHeight();
    })
    // 挂载 reisze 事件 → 屏幕缩放时监听宽度变化
    window.onresize = () => {
        return (() => {
            this.$nextTick(() => {
              this.getHeight();
            })
        })()
    }

   },
		methods:{
      getHeight(){
        setTimeout(()=>{
          var h=document.documentElement.clientHeight;//可见区域高度
          document.querySelector('.el-main').style.height=h-60+'px';
       },200)
      }
		},
		computed: {

		},
	

	}

</script>
<style>
.el-main{padding: 0px !important;margin:0 auto;width: 100%;overflow-x: hidden}
.app-main{width: 100%;overflow-x: hidden;    margin: 20px 1% 10px 1.5%;}
</style>

