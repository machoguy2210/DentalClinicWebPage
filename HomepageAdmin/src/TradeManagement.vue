<template>
    <div v-if="Show">
        <table>
            <thead align="left">
                <tr>   
                    <th>MAKH</th>
                    <th>Họ và tên</th>
                    <th>Số điện thoại</th>
                    <th>Dịch vụ</th>
                    <th>Cho phép</th>
                </tr>
            </thead>
            <tbody align="left">
                <tr v-for="appointment in appointments" :key="`${appointment.MAKH}-${appointment.NGAYKHAM}`">
                    <td>{{ appointment.MAKH }}</td>
                    <td>{{ appointment.HOTEN }}</td>
                    <td>{{ appointment.PHONE }}</td>
                    <td>{{ changenameservice(appointment.MADV) }}</td>
                    <td><span v-on:click="ApproveTransaction(appointment.MAKH,appointment.NGAYKHAM)">Confirm Transaction</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                Show: false,
                appointments: [],
            }
        },
        mounted() {
            this.fetchAppointments();
        },
        methods: {
            show() {
                this.Show = true;
            },
            async fetchAppointments() {
                try {
                    const response = await axios.get('http://localhost:3000/api/transactions');
                    this.appointments = response.data;
                } catch (error) {
                    console.log(error);
                }
            },
            changenameservice(a) {
                if (a == 1) return 'Niềng răng';
                if (a == 2) return 'Tẩy trắng răng';
                if (a == 3) return 'Hàn răng';
            },
            ApproveTransaction(maKH, ngayKham) {
                axios.get(`http://localhost:3000/api/transactions/${maKH}/${ngayKham}`)
                    .then(response => {
                        console.log(response);
                        this.fetchAppointments();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }