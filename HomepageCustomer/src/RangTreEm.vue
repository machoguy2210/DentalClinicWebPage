<script setup>
import TopBar from './TopBar.vue';
import Menu from './Menu.vue';
import BaseFooter from './BaseFooter.vue'
</script>
<template>
    <div>
      <div>
        <!-- TopBar -->
        <TopBar></TopBar>
        <!-- Menu -->
        <Menu></Menu>
        <div class="surface-300 mt-5 mx-8" style="height: 105rem;">
            <div class="grid flex">
                <div class="col mt-8">
                    <p class="font-bold text-3xl">HÀN DỰ PHÒNG SÂU RĂNG</p>
                    <p class="text-2xl">Sâu răng là một bệnh phổ biến nhất hiện nay đối với các em nhỏ lứa tuổi học đường. Bệnh sâu răng nếu không được điều trị kịp thời sẽ dẫn tới các biến chứng ảnh hưởng đến sức khỏe. Do vậy điều trị dự phòng ngăn ngừa sâu răng đóng vai trò rất quan trọng. Trám bít hố rãnh là một biện pháp rất hiệu quả để phòng ngừa sâu răng sớm.</p>
                </div>
                <div class="col">
                    <img src="../public/imagins/sau-rang-tre-em.jpg" alt="">
                </div>

            </div>
            <div class="grid flex">
                <div class="col mt-8">
                    <p class="font-bold text-3xl">NHỔ RĂNG SỮA</p>
                    <p class="text-2xl">Nhổ răng sữa cho trẻ nhẹ nhàng và không đau sẽ giúp loại bỏ răng sữa bị viêm nhiễm hoặc bị lung lay nhưng không rụng để răng vĩnh viễn mọc lên đúng vị trí cho bé hàm răng đều đẹp tự nhiên.</p>
                </div>
                <div class="col">
                    <img src="../public/imagins/nho-rang-sua.jpg" alt="" class="w-35rem h-25rem " >
                </div>

            </div>
            <div class="grid flex">
                <div class="col mt-8">
                    <p class="font-bold text-3xl">DÍNH PHANH MÔI, PHANH LƯỠI</p>
                    <p class="text-2xl">Ngắn thắng lưỡi là một dị tật bẩm sinh ở trẻ, gây ảnh hưởng nhiều đến trẻ khi nuốt và phát âm.
Thủ thuật thì lại rất đơn giản, chỉ cần dùng kéo cắt ngay phần màng, không cần thuốc tê, hầu như không chảy máu, rất ít đau, bé bú lại ngay sau khi cắt từ 10 đến 15 phút không làm tổn thương đến tâm lý trẻ về sau, làm gia đình an tâm không phải lo lắng theo dõi. Không nên trì hoãn vì càng lớn mạch máu và thần kinh đến nuôi thắng lưỡi sẽ nhiều hơn do vậy sẽ đau hơn, chảy máu nhiều hơn.

 </p>
                </div>
                <div class="col">
                    <img src="../public/imagins/dinh-thang-luoi-1.jpg" alt="" class="h-25rem " style="width: 35rem;">
                </div>

            </div>

            <div class="grid flex">
                <div class="col mt-8">
                    <p class="font-bold text-3xl">NIỀNG RĂNG TỪ SỚM</p>
                    <p class="text-2xl">Là phương pháp Niềng Răng bằng máng trong suốt thiết kế đặc biệt cho lứa tuổi còn nhỏ từ 5 đến 10 tuổi vẫn còn một số răng sữa và đang mọc răng vĩnh viễn, mà không cần phải đeo mắc cài kim loại truyền thống.</p>
                    <p class="text-2xl mt-5">Invisalign First cho thấy trước được kết quả, nắn chỉnh răng cho trẻ trong khi mở rộng cung hàm và tạo chỗ cho răng hiện tại và răng vĩnh viễn sắp mọc, nhằm đảm bảo xương hàm, sọ mặt phát triển bình thường, đảm bảo tính thẩm mỹ, sức khỏe răng miệng cho trẻ đến khi trưởng thành. Điều đặc biệt hơn là giúp trẻ tự tin ngay khi còn nhỏ.

</p>
                </div>
                <div class="col">
                    <img src="../public/imagins/OIP.jpg" alt="" class="h-25rem " style="width: 35rem" >
                </div>

            </div>

        </div>
        <!-- BaseFooter -->
        <BaseFooter></BaseFooter>
      
        </div>
    </div>
</template>
<style>

</style>