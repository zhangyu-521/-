<template>
  <div>
    <!-- 三级联动全局组件-->
    <TypeNav></TypeNav>

    
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Runk></Runk>
    <Like></Like>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
    
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Runk from '@/pages/Home/Runk'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'
export default {
    name:'RouteHome',
    components:{
      ListContainer,
      Recommend,
      Runk,
      Like,
      Floor,
      Brand,

    },
    mounted() {
      //派发action，获取floor组件的数据
      this.$store.dispatch("getFloorList")
      // 获取用户信息，token在首页展示
     this.$store.dispatch('getUserInfo') 
    
    
    },
    computed:{
      ...mapState({
        floorList:state=>state.Home.floorList
      })
    }

}
</script>

<style>

</style>