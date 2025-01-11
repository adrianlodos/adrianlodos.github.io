<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Configuración del correo
    $to = "trinidad.ventanas@gmail.com";
    $subject = "Solicitud de Presupuesto desde Ventanas Trinidad";

    // Recopilar y sanitizar los datos del formulario
    $name = isset($_POST['name']) ? htmlspecialchars(strip_tags(trim($_POST['name']))) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(strip_tags(trim($_POST['phone']))) : '';
    $address = isset($_POST['address']) ? htmlspecialchars(strip_tags(trim($_POST['address']))) : '';
    $description = isset($_POST['description']) ? htmlspecialchars(strip_tags(trim($_POST['description']))) : '';

    // Validar que todos los campos necesarios estén presentes
    if (empty($name) || empty($email) || empty($phone) || empty($address) || empty($description)) {
        echo "error: Todos los campos son obligatorios.";
        exit;
    }

    // Validar el formato del correo electrónico
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "error: Dirección de correo electrónico no válida.";
        exit;
    }

    // Cuerpo del correo
    $message = "Nombre: $name\n";
    $message .= "Correo Electrónico: $email\n";
    $message .= "Teléfono: $phone\n";
    $message .= "Dirección: $address\n";
    $message .= "Descripción del Proyecto:\n$description\n";

    // Cabeceras del correo
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Enviar correo
    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error: No se pudo enviar el correo.";
    }
} else {
    echo "error: Método de solicitud no válido.";
}
?>
