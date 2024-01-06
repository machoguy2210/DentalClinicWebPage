exports.doctor_info = function(req, res){
    res.sendFile(__dirname.replace('src','') + '/DoctorInfo.vue');
}