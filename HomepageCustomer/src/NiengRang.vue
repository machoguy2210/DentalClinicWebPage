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
        <div class="grid">
            <div class="col">
                <img src="../public/imagins/maccai.jpg" alt="" class="w-full">
            </div>
        </div>
        <div class="px-7 py-5 flex flex-column gap-3 line-height-3 text-justify">
          <p class="font-bold">1 – NIỀNG RĂNG MẮC CÀI KIM LOẠI</p>
          <p>Phương pháp này dùng những chiếc mắc cài chất liệu thường là inox, thép không gỉ, kết hợp với dây cung kim loại và dây thun cao su để giữ khung, định hình cấu trúc hàm, đồng thời tạo lực kéo dịch chuyển răng.</p>
          <p class="font-bold">Ưu điểm:</p>
          <p>Chi phí rẻ nhất trong các phương pháp niềng răng hiện nay. 
            Dây thun có nhiều mầu sắc, phù hợp cho trẻ em.
            Hiệu quả nắn chỉnh răng tốt
          </p>
          <p class="font-bold">Nhược điểm:</p>
          <p>Tính thẩm mỹ không cao vì các mắc cài lộ rõ trên răng</p>
          <p>Mắc cài dễ bị bong, bung bật dây cung khi ăn nhai mạnh hoặc hoạt động mạnh</p>
          <p>Dễ gây tổn thương các mô mềm trong khoang miệng (cắn môi, cắn má,…)</p>
          <p>Cần kiêng kỵ nhiều loại đồ ăn cứng, dai, dính</p>
          <p>Khó vệ sinh</p>
          <p>Thời gian tái khám trung bình 4 tuần</p>

        </div>
        <div class="px-7 py-5 flex flex-column gap-3 line-height-3 text-justify">
          <p class="font-bold">2 – MẮC CÀI TỰ BUỘC</p>
          <p>Thay vì sử dụng dây thun để giữ dây cung, mắc cài tự đóng có nắp trượt tự động hoặc cánh kim loại để đậy và giữ dây cung ở bên trong các rãnh mắc cài. Dây cung sẽ trượt tự do bên trong các rãnh mắc cài mà không cần phải giữ bằng các dây thun.</p>
          <p class="font-bold">Ưu điểm:</p>
          <p>Lực kéo răng ổn định giúp tăng hiệu quả chỉnh nha, giảm thời gian niềng răng</p>
          <p>Hạn chế được tình trạng thun bị giãn và bung tuột mắc cài.</p>
          <p>Tránh tình trạng bung bật hay thất lạc dây thun khi niềng răng,</p>
          <p>Giảm thời gian tới bác sỹ để điều chỉnh dây cung.</p>
          <p class="font-bold">Nhược điểm:</p>
          <p>Chi phí cao hơn các loại mắc cài niềng răng thông thường</p>
          <p>Mắc cài tự đóng thường có độ dày lớn, vướng víu môi má khi đeo.</p>
          <p>Thời gian tái khám trung bình 4 tuần</p>
        </div>

        <div class="px-7 py-5 flex flex-column gap-3 line-height-3 text-justify">
          <p class="font-bold">3 – MẮC CÀI SỨ</p>
          <p>Mắc cài sứ được làm từ hợp kim gốm và một số chất liệu vô cơ khác, có màu sắc trắng sáng tương đồng với màu của răng.</p>
          <p class="font-bold">Ưu điểm:</p>
          <p>Có tính thẩm mỹ cao do có màu sắc tương đồng như màu răng thật</p>
          <p>Chất liệu sứ, pha lê thân thiện với sức khỏe con người</p>
          <p class="font-bold">Nhược điểm:</p>
          <p>Giá niềng răng mắc cài sứ cao hơn so với niềng răng mắc cài kim loại.</p>
          <p>Do làm bằng vật liệu sứ, nên nếu va chạm mạnh thì mắc cài có thể bị vỡ</p>
          <p>Chốt niềng răng lớn hơn so với các loại khác có thể gây cảm giác không thoải mái</p>
          <p>Chân đế mắc cài sứ dễ bị nhiễm màu nếu không được vệ sinh đúng cách.</p>
          <p>Thời gian tái khám trung bình 4 tuần</p>
        </div>

        <div class="px-7 py-5 flex flex-column gap-3 line-height-3 text-justify">
          <p class="font-bold">4 – NIỀNG RĂNG MÁNG TRONG SUỐT INVISALIGN</p>
          <p>Là phương pháp niềng răng hiện đại nhất bây giờ.  Invisalign sử dụng hệ thống các “khay” trong suốt để di chuyển răng.  Mỗi khay sẽ di chuyển răng từng chút một, dần dần điều chỉnh các răng vào vị trí mong muốn, đem lại khớp cắn đúng và nụ cười đẹp.  Phương pháp này đã có mặt tại Mỹ từ hơn 25 năm. </p>
          <p class="font-bold">Ưu điểm:</p>
          <p>TRONG SUỐT nên không ai biết bạn đang niềng răng</p>
          <p>Điều trị hiệu quả các ca từ đơn giản đến phức tạp</p>
          <p>Thời gian điều trị NHANH HƠN so với mắc cài truyền thống từ 30% – 50%</p>
          <p>Tháo lắp DỄ DÀNG nên:</p>
          <p>              +Không phải kiêng khem bất cứ thức ăn gì.</p>
          <p>              +Vệ sinh răng miệng như bình thường, tốt cho nha chu </p>
          <p>Không cần phải đến gặp bác sĩ thường xuyên. Thời gian tái khám trung bình từ 6 – 8 tuần</p>
          <p>Phù hợp với mọi lứa tuổi, đặc biệt với khách hàng cần yêu cầu cao về thẩm mỹ, giao tiếp nhiều.</p>
          <p>Không gây đau đớn và khó chịu như sử dụng mắc cài.</p>
          <p class="font-bold">Nhược điểm:</p>
          <p>Chi phí cao</p>
          <p>Đòi hỏi công nghệ và trình độ chuyên môn bác sĩ cao</p>

        </div>

        <!-- BaseFooter -->
        <BaseFooter></BaseFooter>
      
        </div>
    
  </div>
</template>
<style>

</style>