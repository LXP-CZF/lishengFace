<template>
    <div class="component">
    <vueheader></vueheader>
      <div class="home">
        <div style="float:left;">
        <vueaside></vueaside>
        </div>
        <div style="overflow:hidden;"> 
        <tagsView></tagsView>
       <vuemain></vuemain>
       </div>
      </div>
      <!-- <el-container>
          <div style="float:left;">
        <vueaside></vueaside>
        </div>
        <div style="overflow:hidden;"> 
        <vuemain></vuemain>
        </div>
      </el-container> -->

    </div>
</template>

<script>
  import vueaside from '@/views/layout/sidebar/aside'
  import vueheader from '@/views/layout/header'
  import tagsView from '@/views/layout/TagsView'
  import vuemain from '@/views/layout/AppMain'
	export default{
    components:{
          vueaside,
          vueheader,
          vuemain,
          tagsView
	    },
		data(){
			return{
			
			}
    },
     mounted(){
     

   },
		methods:{
     
		},
		computed: {

		},
	

	}
	
</script>

<style scoped>
.component{width: 100%;}
.home{width: 100%;min-height: 570px;height: auto;}
</style>
