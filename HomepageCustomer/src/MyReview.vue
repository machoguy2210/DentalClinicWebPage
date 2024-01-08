<script setup>
</script>

<template>
  <div>
    <!-- menu -->
    <TopBar></TopBar>
    <Menu></Menu>
  </div>
  <div class="table-container">
    <div class="pt-3 pl-9 ml-6">
      <div>
        <div class="flex gap-4">
          <router-link to="/MyReview">
            <button>Xem đánh giá của tôi</button>
          </router-link>
          <router-link to="/CreateReview">
            <button>Thêm đánh giá</button>
          </router-link>
        </div>
      </div>
      <div>
        <h1>Đánh giá của tôi</h1>
      </div>
      <table class="pt-3" style="min-width: 60rem; height: 5rem">
        <thead>
          <tr>
            <th>Ngày khám</th>
            <th>Khung giờ</th>
            <th>Dịch vụ </th>
            <th>Nha sĩ chỉ định</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="review in reviews" :key="`${review.NGAYKHAM}`">
            <td>{{ review.NGAYKHAM }}</td>
            <td>{{ review.KHUNGGIO }}</td>
            <td>{{ review.TENDV }}</td>
            <td>{{ review.TENNS }}</td>
            <td><button class="text-xl bg-blue-500 w-4rem h-2rem border-round-xl"
                v-on:click="showPopup(review)">Details</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="popup">
    <div class="popup-overlay" @click="hidePopup"></div>
    <div class="popup-content">
      <div class="flex row column-gap-8">
        <div class="col-md-6 h-25rem" style="width: 35rem;">
          <h1>Thông tin chi tiết</h1>
          <div v-for="detail in details" :key="detail.MAKH">
            <div class="form-group mt-3">
              <label class="text-l">Ngày khám: {{ detail.NGAYKHAM }}</label>
            </div>
            <div class="form-group mt-3">
              <label class="text-l">Khung giờ: {{ detail.KHUNGGIO }}</label>
            </div>
            <div class="form-group mt-3">
              <label class="text-l">Dịch vụ: {{ detail.TENDV }}</label>
            </div>
            <div class="form-group mt-3">
              <label class="text-l">Nha sĩ chỉ định: {{ detail.TENNS }}</label>
            </div>
            <div class="form-group mt-3">
              <label class="text-l">Số sao nha sĩ: {{ detail.SOSAONS }}</label>
            </div>
            <div class="form-group mt-3">
              <label class="text-l">Bình luận nha sĩ: {{ detail.BINHLUANNS }}</label>
            </div>
            <div class="form-group mt-3">
              <label class="text-l">Số sao dịch vụ: {{ detail.SOSAODV }}</label>
            </div>
            <div class="form-group mt-3">
              <label class="text-l">Bình luận dịch vụ: {{ detail.BINHLUANDV }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>

import Menu from './Menu.vue';
import TopBar from './TopBar.vue';
import Button from 'primevue/button';

export default {
  components: {
    TopBar,
    Menu,
  },
  data() {
    return {
      reviews: [],
      details: [],
      popup: false,
      MAKH: ''
    };
  },
  created() {
    this.fetchReview();
    this.getC();
  },
  methods: {
    getC() {
      // Kiểm tra xem ID đã được lưu trong localStorage chưa
      this.customerId = localStorage.getItem("customer_id");

      if (this.customerId === null) {
        // Nếu chưa có ID trong localStorage, thử lấy từ URL
        var urlParams = new URLSearchParams(window.location.search);
        this.customerId = urlParams.get("customer_id");

        // Kiểm tra xem có ID từ URL hay không
        if (this.customerId !== null) {
          // Lưu ID vào localStorage để sử dụng sau này
          localStorage.setItem("customer_id", this.customerId);
        }
      }
    },
    async fetchReview() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/my-review/${this.MAKH}`
        );
        const data = await response.json();
        this.reviews = data.map((review) => ({
          ...review,
          showDetails: false,
        }));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    showPopup(review) {
      this.popup = true;
      this.fetchDetailReviews(review);
    },
    hidePopup() {
      this.popup = false;
    },
    async fetchDetailReviews(review) {
      if (review) try {
        const response = await fetch(
          `http://localhost:3000/api/my-review/${this.MAKH}/${review.NGAYKHAM}`
        );
        const data = await response.json();
        this.details = data.map((detail) => ({
          ...detail,
          showDetails: true,
        }));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
  },
};

</script>
<style>
*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.background-custom {
  background: linear-gradient(rgb(100, 230, 226), #9198e5);
}

.table-container {
  display: flex;
  flex-direction: column;
}

th,
td {
  padding: 10px;
  /* Tùy chỉnh giá trị padding theo nhu cầu */
  text-align: left;
  /* Có thể sử dụng 'center' thay thế nếu cần */
}

th {
  background-color: #f2f2f2;
  /* Một màu nền để phân biệt header */
}

.badge {
  cursor: pointer;
  margin-right: 5px;
  /* Khoảng cách giữa các badge */
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

/* Nội dung của popup */
.popup-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 11;
}
</style>