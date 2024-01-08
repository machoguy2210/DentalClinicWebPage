<script setup>
</script>


<template>
  <div>
    <TopBar></TopBar>
    <Menu></Menu>
    <div class="frame-service">
      <div class="service-list">
        <div class="background-image">
          <img src="./assets/Web_Nieng.jpg"/>
        </div>
        <div class="content">
          <div class="service-container">
            <div
              v-for="appointment in appointments"
              :key="appointment.MAKH"
              class="service-card"
            >
              <div class="service-details">
                <p class="name-service">
                  <strong>Tên dịch vụ: {{ appointment.TENDV }}</strong>
                </p>
                <div class="view-appoiment">
                  <div class="view-basic">
                    <p class="infor-appointment">
                      <strong> Ngày Khám:</strong>
                      {{ formatNgayKham(appointment.NGAYKhAM) }}
                    </p>
                    <p class="infor-appointment">
                      <strong> Giá Tiền:</strong>
                      {{ appointment.GIA }} VND
                    </p>
                    <p class="infor-appointment">
                      <strong>Thời gian:</strong>

                      {{ appointment.KHUNGGIO }}
                    </p>
                  </div>

                  <div v-if="appointment.showDetails" class="view-more">
                    <p class="infor-appointment">
                      <strong>Bác Sĩ:</strong> {{ appointment.TENNS }}
                    </p>
                    <p class="infor-appointment">
                      <strong>Lời Nhắn:</strong>

                      {{ appointment.GHICHU }}
                    </p>
                    <p class="infor-appointment">
                      <strong> Dịch Vụ:</strong>
                      {{ appointment.TENDV }}
                    </p>
                  </div>
                  <div v-if="appointment.showDetails">
                    <p style="font-size: 20px">
                      <strong> Mô tả:</strong>
                      {{ appointment.MOTA }}
                    </p>
                  </div>
                </div>
                <div class="buttons">
                  <button class="btn-details" @click="viewDetails(appointment)">
                    Xem Chi Tiết
                  </button>
                  <button class="btn-pay" @click="generateQRCode(appointment)">
                    Thanh Toán
                  </button>
                  <button
                    class="btn-delete"
                    @click="
                      deleteAppointment(
                        appointment.MAKH,
                        formatNgayKham(appointment.NGAYKhAM)
                      )
                    "
                  >
                    Xóa
                  </button>
                  <button class="btn-edit" @click="openEditForm(appointment)">
                    Chỉnh Sửa
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="payment-voucher">
            <div class="background-payment">
              <p class="text-payment">QR CODE</p>
              <div v-if="selectedAppointment" class="payment-details">
                <img
                  v-if="qrCode"
                  :src="qrCode"
                  alt="QR Code"
                  class="qr-code"
                />
                <h2>Thanh Toán cho: {{ selectedAppointment.TENDV }}</h2>
              </div>
            </div>
            <!-- <div class="voucher">
              <p class="text-payment">NHẬP MÃ GIẢM GIÁ</p>
              <input type="text" id="" />
            </div> -->
          </div>
        </div>
      </div>
      <div v-if="editFormVisible" class="edit-form-modal">
        <div class="edit-form-content">
          <table>
            <tr>
              <td>
                <label for="editedTime" class="label-time-edit"
                  >Giờ Khám:</label
                >
              </td>
              <td>
                <input type="text" v-model="editedTime" id="editedTime" />
              </td>
            </tr>
            <tr>
              <td>
                <label for="editedReminder" class="label-reminder-edit"
                  >Lời Nhắc Hẹn:</label
                >
              </td>
              <td>
                <textarea
                  v-model="editedReminder"
                  id="editedReminder"
                ></textarea>
              </td>
            </tr>
          </table>

          <!-- Nút lưu chỉnh sửa -->
          <button @click="saveEdit" class="save-btn">Lưu Chỉnh Sửa</button>
          <!-- Nút đóng modal -->
          <button @click="closeEditForm" class="close-btn">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
import TopBar from "../../HomepageCustomer/src/TopBar.vue";
import Menu from "../../HomepageCustomer/src/Menu.vue";

