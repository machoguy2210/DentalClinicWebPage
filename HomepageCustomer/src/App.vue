<script setup>
import TopBar from "./TopBar.vue";
import Menu from "./Menu.vue";
import Slide from "./Slide.vue";
import Associations from "./Associations.vue";
import BaseFooter from "./BaseFooter.vue";
import DatLich from "./DatLich.vue";
import DoctorInfo from "./DoctorInfo.vue";
import Introduction from "./Introduction.vue";
import ListAppointment from "./ListAppointment.vue";
</script>

<template>
  <div>
    <div v-if="showDefaultContent">
      <div>
        <!-- TopBar -->
        <TopBar></TopBar>
        <!-- Menu -->
        <Menu
          @clickedListApp="handleClickListApp"
          @div-Clicked="handleDivClick"
        >
        </Menu>
        <!-- Slider -->
        <div class="container">
          <div class="slider">
            <Slide></Slide>
          </div>
        </div>
        <!-- Introduction -->
        <Introduction></Introduction>
        <!-- DoctorInfo -->
        <DoctorInfo></DoctorInfo>
        <!-- Associations -->
        <Associations></Associations>
        <!-- DatLich -->
        <DatLich></DatLich>
        <!-- BaseFooter -->
        <BaseFooter></BaseFooter>
      </div>
    </div>
    <router-view v-if="!showDefaultContent"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showDefaultContent: true,
      MAKH: null,
    };
  },
  mounted() {
    this.getC();
  },
  methods: {
    getC() {
      var urlParams = new URLSearchParams(window.location.search);
      this.MAKH = urlParams.get("customer_id");
    },
    handleDivClick(value) {
      this.isClicked = value;
    },
    handleClickListApp() {
      this.showDefaultContent = false;
    },
  },
};
</script>

<style>
*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.container {
  align-items: center;
  width: 80rem;
  height: auto;
  margin-left: 20rem;
  margin-right: 20rem;
  margin-top: 2rem;
}
.slider {
  width: 80rem;
  height: 40rem;
}
</style>
