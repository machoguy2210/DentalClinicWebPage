    
    document.getElementById("signup").onclick = () => {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var name = document.getElementById("name").value;
        var phone = document.getElementById("phone").value;
        var address = document.getElementById("address").value;
        var birthday = document.getElementById("birthday").value;
        const genderRadio = document.querySelectorAll('input[name="gender"]');
        var gender = null;
        genderRadio.forEach(radio => {
            if (radio.checked) {
                gender = radio.value;
            }
        });
        const formData = {
            HOTEN: name,
            email: email,
            password: password,
            SDT: phone,
            GIOITINH: gender,
            DIACHI: address,
            NGAYSINH: birthday,
        }

        axios.get(`http://localhost:3000/customers/${email}`)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    alert("Email đã tồn tại!");
                } else if (res.status == 500) {
                    alert("Server Error!");
                } else if (res.status == 404) {
                    axios.post('http://localhost:3000/register', formData)
                        .then(res => {
                            console.log(res);
                            if (res.status == 201) {
                                alert("Đăng ký thành công!");
                            } else if (res.status == 500) {
                                alert("Server Error!");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }                   
                })
            .catch(err => {
                console.log(err);
            });
        
    }