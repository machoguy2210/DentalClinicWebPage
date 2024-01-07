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
            <h1>Danh sách nha sĩ</h1>
            <div>
            <Button class="flex justify-content-center bg-blue-800 w-10rem h-3rem mt-0" style="margin-left: 25rem;" @click="showNewPopup">Thêm nha sĩ</Button>
            </div>
          </div>
          <div class="search-container">
          <button class="sreach-button" @click="searchNhasi">
            Tìm Kiếm
          </button>
          <input
            class="sreach"
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm..."
          />
        </div>
        <table class="pt-3" style="min-width: 60rem; height: 5rem">
          <thead>
            <tr>
              <th>Mã nha sĩ</th>
              <th>Họ tên</th>
              <th>Giới thiệu</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Edit</th>
              <th>Delete</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="nhasi in allnhasi" :key="nhasi.MANS">
              <td>{{ nhasi.MANS }}</td>
              <td>{{ nhasi.TENNS }}</td>
              <td>{{ nhasi.GIOITHIEU }}</td>
              <td>{{ nhasi.SDT }}</td>
              <td>{{ nhasi.DIACHI }}</td>
              <td><button class="text-xl bg-blue-500 w-4rem h-2rem border-round-xl" v-on:click="showEditPopup(nhasi)">Edit</button></td>
              <td><button class="text-xl bg-blue-500 w-4rem h-2rem border-round-xl" v-on:click="confirmDelete(nhasi)">Delete</button></td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
    <div v-if="newPopup">
      <div class="popup-overlay" @click="hideNewPopup"></div>
      <div class="popup-content">
        <div class="flex row column-gap-8">
          <div class="col-md-6 h-25rem" style="width: 35rem;">
            <h1>Thêm nha sĩ</h1>
            <form>
              <div class="form-group mt-3">
                  <label class="text-2xl">Mã nha sĩ:</label>
                  <input type="text"  class="form-control text-2xl" v-model="nhasi.MANS"/>
              </div>
              <div class="form-group mt-3">
                  <label class="text-2xl">Tên nha sĩ:</label>
                  <input type="text"  class="form-control text-2xl" v-model="nhasi.TENNS"/>
              </div>
              <div class="form-group mt-3">
                  <label class="text-2xl">Giới thiệu:</label>
                  <input type="text" class="form-control text-2xl" v-model="nhasi.GIOITHIEU">       
              </div>
              <div class="form-group mt-3">
                  <label class="text-2xl">Số điện thoại:</label>
                  <input type="text" class="form-control text-2xl" v-model="nhasi.SDT">       
              </div>
              <div class="form-group mt-3">
                  <label class="text-2xl">Địa chỉ:</label>
                  <input type="text" class="form-control text-2xl" v-model="nhasi.DIACHI">       
              </div>
              <div class="flex form-group mt-5 ">
                <button class="btn btn-primary text-xl bg-blue-500 w-7rem h-3rem border-round-xl" @click="AddNhasi">Add</button>
              </div>
            </form>
          </div>
      </div>
        
      </div>
    </div>

    <div v-if="editPopup">
      <div class="popup-overlay" @click="hideEditPopup"></div>
      <div class="popup-content">
        <div class="flex row column-gap-8">
        <div class="col-md-6 h-25rem" style="width: 35rem;">
          <h1>Sửa nha sĩ</h1>
          <div>
            <div class="form-group mt-3">
                <label class="text-2xl">Mã nha sĩ:</label>
                <input type="text"  class="form-control text-2xl" v-model="nhasi.MANS"/>
            </div>
            <div class="form-group mt-3">
                <label class="text-2xl">Tên nha sĩ:</label>
                <input type="text"  class="form-control text-2xl" v-model="nhasi.TENNS"/>
            </div>
            <div class="form-group mt-3">
                <label class="text-2xl">Giới thiệu:</label>
                <input type="text" class="form-control text-2xl" v-model="nhasi.GIOITHIEU">       
            </div>
            <div class="form-group mt-3">
                <label class="text-2xl">SDT :</label>
                <input type="text" class="form-control text-2xl" v-model="nhasi.SDT">       
            </div>
            <div class="form-group mt-3">
                <label class="text-2xl">Địa chỉ :</label>
                <input type="text" class="form-control text-2xl" v-model="nhasi.DIACHI">       
            </div>
            <div class="flex form-group mt-5 ">
              <button class="btn-primary text-xl bg-blue-500 w-7rem h-3rem border-round-xl" @click="updateNhasi(nhasi)">Save</button>
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
      allnhasi: [],
      nhasi: {
        MANS: '',
        TENNS: '',
        GIOITHIEU: '',
        SDT: '',
        DIACHI: '',
      },
      searchQuery: "",
    };
  },
  mounted() {
    this.fetchAllnhasi();
  },
  methods: {
    async fetchAllnhasi() {
      try {
        const response = await axios.get('http://localhost:3000/api/allnhasi');
        this.allnhasi = response.data;
      } catch (error) {
        console.error('Error fetching nhasi:', error);
      }
    },
    //search 
    async searchNhasi() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/allnhasi/search?query=${this.searchQuery}`
        );
        const data = await response.json();
        this.allnhasi = data;
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
    showNewPopup() {
      this.newPopup = true;
    },
    hideNewPopup() {
      this.newPopup = false;
    },
    AddNhasi() {
      axios.post('http://localhost:3000/api/allnhasi', this.nhasi)
        .then((response) => {
          console.log(response.data);
          this.allnhasi.push(response.data)
        })
        .catch((error) => {
          console.error('Error adding Nha Si:', error);
          // Xử lý lỗi nếu cần thiết
        });
      this.newPopup = false;
    },
    showEditPopup(nhasi) {
      this.editPopup = true;
    },
    hideEditPopup() {
      this.editPopup = false;
    },
    updateNhasi(nhasi) {
      axios.put(`http://localhost:3000/api/allnhasi/${this.nhasi.MANS}`, this.nhasi)
    .then((response) => {
      console.log(response.data);
      let foundNhasi = this.allnhasi.find(item => item.MANS === this.nhasi.MANS);
      
      if (foundNhasi) {
        Object.assign(foundNhasi, response.data);
      }
    })
    .catch((error) => {
      console.error('Error updating Dich Vu:', error);
      // Xử lý lỗi nếu cần thiết
    });

    this.editPopup = false;
    },

    confirmDelete(nhasi) {
    // Display a confirmation dialog
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");

    if (isConfirmed) {
      // If confirmed, proceed with deletion
      this.deleteItem(nhasi);
    }
  },

  deleteItem(nhasi) {
    // Your existing deleteItem logic here
    axios.delete(`http://localhost:3000/api/allnhasi/${nhasi.MANS}`)
      .then((response) => {
        console.log(response.data);
        // Update your local data array
        this.allnhasi = this.allnhasi.filter(item => item.MANS !== this.nhasi.MANS);
      })
      .catch((error) => {
        console.error('Error deleting Nha si:', error);
        // Handle error if needed
      });
  },
  }
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
.sreach {
  width: 400px;
  height: 40px;
  border-radius: 11px;
  border: 3px solid black;
  font-size: 18px;
  background-color: rgba(210, 215, 217, 0.747);
  margin-left: 15px;
}
.sreach-button {
  margin-left: 2px;
  width: 100px;
  height: 40px;
  background-color: rgb(141, 162, 197);
  font-size: 18px;
  height: 45px;
  border-radius: 16px;
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
