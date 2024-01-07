<script setup>
import Menu from './Menu.vue';
import TopBar from './TopBar.vue';
import Button from 'primevue/button';
</script>

<template>
  <div class="flex">
    <!-- menu -->
    <Menu></Menu>
    <!-- Right -->
    <div class="relative w-full surface-hover">
      <div class="background-custom w-full h-6rem"></div>
      <div class="w-full pt-3 px-5 absolute top-0">
        <TopBar></TopBar>
      </div>
      <div class="table-container">
        <div class="pt-3 pl-9 ml-6">
          <div class="flex items-center mt-4">
            <h1 class="mr-4">Đánh giá theo nha sĩ</h1>
            <div class="flex items-center">
              <select v-model="selectedDoctor" class="p-2">
                <option disabled value="">Chọn nha sĩ</option>
                <option v-for="doctor in doctors" :value="doctor.MANS">{{ doctor.TENNS }}</option>
              </select>
              <button @click="confirmDoctorSelection"
                class="p-3 bg-blue-500 text-white font-semibold rounded-lg ml-4">Confirm</button>
            </div>
          </div>
          <table v-if="reviews.length > 0" class="pt-3" style="min-width: 60rem; height: 5rem">
            <thead>
              <tr>
                <th>Ngày khám</th>
                <th>Giờ khám</th>
                <th>Họ và tên</th>
                <th>Dịch vụ</th>
                <th>Nha sĩ yêu cầu</th>
                <th>Số sao</th>
                <th>Bình luận</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="review in reviews" :key="`${review.MAKH}-${review.NGAYKHAM}`">
                <td>{{ review.NGAYKHAM }}</td>
                <td>{{ review.KHUNGGIO }}</td>
                <td>{{ review.HOTEN }}</td>
                <td>{{ review.TENDV }}</td>
                <td>{{ review.TENNS }}</td>
                <td>{{ review.SOSAONS }}</td>
                <td>{{ review.BINHLUANNS }}</td>
                <td><button class="text-xl bg-blue-500 w-4rem h-2rem border-round-xl"
                    v-on:click="confirmDelete(review)">Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      reviews: [],
      doctors: [],
      selectedDoctor: '',
      review: {
        MAKH: '',
        NGAYKHAM: '',
      },
    };
  },
  mounted() {
    this.fetchDoctorReviews();
    this.fetchDoctors();
  },
  methods: {
    async fetchDoctorReviews() {
      if (this.selectedDoctor) {
        try {
          const response = await axios.get(`http://localhost:3000/api/review-doctor/${this.selectedDoctor}`);
          this.reviews = response.data;
          if (this.reviews.length == 0) {
            window.alert('Không có lịch hẹn ứng với nha sĩ này.');
          }

        } catch (error) {
          console.error('Error fetching review:', error);
        }
      } else {
        this.reviews = []; // Đặt lại danh sách nếu không có nha sĩ nào được chọn
      }
    },

    async confirmDoctorSelection() {
      if (this.selectedDoctor) {
        await this.fetchDoctorReviews(this.selectedDoctor);
      } else {
        window.alert('Hãy chọn một nha sĩ.');
      }
    },

    async fetchDoctors() {
      try {
        const response = await axios.get('http://localhost:3000/api/doctor-list');
        this.doctors = response.data;
      } catch (error) {
        console.error('Error fetching doctor:', error);
      }
    },

    confirmDelete(review) {
      // Display a confirmation dialog
      const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");

      if (isConfirmed) {
        // If confirmed, proceed with deletion
        this.deleteItem(review);
      }
    },

    deleteItem(review) {
      // Your existing deleteItem logic here
      axios.delete(`http://localhost:3000/api/review-doctor/${review.MAKH}/${review.NGAYKHAM}`)
        .then((response) => {
          console.log(response.data);
          // Update your local data array
          this.reviews = this.reviews.filter(item => !(item.MAKH === review.MAKH && item.NGAYKHAM === review.NGAYKHAM));
        })
        .catch((error) => {
          console.error('Error deleting review:', error);
          // Handle error if needed
        });
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
