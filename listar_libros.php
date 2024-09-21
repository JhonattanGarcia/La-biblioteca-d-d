<?php
$directory = 'Libros/';
$files = scandir($directory); // Obtener todos los archivos del directorio

// Filtrar solo los archivos .txt
$libros = array_filter($files, function($file) use ($directory) {
    return is_file($directory . $file) && pathinfo($file, PATHINFO_EXTENSION) === 'txt';
});

// Devolver la lista de libros como JSON
echo json_encode(array_values($libros));
?>
