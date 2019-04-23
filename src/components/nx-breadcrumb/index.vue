<template>
   
  <el-breadcrumb class="app-breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.name">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.name}}</span>
        <router-link v-else :to="item.redirect||item.path"> <span class="el-icon-location">当前位置：</span>{{item.name}}</router-link>
      </el-breadcrumb-item>
    </transition-group> 
  </el-breadcrumb>

</template>

<script>
export default {
  name: 'nxBreadcrumb',
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== '主页') {
        matched = [{ path: '/'}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style  lang="less" scoped>
  .app-breadcrumb.el-breadcrumb {
    width: 100%;
    height: 40px;
    background: white;
    display: inline-block;
    font-size: 14px;
    line-height: 40px;
    padding-left: 20px;
    margin: 0px;
    position: sticky;
    top:0px;
    z-index: 999;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
