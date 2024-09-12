<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

// Dapat naa ang user ID og new email 
if (isset($data->id) && isset($data->email)) {
    $id = $data->id;  // user ID gikan sa frontend
    $email = $data->email;

    // SQL statement para ma  update ang email
    $query = "UPDATE users SET email = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("si", $email, $id);  
   
    /**e aind ang parameters 
     * si ( meaning string og integer )
     * og ma prevent ang sql injection
     */

   
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Email updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update email"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
}
?>
