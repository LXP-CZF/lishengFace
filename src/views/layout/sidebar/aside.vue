<template>
<!--侧边栏-->
<div>
<el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :unique-opened="true" :style="{height:isHeight-60+'px'}" background-color="#304156" text-color="#bfcbd9" active-text-color="#ffd04b"  :collapse="isCollapse" router>
 <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
    <el-submenu :index="index+''" v-if="!item.leaf">
      <template slot="title"><i :class="item.iconCls"></i><span>{{item.name}}</span></template>
      <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
    </el-submenu>
    <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
</template>
</el-menu>
</div>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	export default{
    data(){
      return{
        initHeight:''
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
			//   getclientHeight(){
      //     setTimeout(()=>{
      //       // var h=document.documentElement.clientHeight;//可见区域高度
      //       document.querySelector('.el-menu-vertical-demo').style.minHeight=this.sidebar.minheight-60+"px";
      //   },20)
        
      // }
    },
     computed:{
      activeIndex(){
        return this.$route.path
      },
      ...mapGetters(['sidebar']),
      isCollapse() {
        return !this.sidebar.opened
      },
      isHeight(){
        return this.sidebar.height
      }
    },
		
	}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    /* min-height: 400px; */
  }
.el-menu--vertical{
  left:60px !important;
  }
.el-submenu .el-menu-item {
    height: 38px !important;
    line-height: 38px !important;
    
}
.el-submenu .el-submenu__title {
    height: 50px !important;
    line-height: 50px !important;
}
.fontcolor{color: #ffffff;}
</style>
