<?php
  function getCont(){
    include('../config.php');
    $noticias = "";

    if (isset($_POST['tipo'])) {
      $tipo = $_POST['tipo'];
    }

    if (isset($_POST['tipo2'])){
      $tipo2 = $_POST['tipo2'];
    }else {
      $tipo2 = "";
    }

    if ($tipo2 == "") {
      $query = "SELECT * FROM `noticias` WHERE `categoria`='".$tipo."'";
      $result = $enlace->query($query);

      if ($result) {
        while($row = $result->fetch_array(MYSQLI_ASSOC)){
          $formatosImg = array('.jpg', '.JPG', '.png', '.PNG', '.gif', '.GIF');
          $formatosVdo = array('.3gp', '.avi', '.flv', '.mkv', '.mp4', '.mpg');
          $formatosFiles = array('.docx','.doc','.dotx','.pdf','.xlsx');
          $carpeta = '../Archivos/'.$row["fechaCreacion"];
          $arc = "";

          if ($row["estado"] == 1) {
            if(is_dir($carpeta)){
                if($dir = opendir($carpeta)){
                    while(($archivo = readdir($dir)) !== false){
                        if($archivo != '.' && $archivo != '..' && $archivo != '.htaccess'){
                            $ext = substr($archivo, strrpos($archivo, '.'));
                            if(in_array($ext, $formatosImg)){
                                $arc .= "<img src='$carpeta/$archivo' width='360' height='250'>";
                            }
                            if(in_array($ext, $formatosVdo)){
                                $var = explode('.', $ext);
                                $arc .= "<br><video width='360' height='250' controls><source src='$carpeta/$archivo' type='video/$var[1]'></video>";
                            }
                            if(in_array($ext, $formatosFiles)){
                              if ($ext=='.pdf') {
                                $arc.="<a href='$carpeta/$archivo'><img src='../images/pdf.png'/></a>";               
                              }
                              if ($ext=='.docx' || $ext=='.doc' || $ext=='.dotx' ) {
                                $arc.="<a href='$carpeta/$archivo'><img src='../images/doc.png'/></a>"; 
                              }
                              if ($ext=='.xlsx') {
                                $arc.="<a href='$carpeta/$archivo'><img src='../images/excel.png'/></a>";
                              }
                            }
                        }
                    }
                    closedir($dir);
                }
            }

            $noticias .= "<div class='container'>
                            <div class='table-responsive-sm'>
                              <table class='table'>
                                <thead>
                                  <tr class='warning'>
                                    <td style='text-align:center; font-size:120%; font-weight: bold;'><strong>".$row["titulo"]."</strong></td>
                                  </tr>
                                </thead>
                              </table>
                              <table class='table'>
                                <tbody>
                                  <tr class='active'>
                                    <td class='col-sm-12' style='text-align:justify'>
                                      <div style='text-align: center'>
                                        ".$arc."
                                      </div><br>
                                      <span style='font-weight: bold'>Categoría: </span>".$row["categoria"]."<br><br>
                                      <span style='font-weight: bold'>Fecha de publicación: </span>".$row["fechaCreacion"]."<br><br>".
                                      $row["descripcion"]."<br><br>
                                      <span style='font-weight: bold'>Referencia: </span>".$row["referencia"]."
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>";
          }
          // $noticias .= $row["titulo"]."<br><br>Categoría: ".$row["categoria"]."<br><br>Fecha de publicación: "
          // .$row["fechaCreacion"]."<br><br>".$row["descripcion"]."<br>".$arc."Fuente: ".$row["referencia"]."<hr>";
        }
        return $noticias;
      }else {
        return "mal";
      }
    } else {
      $query = "SELECT * FROM `noticias` WHERE `subcategoria`='".$tipo2."'";
      $result = $enlace->query($query);

      if ($result) {
        while($row = $result->fetch_array(MYSQLI_ASSOC)){
          $formatosImg = array('.jpg', '.JPG', '.png', '.PNG', '.gif', '.GIF');
          $formatosVdo = array('.3gp', '.avi', '.flv', '.mkv', '.mp4', '.mpg');
          $formatosFiles = array('.docx','.doc','.dotx','.pdf','.xlsx');
          $carpeta = '../Archivos/'.$row["fechaCreacion"];
          $arc = "";

          if ($row["estado"] == 1) {
            if(is_dir($carpeta)){
                if($dir = opendir($carpeta)){
                    while(($archivo = readdir($dir)) !== false){
                        if($archivo != '.' && $archivo != '..' && $archivo != '.htaccess'){
                            $ext = substr($archivo, strrpos($archivo, '.'));
                            if(in_array($ext, $formatosImg)){
                                $arc .= "<img src='$carpeta/$archivo' width='360' height='250'>";
                            }
                            if(in_array($ext, $formatosVdo)){
                                $var = explode('.', $ext);
                                $arc .= "<br><video width='360' height='250' controls><source src='$carpeta/$archivo' type='video/$var[1]'></video>";
                            }
                            if(in_array($ext, $formatosFiles)){
                              if ($ext=='.pdf') {
                                $arc.="<a href='$carpeta/$archivo'><img src='../images/pdf.png'/></a>";               
                              }
                              if ($ext=='.docx' || $ext=='.doc' || $ext=='.dotx' ) {
                                $arc.="<a href='$carpeta/$archivo'><img src='../images/doc.png'/></a>"; 
                              }
                              if ($ext=='.xlsx') {
                                $arc.="<a href='$carpeta/$archivo'><img src='../images/excel.png'/></a>";
                              }
                            }
                        }
                    }
                    closedir($dir);
                }
            }

            $noticias .= "<div class='container'>
                            <div class='table-responsive-sm'>
                              <table class='table'>
                                <thead>
                                  <tr class='warning'>
                                    <td style='text-align:center'><strong>".$row["titulo"]."</strong></td>
                                  </tr>
                                </thead>
                              </table>
                              <table class='table'>
                                <tbody>
                                  <tr class='active'>
                                    <td class='col-sm-4' style='text-align:justify'>
                                      <strong>subcategoría: </strong>".$row["subcategoria"]."<br><br>
                                      <strong>Fecha de publicación: </strong>".$row["fechaCreacion"]."<br><br>".
                                      $row["descripcion"]."<br>
                                      <strong>Fuente: </strong>".$row["referencia"]."
                                    </td>
                                    <td class='col-sm-8' style='text-align:right'>
                                      ".$arc."
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>";

          }
          // $noticias .= $row["titulo"]."<br><br>Categoría: ".$row["categoria"]."<br><br>Fecha de publicación: "
          // .$row["fechaCreacion"]."<br><br>".$row["descripcion"]."<br>".$arc."Fuente: ".$row["referencia"]."<hr>";
        }
        return $noticias;
      }else {
        return "mal";
      }
    }
  }

  echo getCont();

?>
