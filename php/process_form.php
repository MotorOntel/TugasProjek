<?php
/**
 * Form Contact Handler
 * Program Studi Teknik Komputer
 * 
 * File ini memproses data dari form kontak HTML dan mengirimkan email
 */

// Set header untuk JSON response
header('Content-Type: application/json');

// Fungsi untuk sanitasi input
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Fungsi untuk validasi email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Inisialisasi response
$response = [
    'success' => false,
    'message' => ''
];

// Cek apakah request method adalah POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Method request tidak valid!';
    echo json_encode($response);
    exit;
}

try {
    // Ambil dan sanitasi data dari form
    $name = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? sanitizeInput($_POST['phone']) : '';
    $subject = isset($_POST['subject']) ? sanitizeInput($_POST['subject']) : '';
    $message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';
    
    // Validasi field wajib
    if (empty($name)) {
        throw new Exception('Nama lengkap harus diisi!');
    }
    
    if (empty($email)) {
        throw new Exception('Email harus diisi!');
    }
    
    if (!validateEmail($email)) {
        throw new Exception('Format email tidak valid!');
    }
    
    if (empty($subject)) {
        throw new Exception('Subjek harus dipilih!');
    }
    
    if (empty($message)) {
        throw new Exception('Pesan harus diisi!');
    }
    
    // Validasi panjang pesan
    if (strlen($message) < 10) {
        throw new Exception('Pesan minimal 10 karakter!');
    }
    
    // Format subjek untuk email
    $subjectMap = [
        'informasi' => 'Informasi Program Studi',
        'pendaftaran' => 'Pendaftaran Mahasiswa Baru',
        'kerjasama' => 'Kerjasama',
        'lainnya' => 'Lainnya'
    ];
    
    $emailSubject = isset($subjectMap[$subject]) ? $subjectMap[$subject] : 'Pesan Baru';
    
    // Email tujuan (ganti dengan email yang sesuai)
    $to = 'info@teknikomputer.ac.id';
    
    // Buat pesan email
    $emailMessage = "
    ====================================
    PESAN BARU DARI WEBSITE
    ====================================
    
    Nama: {$name}
    Email: {$email}
    Telepon: " . ($phone ? $phone : '-') . "
    Subjek: {$emailSubject}
    
    Pesan:
    {$message}
    
    ====================================
    Dikirim pada: " . date('d/m/Y H:i:s') . "
    IP Address: " . $_SERVER['REMOTE_ADDR'] . "
    ====================================
    ";
    
    // Header email
    $headers = "From: {$name} <{$email}>\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Simpan data ke file (untuk backup/log)
    $logFile = 'contact_logs.txt';
    $logData = date('Y-m-d H:i:s') . " | {$name} | {$email} | {$subject}\n";
    file_put_contents($logFile, $logData, FILE_APPEND);
    
    // Simpan data ke file JSON (opsional - untuk database sederhana)
    $jsonFile = 'contact_data.json';
    $contactData = [
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'subject' => $subject,
        'message' => $message,
        'ip_address' => $_SERVER['REMOTE_ADDR']
    ];
    
    // Baca data yang sudah ada
    $existingData = [];
    if (file_exists($jsonFile)) {
        $existingData = json_decode(file_get_contents($jsonFile), true);
        if (!is_array($existingData)) {
            $existingData = [];
        }
    }
    
    // Tambahkan data baru
    $existingData[] = $contactData;
    
    // Simpan kembali ke file
    file_put_contents($jsonFile, json_encode($existingData, JSON_PRETTY_PRINT));
    
    // Kirim email (uncomment jika server sudah dikonfigurasi untuk mengirim email)
    /*
    if (!mail($to, "Website Contact: {$emailSubject}", $emailMessage, $headers)) {
        throw new Exception('Gagal mengirim email. Silakan coba lagi nanti.');
    }
    */
    
    // Response sukses
    $response['success'] = true;
    $response['message'] = 'Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.';
    $response['data'] = [
        'name' => $name,
        'email' => $email,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
}

// Kirim response
echo json_encode($response);
exit;
?>
