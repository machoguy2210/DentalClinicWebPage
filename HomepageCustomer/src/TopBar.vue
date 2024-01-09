<script setup>
import { ref } from "vue";

const showTooltip = ref(false);

const hideTooltip = () => {
  showTooltip.value = false;
};

const cancelHideTooltip = () => {
  // Cancel the hide when the mouse enters the tooltip
  showTooltip.value = true;
};

const logout = () => {
  localStorage.removeItem("customer_id");
  this.MAKH = '';
};

const menuUser = ref([
  {
    label: "Thông tin tài khoản",
    link: "/Profile",
  },
  {
    label: "Lịch khám",
    link: "/ListApp"
  },
  {
    label: "Đánh giá",
    link: "/MyReview",
  },
  {
    label: "Đăng xuất",
    link: "",
    action: logout,
  },
]);

const openFacebook = () => {
  // Thay thế link dưới đây bằng đường dẫn Facebook thực tế của bạn
  window.open(
    "https://www.facebook.com/profile.php?id=100052006419483",
    "_blank"
  );
};

const chatWithCSKH = () => {
  window.open("https://www.messenger.com/t/macho.man.382", "_blank");
};
</script>
<template>
  <div class="bg-blue-100 flex align-items-center justify-content-between px-8 py-2">
    <!-- Logo -->
    <div class="w-10rem lg:w-15rem">
      <img src="../public/imagins/Logo-Minh-Thu.png" class="w-full" />
    </div>

    <!-- Search -->
    <div class="p-input-icon-left ml-5 w-25rem align-items-center" style="height: 2.5rem">
      <i class="pi pi-search -mt-2" />
      <InputText v-model="value1" placeholder="Search" class="pl-5 w-full h-full" />
    </div>

    <div class="flex gap-5">
      <!-- Social -->
      <div class="flex align-items-center gap-3">
        <div id="MES" class="relative">
          <i id="mes" class="pi pi-comment text-3xl"></i>
          <div id="imes">
            <a href="" @click="chatWithCSKH"
              class="absolute surface-900 text-white flex border-round w-10rem h-2rem align-items-center justify-content-center">
              Chat with CSKH
            </a>
          </div>
        </div>

        <div id="FB" class="relative">
          <i id="fb" class="pi pi-facebook text-3xl"></i>
          <div id="ifb">
            <a href="" @click="openFacebook"
              class="absolute surface-900 text-white flex border-round w-10rem h-2rem align-items-center justify-content-center">
              Follow on Facebook
            </a>
          </div>
        </div>

        <div id="INS" class="relative">
          <i id="ins" class="pi pi-instagram text-3xl"></i>
          <div id="iins">
            <a href=""
              class="absolute surface-900 text-white flex border-round w-10rem h-2rem align-items-center justify-content-center">
              Follow on Instagram
            </a>
          </div>
        </div>

        <div id="YT" class="relative">
          <i id="yt" class="pi pi-youtube text-3xl"></i>
          <div id="iyt">
            <a href=""
              class="absolute surface-900 text-white flex border-round w-10rem h-2rem align-items-center justify-content-center">
              Follow on Youtube
            </a>
          </div>
        </div>
      </div>

      <!-- UserName after login -->
      <div v-if="MAKH === null"> <a href="http://login.local">
          <button style="cursor: pointer;" class="bg-blue-500 text-white px-4 py-2 rounded-md text-base lg:text-xl">Log
            in</button>
        </a>
      </div>
      <div class="relative" @mouseover="cancelHideTooltip" @mouseleave="hideTooltip" v-if="MAKH !== null">
        <div class="flex align-items-center gap-2">
          <div style="width: 2.5rem; object-fit: cover" class="-mb-1 border-circle flex align-items-center">
            <img src="../public/imagins/hour.png" class="w-full h-full border-circle" />
          </div>

          <span @mouseover="showTooltip = true" @mouseleave="hideTooltip" class="text-base lg:text-xl cursor-pointer">
            Username
          </span>
        </div>

        <!-- Tooltip content -->
        <div v-if="showTooltip" @mouseover="cancelHideTooltip"
          class="absolute z-5 bg-white py-2 px-3 w-12rem border-round-sm bg-red-200">
          <div v-for="(menu, index) in menuUser" :key="index" @click="handleClickMenuUser">
            <router-link v-if="menu.link" :to="menu.link" class="cursor-pointer hover:text-blue-700 text-base lg:text-lg">
              {{ menu.label }}
            </router-link>
            <span v-else class="cursor-pointer hover:text-blue-700 text-base lg:text-lg">{{ menu.label }}</span>
            <hr v-if="index !== menuUser.length - 1" class="my-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isClicked", "MAKH"],
  methods: {
    handleClickMenuUser(ind) {
      if (this.menuUser[ind].action) {
        this.menuUser[ind].action(); // Thực hiện hành động tương ứng
      }
      this.$emit("clickedMenuUser", true);
    },
  },
};
</script>

<style scoped>
#imes {
  display: none;
}

#MES:hover #imes {
  display: inline;
}

#ifb {
  display: none;
}

#FB:hover #ifb {
  display: inline;
}

#iins {
  display: none;
}

#INS:hover #iins {
  display: inline;
}

#iyt {
  display: none;
}

#YT:hover #iyt {
  display: inline;
}
</style>