export default {
  components: { TopBar, Menu },
  data() {
    return {
      appointments: [],
      selectedAppointment: null,
      qrCode: null,
      editFormVisible: false,
      editedTime: "",
      editedReminder: "",
      editedAppointment: null,
      // customerId: 1,
      customerId:null
    };
  },
  created() {
    this.fetchAppointments();
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

    async fetchAppointments() {
      try {
        const response = await fetch(
          `http://localhost:3000/appointments/${this.customerId}`
        );
        const data = await response.json();
        this.appointments = data.map((appointment) => ({
          ...appointment,
          showDetails: false,
        }));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },

    viewDetails(appointment) {
      appointment.showDetails = !appointment.showDetails;
    },
    async fetchUudai() {
      try {
        const response = await fetch("http://localhost:3000/uudai");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },

    viewDetails(appointment) {
      appointment.showDetails = !appointment.showDetails;
    },

    async generateQRCode(appointment) {
      if (appointment.KHOATHANHTOAN == 1) {
        this.selectedAppointment = appointment;
        let discountRate;
        try {
          const discountlever = await this.fetchUudai(); // Sử dụng await để đợi kết quả trả về

          const tichdiem = appointment.TICHDIEM;
          console.log("diem cua nguoi dung" + tichdiem);
          discountRate = 0;
          for (const temp of discountlever) {
            console.log("moc diem" + temp.TICHDIEM);

            if (tichdiem >= temp.TICHDIEM) {
              discountRate = temp.GIAMGIA;
              console.log(temp.GIAMGIA);

              break;
            }
          }
        } catch (error) {
          console.error("Lỗi khi xử lý mốc giảm giá:", error);
        }

        console.log(discountRate);
        const lastcost = (appointment.GIA * discountRate) / 100;
        const content = `2|99|0339997866|LUU TIEN DUNG|1|0|0|${lastcost}|MA KHACH HANG|transfer_myqr`;
        QRCode.toDataURL(content)
          .then((url) => {
            this.qrCode = url;
          })
          .catch((err) => {
            console.error(err);
            alert("Lỗi khi tạo mã QR");
          });
      } else {
        alert("Dịch vụ chỉ mở khóa thanh toán sau khi bạn sử dụng dịch vụ");

        // Hiển thị thông báo cảnh báo với nút OK
        // const result = confirm("Bạn có chắc chắn muốn tiếp tục không?");
        // if (result) {
        //   // Người dùng nhấn OK
        //   console.log("Người dùng đã đồng ý.");
        // } else {
        //   // Người dùng nhấn Cancel
        //   console.log("Người dùng đã hủy.");
        // }

        // // Hiển thị thông báo yêu cầu người dùng nhập dữ liệu
        // const userInput = prompt("Nhập vào một giá trị:");
        // console.log("Giá trị bạn nhập là:", userInput);
      }
    },
    async deleteAppointment(MAKH, NGAYKhAM) {
      const result = confirm("Bạn có chắc chắn muốn hủy không?");
      if (result) {
        // Người dùng nhấn OK
        console.log("Người dùng đã đồng ý.");
        try {
          const response = await fetch(
            `http://localhost:3000/appointments/${MAKH}/${NGAYKhAM}`,
            {
              method: "DELETE",
            }
          );

          const data = await response.json();

          if (response.ok) {
            console.log(data.message);
            // Nếu muốn cập nhật lại danh sách sau khi xóa, gọi lại fetchAppointments
            this.fetchAppointments();
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error("Lỗi khi gọi API xóa:", error);
        }
      } else {
        // Người dùng nhấn Cancel
        console.log("Người dùng đã hủy.");
      }
    },
    formatNgayKham(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${day}-${month}-${year}`;
    },
    openEditForm(appointment) {
      // Hiển thị modal và điền thông tin cần chỉnh sửa
      this.editFormVisible = true;
      this.editedTime = appointment.KHUNGGIO;
      this.editedReminder = appointment.GHICHU;
      this.editedAppointment = appointment;
      this.editedAppointment.NGAYKhAM = this.formatNgayKham(
        this.editedAppointment.NGAYKhAM
      );
    },

    closeEditForm() {
      // Đóng modal và làm sạch thông tin chỉnh sửa
      this.editFormVisible = false;
      this.editedTime = "";
      this.editedReminder = "";
      this.editedAppointment = null;
    },

    async saveEdit() {
      try {
        // Gọi API chỉnh sửa thông tin lịch khám với thông tin đã chỉnh sửa
        const response = await fetch(
          `http://localhost:3000/appointments/${this.editedAppointment.MAKH}/${this.editedAppointment.NGAYKhAM}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              KHUNGGIO: this.editedTime,
              GHICHU: this.editedReminder,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log(data.message);
          // Đóng modal sau khi lưu chỉnh sửa và cập nhật danh sách
          this.closeEditForm();
          this.fetchAppointments();
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API chỉnh sửa:", error);
      }
    },
  },
};
</script>

<style scoped>
/* CSS cho div chứa toàn bộ nội dung */
.service-container {
  overflow: auto;
  max-height: 700px;
  margin: 20px;
  margin-top: 50px;
  width: 1500px;
  float: left;
}

.payment-voucher {
  float: right;
  width: 400px;
  margin: 20px;
  margin-top: 50px;

  padding: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
}
.background-payment {
  float: top;
  background-color: gray;
  border-radius: 10px;
  box-shadow: 2px 2px 2px;
  padding: 10px;
  margin: 10px;
}
.voucher {
  float: top;
  background-color: gray;
  border-radius: 10px;
  box-shadow: 2px 2px 2px;
  padding: 10px;
  margin: 10px;
}

.frame-service {
  background-color: #c9f3ee;
  display: flex;
  justify-content: center;
  max-height: 2000px;
  margin: 0;
}

/* CSS cho danh sách dịch vụ */
.service-list {
  margin-top: 100px;
  background-color: rgb(147, 211, 234);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
  max-width: 2150px;
  width: 100%;
  max-height: 2000px;
}

.infor-appointment {
  margin-bottom: 10px;
  font-size: 20px;
}
/* CSS cho hình ảnh phía sau */
.background-image {
  height: 450px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

/* CSS cho tiêu đề */
.content h1 {
  font-size: 24px;
  margin-top: 20px;
  text-align: center;
  color: #333;
}

/* CSS cho từng dịch vụ */
.service-card {
  display: flex;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
}
.name-service {
  text-transform: uppercase;
  font-size: 25px;
  margin-top: 15px;
  margin-bottom: 0px;
}
.view-appoiment {
  width: 1300px;
  height: 200px;
  margin-left: 30px;
}

.view-basic {
  width: 400px;
  float: left;
}
.view-more {
  width: 400px;
  float: left;
}

/* CSS cho hình ảnh dịch vụ */
.service-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 0;
}

/* CSS cho chi tiết dịch vụ */
.service-details {
  margin-left: 50px;
}
.btn-pay {
  background-color: rgb(113, 224, 113);
}
.btn-delete {
  background-color: rgb(224, 56, 56);
}
.btn-details {
  background-color: rgb(122, 122, 235);
}
/* CSS cho nút */
.buttons button {
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
  box-shadow: 2px 2px 2px #363030;
}

/* CSS cho QR Code */
.qr-code {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 10px auto;
}

/* CSS cho tiêu đề QR Code */
.text-payment {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

/* CSS cho chi tiết thanh toán */
.payment-details {
  text-align: center;
}

/* Thêm một chút động tác khi hover vào các nút */
.buttons button:hover {
  background-color: gray;
}
.edit-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top of other elements */
}

.edit-form-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 80%; /* Adjust the width as needed */
  width: 700px; /* Set a maximum width for larger screens */
  box-shadow: 2px 2px 2px black;
}

/* CSS for the close button in the modal */
.edit-form-content button {
  background-color: #70bded;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  box-shadow: 2px 2px 2px black;
}

.edit-form-content table {
  width: 100%;
}
.edit-form-content label {
  font-size: 24px;
  font-weight: bold;
  text-align: top;
}
.save-btn {
  margin-left: 200px;
  margin-right: 40px;
}

#editedTime {
  border-radius: 9px;
  width: 100px;
  height: 30px;
  font-size: 20px;
  background-color: #dff1e6;
  float: left;
  border: 4px solid black;
}
#editedReminder {
  border-radius: 9px;
  width: 400px;
  height: 100px;
  font-size: 20px;
  float: left;
  padding: 10px;
  background-color: #dff1e6;
  border: 4px solid black;
}

.edit-form-content td {
  padding: 10px;
  width: 140px;
  vertical-align: top;
}
.edit-form-content {
  background-color: #c9f3ee;
}
</style>