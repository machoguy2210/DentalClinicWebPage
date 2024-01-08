    
    function submit1() {
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
            EMAIL: email,
            PASSWORD: password,
            SDT: phone,
            GIOITINH: gender,
            DIACHI: address,
            NGAYSINH: birthday,
        }
        console.log(formData);
        {
            fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
            alert(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }