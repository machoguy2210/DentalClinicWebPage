<?php
    $html = file_get_contents('index.html');
    echo $html;
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "dentalclinicdb";
    $conn = mysqli_connect($servername, $username, $password, $database);
    echo "Connected successfully";
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $_SESSION['userid'] = '135';
    $userid = $_SESSION['userid'];
    $name = $_POST['username'];
    $phone = $_POST['phone'];
    $date = $_POST['date'];
    $service = $_POST['service'];
    $dentist = $_POST['dentist'];
    $time = $_POST['time'];
    $note = $_POST['note'];
    $sql = "INSERT INTO appointment (MAKH,NGAYKHAM, HOTEN, PHONE, MADV, MANS, GHICHU, KHUNGGIO) VALUES ('$userid','$date','$name','$phone','$service','$dentist','$note','$time')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
        header("Location: http://localhost/DentalClinicWebPage/Appointment/index.html");
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
?>