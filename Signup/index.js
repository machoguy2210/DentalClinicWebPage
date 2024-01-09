    
    function submitForm() {
        var EMAIL = document.getElementById("email").value;
        var PASSWORD = document.getElementById("password").value;
        var HOTEN = document.getElementById("name").value;
        var SDT = document.getElementById("phone").value;
        var DIACHI = document.getElementById("address").value;
        var NGAYSINH = document.getElementById("birthday").value;
        const genderRadio = document.querySelectorAll('input[name="gender"]');
        var GIOITINH = null;
        genderRadio.forEach(radio => {
            if (radio.checked) {
                GIOITINH = radio.value;
            }
        });
        axios.post('http://localhost:3000/register', {HOTEN, EMAIL, PASSWORD, SDT, GIOITINH, DIACHI, NGAYSINH})
            .then(function (response) {
                if (response.status == 200) {
                    alert("Đăng ký thành công!");
                    window.location.href = "http://login.local";
                }
                else {
                    alert("Đăng ký thất bại!");
                }
            })
            .catch(function (error) {
                console.error("Lỗi khi tải dữ liệu từ server:", error);
            });
    }