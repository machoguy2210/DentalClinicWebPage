<script setup>
import { ref } from "vue";
const keySearch = ref("");
</script>

<template>
  <div class="flex justify-content-between md:text-sm">
    <div class="p-input-icon-left w-20rem" style="height: 2.5rem">
      <i class="pi pi-search -mt-2"></i>
      <InputText
        v-model="keySearch"
        placeholder="Search"
        class="h-full pl-6 w-full"
      />
    </div>
    <div class="flex align-items-center gap-3">
      <i
        v-badge="3"
        class="pi pi-bell p-overlay-badge text-xl cursor-pointer w-1rem"
      ></i>
      <div class="flex gap-2 align-items-center">
        <div class="cursor-pointer" style="width: 2.5rem">
          <img
            src="../public/images/nyanko_sensei_full.jpg"
            class="w-full shadow-1 border-circle"
          />
        </div>
        <span class="text-right cursor-pointer">Username</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.p-badge) {
  font-size: 0.7rem;
  min-width: 1rem;
  height: 1rem;
  line-height: 1rem;
}
</style>
