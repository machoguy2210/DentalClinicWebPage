
<template>
  <div
    class="bg-blue-50 flex"
    style="gap: 9rem; margin-left: 10rem; margin-right: 10rem"
    @click="handleDivClick(index)"
  >
    <div id="GT">
      <div class="relative">
        <a
          href=""
          class="text-2xl no-underline hover:underline justify-content-center align-items-center"
          >Giới thiệu</a
        ><i class="pi pi-chevron-down"></i>
      </div>
      <div id="submenu" class="absolute">
        <div
          class="flex flex-column border-double border-round border-surface-500 surface-overlay w-16rem h-6rem"
        >
          <div class="h-3rem">
            <a
              href="#" @click="scrollToInfo"
              class="ml-3 align-items-center justify-content-center text-xl no-underline hover:underline"
              >Giới thiệu về phòng khám</a
            >
          </div>

          <div class="h-3rem">
            <a
              href="#" @click="scrollToDoctorsSection"
              class="ml-3 align-items-center justify-content-center text-xl no-underline hover:underline"
              >Đội ngũ bác sĩ</a
            >
          </div>
        </div>
      </div>
    </div>
    <div id="DV">
      <div class="relative">
        <a
          href=""
          class="text-2xl no-underline hover:underline justify-content-center align-items-center"
          >Dịch vụ</a
        ><i class="pi pi-chevron-down"></i>
      </div>
      <div id="submenu1" class="absolute">
        <div
          class="flex flex-column border-double border-round border-surface-500 surface-overlay w-15rem h-7rem"
        >
          <div @click="Niengrang">
            <router-link class="ml-3 align-items-center justify-content-center text-xl no-underline hover:underline" to="/Niengrang">Niềng răng</router-link>
          </div>

          <div @click="Rangthammi">
            <router-link class="ml-3 align-items-center justify-content-center text-xl no-underline hover:underline" to="/Rangthammi">Răng thẩm mĩ</router-link>
          </div>

          <div @click="Rangtreem">
            <router-link class="ml-3 align-items-center justify-content-center text-xl no-underline hover:underline" to="/Rangtreem">Răng trẻ em</router-link>
          </div>
        </div>
      </div>
    </div>

    <div>
      <a
        href=""
        class="text-2xl no-underline hover:underline justify-content-center align-items-center"
        >Ưu đãi</a
      >
    </div>
    <!-- Đoạn code trước đó của bạn -->
    <div @click="handleClickListApp">
      <router-link class="text-2xl no-underline hover:underline justify-content-center align-items-center" to="/ListApp">Danh sách lịch hẹn</router-link>
    </div>

    <!-- Các phần khác của menu -->

    <div>
      <a
        href=""
        class="text-2xl no-underline hover:underline justify-content-center align-items-center"
        >Bảng giá</a
      >
    </div>

    <div>
      <button
        type="button"
        class="bg-blue-200 border-primary-200 px-3 py-2 text-base border-1 border-solid border-round cursor-pointer transition-all transition-duration-200 hover:bg-primary-600 hover:border-primary-600 active:bg-primary-700 active:border-primary-700 text-2xl"
      >
        Đặt khám <i class="pi pi-bell"></i>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["isClicked"],
  methods: {
    handleClickListApp(ind) {
      this.$emit("clickedListApp", true);
    },
    handleDivClick(index) {
      if (index == 0) {
        this.$emit("div-Clicked", true);
      }
    },
    scrollToDoctorsSection(){
        this.$emit('clicked', true);
    },
    scrollToInfo(){
      this.$emit('clicked_info', true);
    },
    Niengrang() {
      this.$emit('clicked_niengrang', true);
    },
    Rangthammi(){
      this.$emit('clicked_rangthammi', true);
    },
    Rangtreem() {
      this.$emit('clicked_rangtreem', true);
    }
  },
};
</script>

<style scoped>
#submenu {
  display: none;
  z-index: 3;
}
#GT:hover #submenu {
  display: block;
}
#submenu1 {
  display: none;
  z-index: 3;
}
#DV:hover #submenu1 {
  display: block;
}
</style>