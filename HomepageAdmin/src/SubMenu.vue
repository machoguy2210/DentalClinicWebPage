<script setup>
import { ref } from "vue";

const orders = ref([
    {
        name: 'Đã Khám',
        value: 77,
        icon: 'pi pi-check-square'
    }, 
    {
        name: 'Lịch đã đặt',
        value: 156,
        icon: 'pi pi-book'
    }, 
    {
        name: 'Gói Khám',
        value: 23,
        icon: 'pi pi-box'
    }, 
    {
        name: 'Khách Hàng',
        value: 123,
        icon: 'pi pi-user'
        
    }, 
    {
        name: 'Đã Hủy',
        value: 3,
        icon: 'pi pi-times-circle'

    }
]);
</script>

<template>
    <div class="mt-5 flex justify-content-between gap-3">
      <div v-for="( order, index ) in orders" :key="index" class=" hover:border-blue-600 border-2   border-transparent hover:border-cyan-700 p-2 bg-white flex w-15rem h-5rem gap-3 align-items-center border-round-md cursor-pointer">
        <div>
          <i :class="order.icon" class="text-2xl"></i>
        </div>
        <div class="flex justify-content-between align-items-center w-full">
          <div class="flex flex-column gap-2 text-xs md:text-sm font-bold">
            <span>{{ order.name }}</span>
            <span>{{ order.value }}</span>
          </div>
          <i class="pi pi-arrow-circle-right text-2xl"></i>
        </div>
      </div>
    </div>
</template>

<style scoped></style>