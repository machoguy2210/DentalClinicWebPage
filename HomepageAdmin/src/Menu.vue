<script setup>
import { ref } from 'vue';

const itemMenu = ref([
  {
    title: 'Quản Lý Lịch Khám',
  },
  {
    title: 'Quản Lý Thông Tin',
    item: [
      {
        subItem: 'Thông tin bác sĩ',
      },
      {
        subItem: 'Thông tin dịch vụ',
      },
      {
        subItem: 'Combo ưu đãi',
      },
    ],
  },
  {
    title: 'Quản Lý Customer',
  },
  {
    title: 'Quản Lý Staff',
  },
  {
    title: 'Quản Lý Giao Dịch',
  },
  {
    title: 'Quản Lý Dữ Liệu Đánh Giá',
  },
  {
    title: 'Thống Kê Doanh Thu',
  },
  {
    title: 'Cài Đặt',
    item: [
      {
        subItem: 'Thông tin cá nhân',
      },
      {
        subItem: 'Đổi mật khẩu',
      },
    ],
  },
]);
</script>

<template>
  <div
    class="flex flex-column border-right-2 border-transparent w-20rem md:text-sm"
  >
    <div
      class="flex justify-content-center border-bottom-2 border-blue-500 py-4"
    >
      <span class="text-xl p-1 text-blue-400 font-bold">PHÒNG KHÁM</span>
    </div>

    <div class="flex flex-column gap-5 pl-3">
      <div v-for="( menu,index ) in itemMenu" :key="index" class="flex flex-column gap-3" @click="handleDivClick(index)">
        <!-- item menu -->
        <div
          class="flex justify-content-between px-3 align-items-center cursor-pointer h-3rem hover:surface-300 hover:text-blue-600"
        >
          <div
            class="flex gap-3 align-items-center font-semibold"
            style="font-size: 0.8rem"
          >
            <i class="pi pi-home"></i>
            <span>{{ menu.title }}</span>
          </div>
          <i v-if="menu.item" class="pi pi-angle-down"></i>
        </div>
        <!-- Sub item menu -->
        <div class="flex flex-column">
          <div
            v-for="(subMenu, index) in menu.item"
            :key="index"
            class="hover:surface-300 py-2 cursor-pointer hover:text-blue-600"
          >
            <span class="w-fit-content pl-6" style="font-size: 0.8rem">{{
              subMenu.subItem
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-custom {
  border: 1px solid;
  border-color: linear-gradient(rgb(100, 230, 226), #9198e5);
}
</style>

<script>
  export default {
    props: ['isClicked'],
    methods: {
      handleDivClick(index) {
        if (index == 0) {
          this.$emit('div-Clicked', true);
        }        
      }
    }
  }
</script>
