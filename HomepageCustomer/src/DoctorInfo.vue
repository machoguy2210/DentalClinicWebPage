<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const information = ref([]);

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 4,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/allnhasi");
    information.value = response.data.map(({ MANS, TENNS, GIOITHIEU }) => ({
      id: MANS,
      name: TENNS,
      detail: GIOITHIEU,
      // add other properties if needed
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <div class="relative">
    <div style="height: 32rem" class="image">
      <img
        src="../public/imagins/background2.jpg"
        class="h-full w-full"
        style="object-fit: cover"
      />
    </div>

    <div class="absolute top-0 left-0 right-0">
      <div class="pt-8 pl-7 h-25rem flex flex-column gap-6">
        <div class="text-container1" style="width: 43rem">
          <p class="text-blue-800 text-3xl font-semibold">ĐỘI NGŨ BÁC SĨ</p>
          <div class="horizontal-line1"></div>
        </div>

        <div class="text-container2 text center text-lg" style="width: 43rem">
          <p style="font-weight: 425">
            Minh Thu hiểu rằng mỗi chẩn đoán, kế hoạch điều trị sẽ quyết định
            đến nụ cười và khuôn mặt của mỗi khách hàng. Các bác sĩ sẽ luôn nỗ
            lực không ngừng, kiên định với phương châm đặt chất lượng điều trị
            lên hàng đầu, bảo tồn tối đa cùng mục tiêu phát triển bền vững về
            chuyên môn, tận tâm trong dịch vụ.
          </p>
          <div class="horizontal-line2"></div>
        </div>
      </div>
      
      <div style="margin-top: 10rem;">
        <h1>Thông tin nha sĩ</h1>
      </div>
      <div class="card">
        <Carousel
          :value="information"
          :numVisible="4"
          :numScroll="1"
          :responsiveOptions="responsiveOptions"
          circular
          :autoplayInterval="5000"
        >
          <template #item="slotProps">
            <div
              class="w-17rem flex flex-column p-5 gap-4 shadow-1 hover:shadow-3 surface-overlay" style="margin-top: 2rem;"
            >
            
              <div class="flex flex-column gap-2">

                <div class="flex flex-column gap-2">
                  <span class="text-xl">{{ slotProps.data.name }}</span>
                  <span class="text-700 text-lg">BÁC SĨ</span>
                </div>

                <div class="line-height-3">
                  <div
                    class="overflow-hidden md:overflow-auto h-15rem text-lg flex flex-column"
                  >
                    <span>{{ slotProps.data.detail }}</span>
                  </div>
                </div>
              </div>

              <div class="card flex gap-3">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-button font-bold hover:bg-blue-700 w-8rem h-3rem justify-content-center"
                  style="text-decoration: none"
                  >XEM THÊM</a
                >
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-container1 {
  position: relative;
  text-align: center;
}

.horizontal-line1 {
  position: absolute;
  top: 3rem;
  left: 10rem;
  right: 10rem;
  border-top: 3px solid #000;
}

.text-container2 {
  position: relative;
  text-align: center;
}

.horizontal-line2 {
  position: absolute;
  top: 7rem;
  left: 10rem;
  right: 10rem;
  border-top: 3px solid #000;
}

.image img:hover {
  opacity: 0.5;
}
</style>
