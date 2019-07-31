<?PHP

$host = "127.0.0.1";
$dbuser = "comunidadusr";
$pwd = "c0mun1d4dpw";
$db = "comunidad_mi_unidad";

$enlace = new mysqli($host, $dbuser, $pwd, $db);
mysqli_set_charset($enlace, "utf8");

/*$enlace = mysqli_connect($host, $dbuser, $pwd, $db);*/

if (!$enlace) {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo mysqli_connect_error() . PHP_EOL;
    exit;
}

//echo "Conexión exitosa a MySQL!" . PHP_EOL;
//echo "<br>";
?>
