<template>
    <div class="py-3 bg-white">
        <span>Lịch Hẹn Khám Bệnh Nhân</span>
    </div>
   <div>
      <table v-if="isClicked" style="min-width: 50rem; height: 20rem">
        <thead>
          <tr>
              <th>Ngày khám</th>
              <th>Giờ khám</th>
              <th>Họ và tên</th>
              <th>Số điện thoại</th>
              <th>Dịch vụ</th>
              <th>Nha sĩ yêu cầu</th>
              <th>Ghi chú</th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.MAKH">
             <td>{{ appointment.NGAYKHAM }}</td>
             <td>{{ appointment.KHUNGGIO }}</td>
              <td>{{ appointment.HOTEN }}</td>
              <td>{{ appointment.PHONE }}</td>
              <td>{{  changenameservice(appointment.MADV) }}</td>
              <td>{{ appointment.MANS }}</td>
              <td>{{ appointment.GHICHU }}</td>
          </tr>
        </tbody>
      </table>
   </div>
</template>
  
<script>
import axios from 'axios';

export default {
  props: ['isClicked'],
  data() {
    return {
      appointments: []
    };
  },
  mounted() {
    this.fetchAppointments();
  },
  methods: {
    async fetchAppointments() {
      try {
        const response = await axios.get('http://localhost:3000/api/appointments');
        this.appointments = response.data;
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    },
    changenameservice(a) {
      if (a == 1) return 'Niềng răng';
      else if (a == 2) return 'Tẩy trắng răng';
      else if (a == 3) return 'Hàn răng';
    }
  }
};

</script>