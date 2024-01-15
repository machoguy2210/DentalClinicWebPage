<template>
    <div class="py-3 bg-white">
        <span>Lịch Hẹn Khám Bệnh Nhân</span>
    </div>
    <input type="date" v-model="date"> <Button align="center" style="width: 150px; margin-left: 20px; float: left;" v-on:click="fetchAppointments()" label="Lấy lịch hẹn" />
    <Button align="center" style="width: 150px; margin-left: 20px; float: left;" v-on:click="sendData()" label="Gửi lịch hẹn" />
   <div>
      <table >
        <thead align="left">
          <tr>
              <th width="20px"  style="border-bottom: 2px solid #000"></th>
              <th width="100px" style="border-bottom: 2px solid #000;">Ngày khám</th>
              <th width="100px" style="border-bottom: 2px solid #000">Giờ khám</th>
              <th width="150px" style="border-bottom: 2px solid #000">Họ và tên</th>
              <th width="150px" style="border-bottom: 2px solid #000">Số điện thoại</th>
              <th width="150px" style="border-bottom: 2px solid #000">Dịch vụ</th>
              <th width="150px" style="border-bottom: 2px solid #000">Nha sĩ yêu cầu</th>
              <th width="300px" style="border-bottom: 2px solid #000">Ghi chú</th>
              <th width="50px" style="border-bottom: 2px solid #000">Edit</th>
              <th width="100px" style="border-bottom: 2px solid #000">Delete</th>
              <th width="100px" style="border-bottom: 2px solid #000">Transaction</th>
          </tr>
        </thead>
        
        <tbody align="left" border: solid>
          <tr v-for="appointment in appointments" :key="`${appointment.MAKH}-${appointment.NGAYKHAM}`">
            <td align="center"><input type="checkbox" v-model="selectedItems" :value="`${appointment.MAKH}/${appointment.NGAYKHAM}/${changenameservice(appointment.MADV)}`"></td> 
            <td>{{ appointment.NGAYKHAM.slice(0,10) }}</td>
             <td>{{ appointment.KHUNGGIO }}</td>
              <td>{{ appointment.HOTEN }}</td>
              <td >{{ appointment.PHONE }}</td>
              <td>{{  changenameservice(appointment.MADV) }}</td>
              <td>{{ appointment.MANS }}</td>
              <td>{{ appointment.GHICHU }}</td>
              <td><div class="dropdown">
                <button class="dropbtn" @click="showEditMenu(appointment.MAKH,appointment.NGAYKHAM,appointment.HOTEN,appointment.NGAYKHAM,appointment.MADV)">Edit</button>
                <div class="content" v-if="showMAKH === appointment.MAKH && showNGAYKHAM === appointment.NGAYKHAM">
                  <input type="text" placeholder="Họ và tên" v-model="editHOTEN">
                  <input type="text" placeholder="Số điện thoại" v-model="editPHONE">
                  <select v-model="editMADV">
                    <option value="0" disabled selected hidden>Chọn dịch vụ</option>
                    <option value="1">Niềng răng</option>
                    <option value="2">Tẩy trắng răng</option>
                    <option value="3">Hàn răng</option>
                  </select>
                  <button @click="editAppointment(appointment.MAKH, appointment.NGAYKHAM)">Save</button>
                  <button @click="showMAKH = 0">Cancel</button>
                </div>
              </div>
              </td>
              <td><span class="datafunction" v-on:click="deleteAppointment(appointment.MAKH, appointment.NGAYKHAM)">Delete</span></td>
              <td align="center"><Button label="Allow" text raised rounded aria-label="Filter" v-on:click="ApproveTransaction(appointment.MAKH,appointment.NGAYKHAM);Updatepoint(appointment.MAKH)" /></td>
          </tr>
        </tbody>
      </table>
   </div>
</template>
  
<script>
import axios, { getAdapter } from "axios";
import Calendar from "primevue/calendar";
export default {
  components: {
    Calendar,
  },
  data() {
    return {
      appointments: [],
      selectedItems: [],
      showMAKH: null,
      showNGAYKHAM: null,
      editHOTEN: null,
      editPHONE: null,
      editMADV: null,
      date: this.getDate(),
    };
  },
  mounted() {
    this.fetchAppointments();
  },
  methods: {
    async fetchAppointments() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/appointments/get/${this.date}`
        );
        this.appointments = response.data;
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    },
    changenameservice(a) {
      if (a == 1) return "Niềng răng";
      else if (a == 2) return "Răng thẩm mĩ";
      else if (a == 3) return "Răng trẻ em";
    },
    showEditMenu(maKH, ngayKham, hoten, phone, madv) {
      this.showMAKH = maKH;
      this.showNGAYKHAM = ngayKham;
      this.editHOTEN = hoten;
      this.editPHONE = phone;
      this.editMADV = madv;
    },
    editAppointment(maKH, ngayKham) {
      console.log(this.editHOTEN, this.editPHONE, this.editMADV);
      axios
        .get(
          `http://localhost:3000/api/appointments/edit/${maKH}/${ngayKham}/${this.editHOTEN}/${this.editPHONE}/${this.editMADV}`
        )
        .then((response) => {
          console.log(response);
          this.fetchAppointments();
        })
        .catch((error) => {
          console.log(error);
        });
      this.showMAKH = 0;
    },
    deleteAppointment(maKH, ngayKham) {
      axios
        .delete(`http://localhost:3000/api/appointments/${maKH}/${ngayKham}`)
        .then((response) => {
          console.log(response);
          this.fetchAppointments();
          alert("Đã xóa lịch hẹn");
        })
        .catch((error) => {
          console.log(error);
        });
        
    },
    sendData() {
      axios
        .post("http://localhost:3000/api/appointments", this.selectedItems)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ApproveTransaction(maKH, ngayKham) {
      axios
        .get(
          `http://localhost:3000/api/appointments/transaction/${maKH}/${ngayKham}`
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
        alert("Đã mở khóa thanh toán lịch hẹn");
    },
    // update tichdiem
    Updatepoint(maKH) {
      axios.put(`http://localhost:3000/api/update1/${maKH}`)
        .then(response => {
          console.log('Success:', response);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
  
    getDate() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      return yyyy + "-" + mm + "-" + dd;
    },
  },
};
</script>

<style scoped>
.datafunction {
  color: blue;
  cursor: pointer;
}
.datafunction:hover {
  background-color: black;
  color: white;
}

.dropdown {
  display: inline-block;
}
input[type="date"] {
  padding: 6px;
  border-radius: 10px;
  margin-top: 8px;
  margin-left: 8px;
  font-size: 17px;
  width: 150px;
}
.dropdown button {
  background-color: #ffffff;
  color: blue;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
.dropdown button:hover {
  background-color: black;
  color: white;
}
.dropdown .content {
  position: absolute;
  border-color: #bdb9b9;
  width: 350px;
}
.dropdown .content input[type="text"] {
  padding: 6px;
  border-radius: 10px;
  margin-top: 8px;
  margin-left: 8px;
  font-size: 17px;
  width: 290px;
}
.dropdown .content select {
  float: left;
  padding: 6px;
  border-radius: 10px;
  margin-top: 8px;
  margin-left: 8px;
  font-size: 17px;
}

.dropdown .content button {
  border-color: black;
  padding: 6px;
  border-radius: 10px;
  margin-top: 8px;
  margin-left: 8px;
  font-size: 17px;
  background-color: #ffffff;
  color: black;
  border: 2px solid black;
}
</style>
