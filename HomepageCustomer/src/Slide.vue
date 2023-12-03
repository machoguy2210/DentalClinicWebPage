<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { defineComponent } from 'vue';

export default defineComponent( {
  components: {
    Splide,
    SplideSlide,
  },

  setup() {
    const options = {
      rewind: true,
      gap   : '1rem',
    };

    return { options };
  },
} );
</script>
<template>
    <div class="slider-box">
        <div class="slider-content">
          <Splide :options="options">
          <SplideSlide style="width: 80rem; height: 60rem;">
            <img src="../public/imagins/mt.png" class="w-full h-full">
          </SplideSlide>
          <SplideSlide class="w-60rem h-40rem">
            <img src="../public/imagins/mt1.png" class="w-full h-full">
          </SplideSlide>
          </Splide>
        </div>
    </div>
</template>
<style scoped>
.slider-box{
  position: relative;
}
.slider-content{
  position: relative;
  z-index: 2;
}
</style>