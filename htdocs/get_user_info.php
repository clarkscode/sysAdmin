<?php
session_start();

header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json");

require 'db_connection.php';

// Get user ID from session / localStorage
if (isset($_GET['id'])) {
    $user_id = $_GET['id'];

    
    $query = "SELECT id, name, email FROM users WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $user_id);
    
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            echo json_encode([
                "id" => $user['id'],
                "name" => $user['name'],
                "email" => $user['email']
            ]);
        } else {
            echo json_encode(["error" => "User not found"]);
        }
    } else {
        echo json_encode(["error" => "Failed to fetch user information"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["error" => "Invalid user ID"]);
}
?>
