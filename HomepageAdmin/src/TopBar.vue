<script setup>
import { ref } from 'vue';
const keySearch = ref("");
</script>

<template>
    <div class="flex justify-content-between">
      <div class="p-input-icon-left h-3rem w-25rem">
        <i class="pi pi-search -mt-2"></i>
        <InputText v-model="keySearch" placeholder="Search" class="h-full pl-6 w-full"/>
      </div>
      <div class="flex align-items-center gap-4">
        <i class="pi pi-bell"></i>
        <div class="flex gap-2 align-items-center">
          <div class="w-3rem">
            <img src="../public/images/nyanko_sensei_full.jpg" class="w-full shadow-1 border-circle">
          </div>
          <span class="text-right">Username</span>
        </div>
      </div>
    </div>
</template>

<style scoped></style>