<script setup>
import { ref } from 'vue';

const products = ref([
    {
        dateOrder: '25/11/2023 - 15:15:15',
        customer: 'Nguyen Van A',
        phoneNumber: '0987654321',
        serviceType: 'Niềng răng',
        status: 'Pending'
    },
    {
        dateOrder: '25/11/2023 - 17:35:28',
        customer: 'Nguyen Van B',
        phoneNumber: '0987654322',
        serviceType: 'Niềng răng',
        status: 'Pending'
    },
    {
        dateOrder: '25/11/2023 - 17:35:28',
        customer: 'Nguyen Van B',
        phoneNumber: '0987654322',
        serviceType: 'Niềng răng',
        status: 'Pending'
    },
    {
        dateOrder: '25/11/2023 - 17:35:28',
        customer: 'Nguyen Van B',
        phoneNumber: '0987654322',
        serviceType: 'Niềng răng',
        status: 'Pending'
    },
    {
        dateOrder: '25/11/2023 - 15:15:15',
        customer: 'Nguyen Van A',
        phoneNumber: '0987654321',
        serviceType: 'Niềng răng',
        status: 'Pending'
    },
]);

const columns = [
    { field: 'dateOrder', header: 'Ngày Đặt Lịch' },
    { field: 'customer', header: 'Họ Tên Khách Hàng' },
    { field: 'phoneNumber', header: 'Số Điện Thoại' },
    { field: 'serviceType', header: 'Dịch Vụ' },
    { field: 'status', header: 'Trạng thái'}
];
</script>

<template>
    <div class="py-3 bg-white">
        <span>Lịch Hẹn Khám Bệnh Nhân</span>
    </div>
    <div class="card">
        <DataTable :value="products" tableStyle="min-width: 50rem; height: 20rem">
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
        </DataTable>
    </div>
</template>

<style scoped>
.yourCustomSelector .ui-datatable .ui-datatable-data tr{
    height : 20rem;
}
</style>