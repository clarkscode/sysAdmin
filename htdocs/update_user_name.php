<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

// dapat naa ang session user ID or passed ID and ang name provided 
if (isset($data->id) && isset($data->name)) {
    $id = $data->id;  
    $name = $data->name;

    $query = "UPDATE users SET name = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("si", $name, $id);  

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Name updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update name"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
}
?>
