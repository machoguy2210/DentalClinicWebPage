<script setup>
import Menu from "./Menu.vue";
import TopBar from "./TopBar.vue";

import Button from "primevue/button";
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
      <div>
        <p class="Header-text">Quản lí khách hàng</p>

        <!-- Button to open the form for adding a new Customer -->
        <button class="button-add" @click="openAddForm">Tim Kiếm</button>

        <!-- Display Customer list -->
        <table class="Table-list-customer">
          <!-- Table header -->
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Birthdate</th>
              <th>Point</th>
              <th>Action</th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody>
            <tr v-for="Customer in Customers" :key="Customer.MANV">
              <td>{{ Customer.MAKH }}</td>
              <td>{{ Customer.HOTEN }}</td>
              <td>{{ Customer.EMAIL }}</td>
              <td>{{ Customer.PASSWORD }}</td>
              <td>{{ Customer.SDT }}</td>
              <td>{{ Customer.GIOITINH === 1 ? "Nam" : "Nữ" }}</td>
              <td>{{ Customer.DIACHI }}</td>
              <td>{{ formartNgayThang(Customer.NGAYSINH) }}</td>
              <td>{{ Customer.TICHDIEM }}</td>
              <td>
                <button class="edit-button" @click="openEditForm(Customer)">
                  Edit
                </button>
                <button
                  class="delete-button"
                  @click="deleteCustomer(Customer.MAKH)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Form for adding/editing Customers -->
        <div v-if="showForm">
          <h2>{{ isEditMode ? "Edit Customer" : "Add Customer" }}</h2>
          <form class="form-cus" @submit.prevent="saveCustomer">
            <label for="hoten">Full Name:</label>
            <input
              v-model="CustomerForm.HOTEN"
              type="text"
              id="hoten"
              required
            />

            <label for="email">Email:</label>
            <input
              v-model="CustomerForm.EMAIL"
              type="email"
              id="email"
              required
            />

            <label for="password">Password:</label>
            <input
              v-model="CustomerForm.PASSWORD"
              type="password"
              id="password"
              required
            />

            <label for="sdt">Phone:</label>
            <input v-model="CustomerForm.SDT" type="tel" id="sdt" required />

            <label for="gioitinh">Gender:</label>
            <select v-model="CustomerForm.GIOITINH" id="gioitinh" required>
              <option value="1">Nam</option>
              <option value="0">Nữ</option>
            </select>

            <label for="diachi">Address:</label>
            <input
              v-model="CustomerForm.DIACHI"
              type="text"
              id="diachi"
              required
            />
            <label for="ngaysinh">Birthdate:</label>
            <input
              v-model="CustomerForm.NGAYSINH"
              type="date"
              id="ngaysinh"
              required
            />
            <!-- Add more input fields as needed -->

            <button class="button-choice" type="submit">
              {{ isEditMode ? "Update" : "Add" }}
            </button>
            <button class="button-cancel" @click="closeForm">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Customers: [],
      showForm: false,
      isEditMode: false,
      CustomerForm: {
        HOTEN: "",
        EMAIL: "",
        SDT: "",
        // Add more fields as needed
      },
    };
  },
  // thay đổi định dạng ngày sinh
  watch: {
    "CustomerForm.NGAYSINH"(newValue) {
      this.CustomerForm.NGAYSINH = newValue.substring(0, 10);
    },
  },
  methods: {
    // Fetch Customer data from the server
    async fetchCustomers() {
      try {
        const response = await fetch("http://localhost:3000/Customers");
        const data = await response.json();
        this.Customers = data;
      } catch (error) {
        console.error("Error fetching Customer data:", error);
      }
    },

    // Save or update Customer information
    async saveCustomer() {
      try {
        if (this.isEditMode) {
          // Update existing Customer
          await fetch(
            `http://localhost:3000/Customers/${this.CustomerForm.MAKH}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.CustomerForm),
            }
          );
        } else {
          // Add new Customer
          await fetch("http://localhost:3000/Customers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.CustomerForm),
          });
        }

        // Clear the form and fetch updated Customer data
        this.closeForm();
        await this.fetchCustomers();
      } catch (error) {
        console.error("Error saving Customer data:", error);
      }
    },

    // Delete Customer
    async deleteCustomer(CustomerId) {
      try {
        await fetch(`http://localhost:3000/Customers/${CustomerId}`, {
          method: "DELETE",
        });

        // Fetch updated Customer data after deletion
        this.fetchCustomers();
      } catch (error) {
        console.error("Error deleting Customer:", error);
      }
    },

    // Open the form for adding a new Customer
    openAddForm() {
      this.showForm = true;
      this.isEditMode = false;
      this.CustomerForm = {
        HOTEN: "",
        EMAIL: "",
        SDT: "",
        // Initialize other fields as needed
      };
    },

    // Open the form for editing an existing Customer
    openEditForm(Customer) {
      this.showForm = true;
      this.isEditMode = true;
      this.CustomerForm = { ...Customer };
    },

    // Close the form
    closeForm() {
      this.showForm = false;
      this.isEditMode = false;
      this.CustomerForm = {
        HOTEN: "",
        EMAIL: "",
        SDT: "",
        // Clear other fields as needed
      };
    },
    formartNgayThang(NgayThang) {
      return NgayThang.substring(0, 10);
    },
  },
  mounted() {
    // Fetch initial Customer data when the component is mounted
    this.fetchCustomers();
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #f2f2f2;
}

th,
td {
  padding: 10px;
  border: 1px solid hwb(0 0% 100% / 0.92);
  text-align: left;
}

th {
  font-weight: bold;
  background-color: rgb(137, 212, 200);
}

button {
  margin-left: 5x;
  margin-right: 19px;
}
.Table-list-customer {
  border-color: black;
  font-size: 20px;
  background-color: rgb(137, 184, 219);
}
button {
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 1px 1px 1px rgb(27, 9, 9);
}
.Table-list-customer button {
  width: 70px;
  font-size: 20px;
}
.edit-button {
  background-color: rgb(144, 137, 191);
}
.delete-button {
  background-color: rgb(235, 65, 65);
}
.button-add {
  width: 200px;
  height: 40px;
  font-size: 21px;
  background-color: rgb(63, 109, 182);
}

.Header-text {
  font-size: 40px;
  text-align: center;
  font-family: "Comic Sans MS", cursive;
  font-weight: bold;
  margin-top: 10px;
}

/* Cho form-cus */
.form-cus {
  font-size: 21px;
  width: 540px;
  margin: 20px 0;
  background-color: aquamarine;
  padding: 10px;
  border: 3px solid black;
}

/* Cho label */

/* Cho input */
.form-cus input {
  display: flex;

  font-size: 21px;
  width: 500px;
  border-radius: 6px;
  padding: 4px;
  background-color: rgba(210, 215, 217, 0.747);
}
.form-cus label {
  display: flex;
  width: 150px;
  margin-right: 20px; /* Khoảng cách giữa label và input */
}

/* Cho gioitinh */
#gioitinh {
  font-size: 21px;
  margin: auto;
  background-color: rgba(210, 215, 217, 0.747);
}
.form-cus button {
  width: 140px;
  font-size: 21px;
  margin-top: 20px;
}
.button-choice {
  margin-left: 90px;
  background-color: rgb(144, 137, 191);
}
.button-cancel {
  background-color: rgb(235, 65, 65);
}
</style>
