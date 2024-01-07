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
        <p class="Header-text">Quản lý nhân viên</p>
        <!-- Button to open the form for adding a new employee -->

        <!-- <button @click="openAddForm">Add Employee</button> -->
        <button class="button-add" @click="openAddForm">Thêm nhân viên</button>

        <!-- Display employee list -->
        <div class="Table-list-em">
          <table>
            <!-- Table header -->
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Birthdate</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <!-- Table body -->
            <tbody>
              <tr v-for="employee in employees" :key="employee.MANV">
                <td>{{ employee.MANV }}</td>
                <td>{{ employee.HOTEN }}</td>
                <td>{{ employee.EMAIL }}</td>
                <td>{{ employee.SDT }}</td>
                <td>{{ employee.GIOITINH === 1 ? "Nam" : "Nữ" }}</td>
                <td>{{ employee.DIACHI }}</td>
                <td>{{ formatNgayKham(employee.NGAYSINH) }}</td>
                <td>{{ employee.PASSWORD }}</td>
                <td>
                  <button class="edit-button" @click="openEditForm(employee)">
                    Edit
                  </button>
                  <button
                    class="delete-button"
                    @click="deleteEmployee(employee.MANV)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="showForm">
          <h2>{{ isEditMode ? "Edit Customer" : "Add Customer" }}</h2>
          <div class="form-em">
            <h2>{{ isEditMode ? "Edit Employee" : "Add Employee" }}</h2>
            <form @submit.prevent="saveEmployee">
              <label for="hoten">Full Name:</label>
              <input
                v-model="employeeForm.HOTEN"
                type="text"
                id="hoten"
                required
              />

              <label for="email">Email:</label>
              <input
                v-model="employeeForm.EMAIL"
                type="email"
                id="email"
                required
              />

              <label for="sdt">Phone:</label>
              <input v-model="employeeForm.SDT" type="tel" id="sdt" required />

              <label for="gioitinh">Gender:</label>
              <select v-model="employeeForm.GIOITINH" id="gioitinh" required>
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
              </select>

              <label for="diachi">Address:</label>
              <input
                v-model="employeeForm.DIACHI"
                type="text"
                id="diachi"
                required
              />

              <label for="ngaysinh">Birthdate:</label>
              <input
                v-model="employeeForm.NGAYSINH"
                type="text"
                id="ngaysinh"
                required
              />
              <!-- <input v-model="employeeForm.NGAYSINH" type="text" id="ngaysinh" required :value="formatNgaySinh(employeeForm.NGAYSINH)" /> -->

              <label for="password">Password:</label>
              <input
                v-model="employeeForm.PASSWORD"
                type="password"
                id="password"
                required
              />

              <!-- Add more input fields as needed -->

              <button type="submit">{{ isEditMode ? "Update" : "Add" }}</button>
              <button @click="closeForm">Cancel</button>
            </form>
          </div>
        </div>
        <!-- Form for adding/editing employees -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [],
      showForm: false,
      isEditMode: false,
      employeeForm: {
        HOTEN: "",
        EMAIL: "",
        SDT: "",
      },
    };
  },
  watch: {
      "employeeForm.NGAYSINH"(newValue) {
      if (newValue) {
        this.employeeForm.NGAYSINH = newValue.substring(0, 10);
      }
    },
  },
  methods: {
    // Fetch employee data from the server
    async fetchEmployees() {
      try {
        const response = await fetch("http://localhost:3000/employees");
        const data = await response.json();
        this.employees = data;
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    },

    // Save or update employee information
    async saveEmployee() {
      try {
        if (this.isEditMode) {
          // Update existing employee
          await fetch(
            `http://localhost:3000/employees/${this.employeeForm.MANV}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.employeeForm),
            }
          );
        } else {
          // Add new employee
          await fetch("http://localhost:3000/employees", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.employeeForm),
          });
        }

        // Clear the form and fetch updated employee data
        this.closeForm();
        await this.fetchEmployees();
      } catch (error) {
        console.error("Error saving employee data:", error);
      }
    },
    formatNgayKham(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    // Delete employee
    async deleteEmployee(employeeId) {
      try {
        await fetch(`http://localhost:3000/employees/${employeeId}`, {
          method: "DELETE",
        });

        // Fetch updated employee data after deletion
        this.fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    },

    // Open the form for adding a new employee
    openAddForm() {
      this.showForm = true;
      this.isEditMode = false;
      this.employeeForm = {
        HOTEN: "",
        EMAIL: "",
        SDT: "",
        // Initialize other fields as needed
      };
    },

    // Open the form for editing an existing employee
    openEditForm(employee) {
      this.showForm = true;
      this.isEditMode = true;
      this.employeeForm = { ...employee };
    },

    // Close the form
    closeForm() {
      this.showForm = false;
      this.isEditMode = false;
      this.employeeForm = {
        HOTEN: "",
        EMAIL: "",
        SDT: "",
        // Clear other fields as needed
      };
    },
  },
  mounted() {
    // Fetch initial employee data when the component is mounted
    this.fetchEmployees();
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
.Table-list-em {
  border-color: black;
  font-size: 20px;
  background-color: rgb(137, 184, 219);
}
button {
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 1px 1px 1px rgb(27, 9, 9);
}
.Table-list-em button {
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
.form-em {
  font-size: 21px;
  width: 540px;
  margin: 20px 0;
  background-color: aquamarine;
  padding: 10px;
  border: 3px solid black;
}
/* CSS cho form */
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 20px 0;
}
.form-edit {
  float: left;
  width: 500px;
}
.list-employee {
  float: left;
  width: 1500px;
}
.form-em input {
  display: flex;

  font-size: 21px;
  width: 500px;
  border-radius: 6px;
  padding: 4px;
  background-color: rgba(210, 215, 217, 0.747);
}
.form-em label {
  display: flex;
  width: 150px;
  margin-right: 20px; /* Khoảng cách giữa label và input */
}

/* Cho gioitinh */
#gioitinh {
  font-size: 21px;
  background-color: rgba(210, 215, 217, 0.747);
}
.form-em button {
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
    