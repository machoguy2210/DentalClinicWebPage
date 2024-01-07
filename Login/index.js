
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
                        window.location.href = "";
                        localStorage.setItem("user", JSON.stringify(res.data[0].MAKH, res.data[0].HOTEN, res.data[0].EMAIL, res.data[0].SDT, res.data[0].DIACHI)); 
                    }
                }
            })
    }