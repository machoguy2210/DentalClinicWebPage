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
          <div class="flex">
            <h1>Danh sách dịch vụ</h1>
            <div>
            <Button class="flex justify-content-center bg-blue-800 w-10rem h-3rem mt-0" style="margin-left: 25rem;" @click="showNewPopup">Thêm dịch vụ</Button>
            </div>
          </div>
        <table class="pt-3" style="min-width: 60rem; height: 5rem">
          <thead>
            <tr>
              <th>Mã dịch vụ</th>
              <th>Tên dịch vụ</th>
              <th>Giá </th>
              <th>Mô tả</th>
              <th>Edit</th>
              <th>Delete</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="dichvu in alldichvu" :key="dichvu.MADV">
              <td>{{ dichvu.MADV }}</td>
              <td>{{ dichvu.TENDV }}</td>
              <td>{{ dichvu.GIA }}</td>
              <td>{{ dichvu.MOTA }}</td>
              <td><button class="text-xl bg-blue-500 w-4rem h-2rem border-round-xl" v-on:click="showEditPopup(dichvu)">Edit</button></td>
              <td><button class="text-xl bg-blue-500 w-4rem h-2rem border-round-xl" v-on:click="deleteItem(dichvu)">Delete</button></td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
    <div v-if="this.newPopup">
      <div class="popup-overlay" @click="hideNewPopup"></div>
      <div class="popup-content">
        <div class="flex row column-gap-8">
        <div class="col-md-6 h-25rem" style="width: 35rem;">
          <h1>Thêm dịch vụ</h1>
          <div>
            <div class="form-group mt-3">
                <label class="text-2xl">Mã dịch vụ:</label>
                <input type="text"  class="form-control text-2xl" v-model="dichvu.MADV"/>
            </div>
            <div class="form-group mt-3">
                <label class="text-2xl">Tên dịch vụ:</label>
                <input type="text"  class="form-control text-2xl" v-model="dichvu.TENDV"/>
            </div>
            <div class="form-group mt-3">
                <label class="text-2xl">Giá:</label>
                <input type="text" class="form-control text-2xl" v-model="dichvu.GIA">       
            </div>
            <div class="form-group mt-3">
                <label class="text-2xl">Mô tả :</label>
                <input type="text" class="form-control text-2xl" v-model="dichvu.MOTA">       
            </div>
            <div class="flex form-group mt-5 ">
              <button class="btn-primary text-xl bg-blue-500 w-7rem h-3rem border-round-xl" @click="AddDichvu">Add</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

    <div v-if="this.editPopup">
      <div class="popup-overlay" @click="hideEditPopup"></div>
      <div class="popup-content">
        <div class="flex row column-gap-8">
        <div class="col-md-6 h-25rem" style="width: 35rem;">
          <h1>Sửa dịch vụ</h1>
          <div>
            <div class="form-group mt-3">
                <label class="text-2xl">Mã dịch vụ:</label>
                <input type="text"  class="form-control text-2xl" v-model="dichvu.MADV"/>
            </div>
            <div class="form-group mt-3">
                <label class="text-2xl">Tên dịch vụ:</label>
                <input type="text"  class="form-control text-2xl" v-model="dichvu.TENDV"/>
            </div>
            <div class="form-group mt-3">
                <label class="text-2xl">Giá:</label>
                <input type="text" class="form-control text-2xl" v-model="dichvu.GIA">       
            </div>
            <div class="form-group mt-3">
                <label class="text-2xl">Mô tả :</label>
                <input type="text" class="form-control text-2xl" v-model="dichvu.MOTA">       
            </div>
            <div class="flex form-group mt-5 ">
              <button class="btn-primary text-xl bg-blue-500 w-7rem h-3rem border-round-xl" @click="updateDichvu">Save</button>
            </div>
          </div>
        </div>
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
      newPopup: false,
      editPopup: false,
      alldichvu: [],
      editedDichvu: {},
      dichvu: {
        MADV: '',
        TENDV: '',
        GIA: '',
        MOTA: '',
      },
    };
  },
  mounted() {
    this.fetchAlldichvu();
  },
  methods: {
    async fetchAlldichvu() {
      try {
        const response = await axios.get('http://localhost:3000/api/alldichvu');
        this.alldichvu = response.data;
      } catch (error) {
        console.error('Error fetching dichvu:', error);
      }
    }, 
    showNewPopup() {
      this.newPopup = true;
    },
    hideNewPopup() {
      this.newPopup = false;
    },
    AddDichvu() {
      axios.post('http://localhost:3000/api/alldichvu', this.dichvu)
        .then((response) => {
          console.log(response.data);
          this.alldichvu.push(response.data)
        })
        .catch((error) => {
          console.error('Error adding Dich Vu:', error);
          // Xử lý lỗi nếu cần thiết
        });
      this.newPopup = false;
    },

    showEditPopup(dichvu) {
      this.editedDichvu = { ...dichvu };
      this.editPopup = true;
    },
    hideEditPopup() {
      this.editPopup = false;
    },
    updateDichvu() {
      axios.put(`http://localhost:3000/api/alldichvu/${this.editedDichvu.MADV}`, this.editedDichvu)
    .then((response) => {
      console.log(response.data);
      let foundDichvu = this.alldichvu.find(item => item.MADV === this.editedDichvu.MADV);
      
      if (foundDichvu) {
        Object.assign(foundDichvu, response.data);
      }
    })
    .catch((error) => {
      console.error('Error updating Dich Vu:', error);
      // Xử lý lỗi nếu cần thiết
    });

    this.editPopup = false;
    },
    async deleteItem(dichvu) {
    // Kiểm tra xem alldichvu có phần tử tại vị trí index hay không
    if (this.alldichvu[index]) {
      const MADV = this.alldichvu[index].MADV;

      try {
        // Thực hiện yêu cầu xóa từ máy chủ
        await axios.delete(`http://localhost:3000/api/alldichvu/${MADV}`);
        
        // Nếu xóa thành công, cập nhật mảng alldichvu
        this.alldichvu.splice(index, 1);

        // Log thông báo và chuyển hướng nếu cần thiết
        console.log('Dịch vụ đã được xóa:', MADV);
      } catch (error) {
        console.error('Lỗi khi xóa dịch vụ:', error);
        // Xử lý lỗi nếu cần thiết
      }
    } else {
      console.error('Lỗi: Không có dịch vụ tại vị trí:', index);
      // Xử lý lỗi nếu cần thiết
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
    box-sizing:border-box;
    -moz-box-sizing:border-box;   
}

.background-custom{
  background: linear-gradient(rgb(100, 230, 226), #9198e5);
}

.table-container {
  display: flex;
  flex-direction: column;
}

th, td {
  padding: 10px; /* Tùy chỉnh giá trị padding theo nhu cầu */
  text-align: left; /* Có thể sử dụng 'center' thay thế nếu cần */
}

th {
  background-color: #f2f2f2; /* Một màu nền để phân biệt header */
}

.badge {
  cursor: pointer;
  margin-right: 5px; /* Khoảng cách giữa các badge */
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
