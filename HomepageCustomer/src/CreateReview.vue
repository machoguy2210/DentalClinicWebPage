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
        <h1>Danh sách lịch hẹn chưa đánh giá</h1>
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
            <td><button class="text-xl bg-blue-500 w-4rem h-2rem border-round-xl" v-on:click="showPopup(review)">Thêm đánh
                giá</button></td>
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
          <h1>Thông tin đánh giá</h1>
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
            <!-- Form điền thông tin đánh giá -->
            <div class="form-group mt-3">
              <label class="text-l">Số sao nha sĩ:</label>
              <input v-model="detail.SOSAONS" type="number" min="1" max="5">
            </div>
            <div class="form-group mt-3">
              <label class="text-l">Bình luận nha sĩ:</label>
              <textarea v-model="detail.BINHLUANNS"></textarea>
            </div>
            <div class="form-group mt-3">
              <label class="text-l">Số sao dịch vụ:</label>
              <input v-model="detail.SOSAODV" type="number" min="1" max="5">
            </div>
            <div class="form-group mt-3">
              <label class="text-l">Bình luận dịch vụ:</label>
              <textarea v-model="detail.BINHLUANDV"></textarea>
            </div>
            <!-- Button để gửi đánh giá -->
            <button @click="submitReview">Gửi đánh giá</button>
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
    this.fetchUnreviewedAppointment();
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
    async fetchUnreviewedAppointment() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/unreviewed-appointment/${this.MAKH}`
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
          `http://localhost:3000/api/unreviewed-appointment/${this.MAKH}/${review.NGAYKHAM}`
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
    async submitReview() {
      try {
        for (const detail of this.details) {
          const response1 = await fetch(`http://localhost:3000/api/add-doctor-review`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              MAKH: this.MAKH,
              NGAYKHAM: detail.NGAYKHAM,
              SOSAONS: detail.SOSAONS,
              BINHLUANNS: detail.BINHLUANNS,
            }),
          });

          const response2 = await fetch(`http://localhost:3000/api/add-service-review`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              MAKH: this.MAKH,
              NGAYKHAM: detail.NGAYKHAM,
              SOSAODV: detail.SOSAODV,
              BINHLUANDV: detail.BINHLUANDV,
            }),
          });

          if (response1.ok && response2.ok) {
            // Gửi đánh giá thành công
            console.log('Gửi đánh giá thành công');
            this.popup = false; // Đóng popup sau khi gửi đánh giá
          } else {
            console.error('Lỗi khi gửi đánh giá');
            // Xử lý khi gửi đánh giá thất bại (có thể thông báo lỗi cho người dùng)
          }
        }
      } catch (error) {
        console.error('Lỗi khi gửi đánh giá:', error);
        // Xử lý khi có lỗi xảy ra (có thể thông báo lỗi cho người dùng)
      }
    },
  },
}

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