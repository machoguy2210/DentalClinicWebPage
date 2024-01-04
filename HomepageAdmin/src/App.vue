
<template>
  <div>
    <div v-if="showDefaultContent">
          <!-- Nội dung chính của ứng dụng -->
          <!-- Đặt lịch khám bệnh -->
      <div class="flex">
        <!-- Menu -->
        <Menu @div-Clicked="handleDivClick" @clicked = "handleClickInfo"></Menu>
  
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
              
  
              <AppointmentManagement :isClicked="isClicked"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view v-if="!showDefaultContent"></router-view>
  </div>
  
  
  </template>
  
  <script>
    import SubMenu from './SubMenu.vue';
    import Menu from './Menu.vue';
    import TopBar from './TopBar.vue';
    import ChartData from './ChartData.vue';
    import TableService from './TableService.vue';
    import AppointmentManagement from './AppointmentManagement.vue';
    export default {
      components: {
        SubMenu,
        Menu,
        TopBar,
        ChartData,
        TableService,
        AppointmentManagement
      },
      data() {
        return {
          showDefaultContent: true,
          isClicked: false
        }
      },
      methods: {
        handleDivClick(value) {
          this.isClicked = value;
        },
        handleClickInfo(value) {
          this.showDefaultContent = false;
        }
      }
    }
  </script>
  
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
  
  