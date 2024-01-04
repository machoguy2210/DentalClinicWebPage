
    function timeReload() {
        var dentist = document.getElementById("dentist").value;
        var date = document.getElementById("date").value;
        console.log(dentist, date);
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
    
    function showDate() {
         var date = document.getElementById("date").value;
         console.log(date);
    };