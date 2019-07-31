<?php

function getSubcategorias(){
  include('../config.php');
  $tipo = $_POST['tipo'];
  $query1 = "SELECT id AS ID FROM `categorias` WHERE tipo = '$tipo'";
  $row = mysqli_fetch_object($enlace->query($query1));

  $query = "SELECT * FROM `subcategorias` WHERE id_categoria = $row->ID";
  $result = $enlace->query($query);
  $subcategorias = '<option value="Seleccione una subcategoría">Seleccione una subcategoría</option>';
  while($row = $result->fetch_array(MYSQLI_ASSOC)){
    $subcategorias .= "<option value='$row[nombre]'>$row[nombre]</option>";
  }
  return $subcategorias;
}

echo getSubcategorias();

?>
