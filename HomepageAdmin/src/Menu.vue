<script setup>
import { ref } from "vue";

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
            subItem: 'Thông tin dịch vụ'
          },
      ]
    },
    {
        title: 'Quản Lý Customer'
    }, 
    {
        title: 'Quản Lý Staff'
    }, 
    {
        title: 'Quản Lý Giao Dịch'
    },
    {
        title: 'Quản Lý Dữ Liệu Đánh Giá',
        item: [
          { 
            subItem: 'Đánh giá theo nha sĩ',
          }, 
          {
            subItem: 'Đánh giá theo dịch vụ'
          }
      ]
    },
    {
        title: 'Thống Kê Doanh Thu'
    },
    {
        title: 'Cài Đặt',
        item: [
          { 
            subItem: 'Thông tin cá nhân',
          }, 
          {
            subItem: 'Đổi mật khẩu'
          }
      ]
    }
]);
</script>

<template>
<div class="flex flex-column gap-5 border-right-2 border-transparent w-23rem">
    <div class="flex justify-content-center border-bottom-2 border-blue-500 py-4">
      <span class="text-2xl p-1 text-blue-400 font-bold">PHÒNG KHÁM</span>
    </div>

    <div class="flex flex-column gap-5 pl-3">
      <div v-for="( menu,index ) in itemMenu" :key="index" class="flex flex-column gap-3" @click="handleDivClick(index)">
        <!-- item menu -->
        <div class="flex justify-content-between mr-3 align-items-end">
            <div class="flex gap-3 align-items-center font-semibold">
                <i class="pi pi-home"></i>
                <span class="cursor-pointer">{{ menu.title }}</span>
                 

            </div>
            <i class="pi pi-angle-right"></i>
        </div>
        <!-- Sub item menu -->
        <div v-for="( subMenu,ind ) in menu.item" :key="ind" class="flex flex-column gap-2 ml-5 " @click="handleClickInfo(ind)">
          <router-link v-if="subMenu.subItem === 'Thông tin bác sĩ'" to="/DoctorInfo" class="cursor-pointer w-fit-content"> {{ subMenu.subItem }} </router-link> 
          <router-link v-if="subMenu.subItem === 'Thông tin dịch vụ'" :to="{ path: '/Dichvu' }" class="cursor-pointer w-fit-content"> {{ subMenu.subItem }} </router-link> 
          <router-link v-if="subMenu.subItem === 'Đánh giá theo nha sĩ'" :to="{ path: '/ReviewDoctor' }" class="cursor-pointer w-fit-content"> {{ subMenu.subItem }} </router-link>
          <router-link v-if="subMenu.subItem === 'Đánh giá theo dịch vụ'" :to="{ path: '/ReviewService' }" class="cursor-pointer w-fit-content"> {{ subMenu.subItem }} </router-link>
        </div>
        <!-- CustomerManager -->
        <div @click="handleClickCus">
          <router-link v-if="menu.title === 'Quản Lý Customer'" to="/CusManager" class="cursor-pointer w-fit-content">{{ menu.title}}</router-link>
        </div>
        <div @click="handleClickStaff">
          <router-link v-if="menu.title === 'Quản Lý Staff'" to="/EmManager" class="cursor-pointer w-fit-content">{{ menu.title}}</router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.border-custom{
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
      },
      handleClickInfo(ind) {
        this.$emit('clicked', true);
      },
      handleClickCus() {
        this.$emit('clickedCus', true);
      },
      handleClickStaff() {
        this.$emit('clickedStaff', true);
      }
      
    }
  }
</script>