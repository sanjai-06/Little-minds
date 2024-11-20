<?php
header('Content-Type: application/json');

// Database connection settings
$servername = "localhost";
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "login";
// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

// Get the JSON data from the request
$data = json_decode(file_get_contents('php://input'), true );

// Prepare and execute SQL query to store the data
$sql = "INSERT INTO mental_health_assessment (depression, anxiety, stress, emotion, sleep, anger) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iiiiii", 
    json_encode($data['depression']), 
    json_encode($data['anxiety']), 
    json_encode($data['stress']), 
    json_encode($data['emotion']), 
    json_encode($data['sleep']), 
    json_encode($data['anger'])
);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Data saved successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to store data']);
}

$stmt->close();
$conn->close();
?>
