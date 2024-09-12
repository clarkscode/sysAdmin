<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");

// Database  settings
require 'db_connection.php';

// e collect ang data sa form
$data = json_decode(file_get_contents("php://input"));
// if ang data kay valid then mao nana 
if ($data) {
    $name = $data->name;
    $email = $data->email;
    $password = password_hash($data->password, PASSWORD_BCRYPT); 
    // Hash the password para secured

    // Diri na siya, we check kung existing na ba ang email sa database
    $checkEmailSql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($checkEmailSql);

    if ($result->num_rows > 0) {
        // Kung naay user nga registered na, return error message
        echo json_encode(["status" => "error", "message" => "User with this email is already registered!"]);
    } else {
        // Diri na dayun e insert ang user information sa database
        $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

        if ($conn->query($sql) === TRUE) {
            $userId = $conn->insert_id;
            echo json_encode(["status" => "success", "message" => "User registered successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
        }
    }
}

$conn->close();
?>
