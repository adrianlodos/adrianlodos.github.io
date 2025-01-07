<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Configuración del correo
    $to = "trinidad.ventanas@gmail.com";
    $subject = "Solicitud de Presupuesto desde Ventanas Trinidad";

    // Recopilar los datos del formulario
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $address = htmlspecialchars($_POST['address']);
    $description = htmlspecialchars($_POST['description']);

    // Cuerpo del correo
    $message = "Nombre: $name\n";
    $message .= "Correo Electrónico: $email\n";
    $message .= "Teléfono: $phone\n";
    $message .= "Dirección: $address\n";
    $message .= "Descripción del Proyecto:\n$description\n";

    // Cabeceras del correo
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Enviar correo
    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "Invalid request method.";
}
?>
