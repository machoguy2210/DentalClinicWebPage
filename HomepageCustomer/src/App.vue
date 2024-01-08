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
        <TopBar @clickedMenuUser="handleClickMenuUser"></TopBar>
        <!-- Menu -->
        <Menu
          @clickedListApp="handleClickListApp"
          @div-Clicked="handleDivClick"
          @clicked="scrollToDoctorsSection"
          @clicked_info="scrollToInfo"
          @clicked_niengrang="handleClickNiengrang"
          @clicked_rangthammi="handleClickRangthammi"
          @clicked_rangtreem="handleClickRangtreem"
          @clicked_banggia="handleClickBanggia"
        >
        </Menu>
        <!-- Slider -->
        <div class="container">
          <div class="slider">
            <Slide></Slide>
          </div>
        </div>
        <!-- Introduction -->
        <div id="infoPhongkham">
          <Introduction></Introduction>
        </div>
        <!-- DoctorInfo -->
        <div id="doctorsSection">
          <DoctorInfo></DoctorInfo>
        </div>
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
    handleClickMenuUser() {
      this.showDefaultContent = false;
    },
    scrollToDoctorsSection() {
      // Use JavaScript to scroll to the section with id "doctorsSection"
      const doctorsSection = document.getElementById("doctorsSection");
      if (doctorsSection) {
        doctorsSection.scrollIntoView({ behavior: "smooth" });
      }
    },
    scrollToInfo() {
      // Use JavaScript to scroll to the section with id "doctorsSection"
      const infoPhongkham = document.getElementById("infoPhongkham");
      if (infoPhongkham) {
        infoPhongkham.scrollIntoView({ behavior: "smooth" });
      }
    },
    handleClickNiengrang() {
      this.showDefaultContent = false;
    },
    handleClickRangthammi() {
      this.showDefaultContent = false;
    },
    handleClickRangtreem() {
      this.showDefaultContent = false;
    },
    handleClickBanggia() {
      this.showDefaultContent = false;
    },
  },
};
</script>

<style>
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
