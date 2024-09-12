<?php
session_start();

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");

// Database  settings
require 'db_connection.php';

// e collect ang data sa form
$data = json_decode(file_get_contents("php://input"));

// If data is valid
if ($data) {
    $email = $data->email;
    $password = $data->password;

    // Check if ang email kay TAKEN na 
    $checkEmailSql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($checkEmailSql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // E Verify ang gi provide na password sa  hashed password sa database
        if (password_verify($password, $user['password'])) {
           // Generate a token simple random string
            $token = bin2hex(random_bytes(16));  
            
            // E Store ang  token og id 
            $_SESSION['token'] = $token;  
            $_SESSION['user_id'] = $user['id'];

            echo json_encode([
                "status" => "success",
                "message" => "Login successful!",
                "token" => $token,
                "user_id" => $user['id'] 
                
                ]);
        } else {
            // return error pag anmg password is MALI
            echo json_encode(["status" => "error", "message" => "Invalid password!"]);
        }
    } else {
        // pag ang email kay dili TAKEN / wala nag exist
        echo json_encode(["status" => "error", "message" => "Email not found!"]);
    }
}

$conn->close();
?>
