    function getCustomerID() {
        var MAKH;
        // Kiểm tra xem ID đã được lưu trong localStorage chưa
        MAKH = localStorage.getItem("customer_id");
        if (MAKH == null) {
            // Nếu chưa có ID trong localStorage, thử lấy từ URL
            var urlParams = new URLSearchParams(window.location.search);
            MAKH = urlParams.get("customer_id");

            // Kiểm tra xem có ID từ URL hay không
            if (MAKH != null) {
            // Lưu ID vào localStorage để sử dụng sau này
            localStorage.setItem("customer_id", MAKH);
            }
        }
        return MAKH;
    };
    var MAKH;
    document.addEventListener("DOMContentLoaded", function () {
    var MAKH = getCustomerID();
    console.log(MAKH);
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        axios.get(`http://localhost:3000/api/allnhasi`)
            .then(function (response) {
                var data = response.data;
                var select = document.getElementById("dentist");
                select.innerHTML = `<option value="" disabled selected hidden>Choose Dentist</option>`;
                for (var i = 0; i < data.length; i++) {
                    var option = document.createElement("option");
                    option.value = data[i].MANS;
                    option.textContent = data[i].TENNS;
                    select.appendChild(option);
                  }
                })
                .catch(function (error) {
                  console.error("Lỗi khi tải dữ liệu từ server:", error);
                });
            
    });
    document.addEventListener("DOMContentLoaded", function () {
        axios.get(`http://localhost:3000/api/alldichvu`)
            .then(function (response) {
                var data = response.data;
                var select = document.getElementById("service");
                select.innerHTML = `<option value="" disabled selected hidden>Choose Service</option>`;
                for (var i = 0; i < data.length; i++) {
                    var option = document.createElement("option");
                    option.value = data[i].MADV;
                    option.textContent = data[i].TENDV;
                    select.appendChild(option);
                  }
                })
                .catch(function (error) {
                  console.error("Lỗi khi tải dữ liệu từ server:", error);
                });
    });
        
    function timeReload() {
        var dentist = document.getElementById("dentist").value;
        var date = document.getElementById("date").value;
        if (date == null || dentist == "") return;
        axios.get(`http://localhost:3000/api/appointments/get/` + date + `/` + dentist)
            .then(function (response) {
                if (response.data != null) console.log(response.data);
                var data = response.data;
                var radioButtons = document.querySelectorAll('input[type="radio"]');
                radioButtons.forEach(radio => {
                    for (var i = 0; i < data.length; i++) {
                        if (radio.value == data[i].KHUNGGIO) {
                            radio.disabled = true;
                            radio.checked = false;
                        }
                    }
                })
            })
    };
    function submitForm() {
        var customer_id = MAKH;
        var name = document.getElementById("name").value;
        var phone = document.getElementById("phone").value;
        var dentist = document.getElementById("dentist").value;
        var date = document.getElementById("date").value;
        var time = document.querySelector('input[name="time"]:checked').value;
        var service = document.getElementById("service").value;
        var note = document.getElementById("note").value;
        var appointment = {
            MAKH: customer_id,
            HOTEN: name,
            PHONE: phone,
            MANS: dentist,
            NGAYKHAM: date,
            KHUNGGIO: time,
            MADV: service,  
            GHICHU: note
        }
        axios.post(`http://localhost:3000/api/appointments/create`, appointment)
            .then(function (response) {
                console.log(response);
                alert("Appointment created successfully!");
                window.location.href = "http://localhost:3000/customer/appointment";
            })
            .catch(function (error) {
                console.error(error);
            });
    }