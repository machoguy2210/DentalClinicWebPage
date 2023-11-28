<script setup>
import SubMenu from './SubMenu.vue';
import Menu from './Menu.vue';
import TopBar from './TopBar.vue';
import ChartData from './ChartData.vue';
import TableService from './TableService.vue';
</script>


<template>

<!-- Đặt lịch khám bệnh -->
<div class="flex">
  <!-- Menu -->
  <Menu></Menu>

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
        <SubMenu/>

        <!-- ChartData -->
        <ChartData/>

        <!-- TableService -->
        <TableService/>
      </div>
    </div>
  </div>
</div>
</template>

<style>
*,
*:before,
*:after {
    margin: 0;
    padding: 0;
    box-sizing:border-box;
    -moz-box-sizing:border-box;   
}

.background-custom{
  background: linear-gradient(rgb(100, 230, 226), #9198e5);
}
</style>