<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{margin:0px !important; }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  margin:0px;
  background: #e6e3e3;
}
.el-form--inline .el-form-item {
    margin-right: 40px;
}
.el-card__header {
    padding: 8px !important;
    text-align: left !important;
}
.el-card__body {
    padding: 20px 10px 0px 10px !important;
}
/* .el-table td, .el-table th {padding: 0px !important;}
.el-table td div {
    font-size: 12px !important;
} */
.is-disabled{   
   background-color: #ffffff;
    border-color: #e4e7ed;
    color: #2e3033;
    cursor: not-allowed;}
</style>
