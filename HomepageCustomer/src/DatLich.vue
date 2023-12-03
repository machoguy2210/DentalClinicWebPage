<script setup>
    import { ref } from "vue";
    const date = ref();
    const selectedDichvu = ref();
    const Dichvu = ref([
        { name: 'Niềng răng', code: 'NR' },
        { name: 'Cấy ghép Implant', code: 'IM' },
        { name: 'Răng thẩm mĩ', code: 'TM' },
        { name: 'Nha khoa tổng quát', code: 'TQ' },
        { name: 'Nha khoa trẻ em', code: 'TE' }
    ]);
</script>
<template>
    <div class="flex" style="gap: 8rem; margin-top: 8rem;">
        <div class="" style="height: 50rem; width: 45rem;"><img src="../public/imagins/tai_xuong__4_-removebg-preview.png" class="w-full h-full"></div>
        <div class="flex flex-column align-items-center" style="margin-right: 15rem;">
            <div class="text-3xl text-cyan-900">ĐẶT LỊCH THĂM KHÁM</div>
            <div class="border-top-1 border-600 mt-8 mt-3" style="width: 45rem;">
                <div class="align-items-center mt-3" style="width: 40rem; height: 2.5rem;">
                    <InputText v-model="value1" placeholder="Họ tên" class="pl-1 w-full h-full"/>
                </div>
                <div class="align-items-center mt-3" style="width: 40rem; height: 2.5rem;">
                    <InputText v-model="value1" placeholder="Email" class="pl-1 w-full h-full"/>
                </div>
                <div class="align-items-center mt-3" style="width: 40rem; height: 2.5rem;">
                    <InputText v-model="value1" placeholder="Số điện thoại" class="pl-1 w-full h-full"/>
                </div>
                <div class="card flex align-items-center mt-3" style="width: 40rem; height: 2.5rem;">
                    <Dropdown v-model="selectedDichvu" :options="Dichvu" optionLabel="name" placeholder="Chọn dịch vụ điều trị" class="w-full h-full"/>
                </div>
                <div class="card flex align-items-center mt-3" style="width: 40rem; height: 2.5rem;">
                    <Calendar v-model="date" showIcon iconDisplay="input" inputId="date" placeholder="Chọn ngày" class="w-full h-full"/>
                </div>
            </div>
            
        </div>
    </div>
</template>
<style scoped></style>