<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import swiper from "swiper";
export default {
  name: "CarouselPart",
  props: ["list"],
  watch: {
    list:{
      //watch监听不到list，因为从开始list从home中传来就没有变化过
      //立即监听：不管数据有没有变化，我上来立即监听一次
      immediate: true,
      handler() {
        console.log("我在监听Floor组件中的list数据");
        //只能监听到数据已经有了，但不确定v-for动态渲染是否执行完毕，因此还是需要nextTick
        this.$nextTick(() => {
          var mySwiper = new swiper(this.$refs.floor1Swiper, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //点击小球的时候也切换图片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>