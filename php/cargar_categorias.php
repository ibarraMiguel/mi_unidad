<?php

function getCat(){
  include('../config.php');
  $query = 'SELECT * FROM `categorias`';
  $result = $enlace->query($query);
  $categorias = '<option value="Seleccione una categoría">Seleccione una categoría</option>';
  while($row = $result->fetch_array(MYSQLI_ASSOC)){
    $categorias .= "<option value='$row[tipo]'>$row[tipo]</option>";
  }
  return $categorias;
}

echo getCat();

?>
