    document.addEventListener("DOMContentLoaded", function () {
        axios.get(`http://localhost:3000/api/allnhasi`)
            .then(function (response) {
                var data = response.data;
                var select = document.getElementById("dentist");
                for (var i = 0; i < data.length; i++) {
                    var html = document.getElementById("dentist").innerHTML;
                    html += `<option value="${data[i].MANS}">${data[i].TENNS}</option>`;
                }
                select.innerHTML = html;
            })
    });
    document.addEventListener("DOMContentLoaded", function () {
        axios.get(`http://localhost:3000/api/alldichvu`)
            .then(function (response) {
                var data = response.data;
                var select = document.getElementById("service");
                for (var i = 0; i < data.length; i++) {
                    var html = document.getElementById("service").innerHTML;
                    html += `<option value="${data[i].MADV}">${data[i].TENDV}</option>`;
                }
                select.innerHTML = html;
            })
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
    
    function showDate() {
         var date = document.getElementById("date").value;
         console.log(date);
    };