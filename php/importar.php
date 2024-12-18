<?php
  class Importar{
   protected $pdo;

   public function __construct($pdo) {
    $this->pdo = $pdo;
   }

   public function importarDatos($filePath) {
    if (($handle = fopen($filePath, "r")) !== FALSE) {
       while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
          $numero = $data[0]; 
          $nombre = $data[1]; 
          $apellido = $data[2]; 
          $edad = $data[3]; 
          $nacionalidad = $data[4]; 
          $equipo = $data[5]; 
          $pais = $data[6];
          $numeroFans = $data[7]; 
          $matricula = $data[8];
          $modelo = $data[9];
          $color = $data[10];

          $sqlPiloto = "INSERT INTO Pilotos (numero, nombre, apellido, edad, nacionalidad) 
                        VALUES (?, ?, ?, ?, ?)";
          $stmt = $this->pdo->prepare($sqlPiloto);
          $stmt->execute([$numero, $nombre, $apellido, $edad, $nacionalidad]);

          $sqlEquipo = "INSERT INTO Equipos (nombreEquipo, pais, numeroFans) 
                        VALUES (?, ?, ?)";
          $stmt = $this->pdo->prepare($sqlEquipo);
          $stmt->execute([$equipo, $pais, $numeroFans]);

          $sqlCoches = "INSERT INTO Coches (matricula, modelo, color) 
                        VALUES (?, ?, ?)";
          $stmt = $this->pdo->prepare($sqlCoches);
          $stmt->execute([$matricula, $modelo, $color]);

          $sqlRelacion = "INSERT INTO FormaParte (numeroPiloto, nombreEquipoPiloto) 
                          VALUES (?, ?)";
          $stmt = $this->pdo->prepare($sqlRelacion);
          $stmt->execute([$numero, $equipo]);

          $sqlRelacionCoche = "INSERT INTO Tiene (numeroPilotoCoche, matriculaCoche) 
                          VALUES (?, ?)";
          $stmt = $this->pdo->prepare($sqlRelacionCoche);
          $stmt->execute([$numero, $matricula]);
       }

       fclose($handle);
    } else {
       echo "Error al abrir el archivo CSV.";
    }
   }
}
require_once 'creador.php';
require_once 'Importar.php';
$creador = new Creador();

$importar = new Importar($creador->getPDO());

if (isset($_FILES['csvFile']) && $_FILES['csvFile']['error'] === UPLOAD_ERR_OK) {
    $filePath = $_FILES['csvFile']['tmp_name'];

    $importar->importarDatos($filePath);
    header("Location: libre.php");
    exit();
}
?>