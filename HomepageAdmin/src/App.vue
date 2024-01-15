<template>
  <div>
    <div v-if="showDefaultContent">
      <!-- Nội dung chính của ứng dụng -->
      <!-- Đặt lịch khám bệnh -->
      <div class="flex">
        <!-- Menu -->
        <Menu
          @clicked="handleClickInfo"
          @clickedCus="handleClickCus"
          @clickedStaff="handleClickStaff"
        ></Menu>

        <!-- Right -->
        <div class="relative w-full surface-hover">
          <!-- Background in Right -->
          <div class="background-custom w-full h-20rem"></div>

          <!-- Right content -->
          <div class="w-full pt-3 px-5 absolute top-0">
            <!-- Top bar -->
            <TopBar></TopBar>

            <!-- Sub menu -->
            <div class="flex flex-column gap-3">

              <!-- ChartData -->
              <Revenue />

              <AppointmentManagement/>
              
              <TradeManagement/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view v-if="!showDefaultContent"></router-view>
  </div>
</template>

<script>
import Menu from "./Menu.vue";
import TopBar from "./TopBar.vue";
import Revenue from "./Revenue.vue";
import AppointmentManagement from "./AppointmentManagement.vue";
import TradeManagement from "./TradeManagement.vue";
export default {
  components: {
    Menu,
    TopBar,
    Revenue,
    AppointmentManagement,
    TradeManagement,
  },
  data() {
    return {
      showDefaultContent: true,
      category: null,
      MANV: null,
    };
  },
  mounted() {
    var urlParams = new URLSearchParams(window.location.search);
    this.category = urlParams.get("category");
    if (this.category == 1) {
      this.MANV = urlParams.get("staff_id");
    }
    console.log(this.category, this.MANV);
  },
  methods: {
    handleClickInfo(value) {
      this.showDefaultContent = false;
    },
    handleClickCus() {
      this.showDefaultContent = false;
    },
    handleClickStaff() {
      this.showDefaultContent = false;
    },
  },
};
</script>

<style>
.background-custom {
  background: linear-gradient(rgb(100, 230, 226), #9198e5);
}
</style>
