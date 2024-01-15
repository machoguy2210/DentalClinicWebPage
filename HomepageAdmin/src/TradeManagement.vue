<template>
    <div>
        <table>
            <thead align="left">
                <tr>   
                    <th width="100px">MAKH</th>
                    <th width="200px">Họ và tên</th>
                    <th width="200px">Số điện thoại</th>
                    <th width="200px">Dịch vụ</th>
                    <th>Cho phép</th>
                </tr>
            </thead>
            <tbody align="left">
                <tr v-for="appointment in appointments" :key="`${appointment.MAKH}-${appointment.NGAYKHAM}`">
                    <td>{{ appointment.MAKH }}</td>
                    <td>{{ appointment.HOTEN }}</td>
                    <td>{{ appointment.PHONE }}</td>
                    <td>{{ changenameservice(appointment.MADV) }}</td>
                    <td><span id="allow" v-on:click="ApproveTransaction(appointment.MAKH,appointment.NGAYKHAM)">Confirm Transaction</span></td>
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
                if (a == 2) return 'Răng thẩm mĩ';
                if (a == 3) return 'Răng trẻ em';
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
</script>