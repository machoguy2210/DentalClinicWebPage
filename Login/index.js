
    document.getElementById("login").onclick = () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        if (email === "" || password === "") {
            alert("Please fill all the fields");
            return;
        }
        else
        axios.post(`http://localhost:3000/login`, { email, password })
            .then(res => {
                if (res.status == 200) {
                    if (res.data[0].CATEGORY == 0) {
                        window.location.href = `http://test2.local?customer_id=${res.data[0].MAKH}`;                        
                    }
                    else if (res.data[0].CATEGORY == 1) {
                        window.location.href = `http://test1.local/?staff_id=${res.data[0].MANV}&category=1`;
                    }
                    else {
                        window.location.href = `http://test1.local/?category=2`;                        
                    }
                }
                else {
                    alert("Email or password is incorrect");
                }
            })
    }