<?php
require_once 'Creador.php';

class Insertar {

  private $pdo;

  public function __construct() {
        $creador = new Creador();
        $this->pdo = $creador->getPDO();
  }

  public function insertarPiloto($numero, $nombrePiloto, $apellido, $edad, $nacionalidad, 
                                  $nombreEquipo, $pais, $fans, $matricula, $modelo, $color) {
    try {
        $this->pdo->beginTransaction();

        $stmt = $this->pdo->prepare("SELECT 1 FROM Equipos WHERE nombreEquipo = :nombreEquipo LIMIT 1");
        $stmt->execute([':nombreEquipo' => $nombreEquipo]);
        if ($stmt->rowCount() == 0) {
            $stmt = $this->pdo->prepare("INSERT INTO Equipos (nombreEquipo, pais, numeroFans) 
                                         VALUES (:nombreEquipo, :pais, :numeroFans)");
            $stmt->execute([
                ':nombreEquipo' => $nombreEquipo,
                ':pais' => $pais,
                ':numeroFans' => $fans
            ]);
        }

        $stmt = $this->pdo->prepare("SELECT 1 FROM Pilotos WHERE numero = :numero LIMIT 1");
        $stmt->execute([':numero' => $numero]);
        if ($stmt->rowCount() == 0) {
            $stmt = $this->pdo->prepare("INSERT INTO Pilotos (numero, nombre, apellido, edad, nacionalidad) 
                                         VALUES (:numero, :nombre, :apellido, :edad, :nacionalidad)");
            $stmt->execute([
                ':numero' => $numero,
                ':nombre' => $nombrePiloto,
                ':apellido' => $apellido,
                ':edad' => $edad,
                ':nacionalidad' => $nacionalidad
            ]);
        }

        $stmt = $this->pdo->prepare("SELECT 1 FROM Coches WHERE matricula = :matricula LIMIT 1");
        $stmt->execute([':matricula' => $matricula]);
        if ($stmt->rowCount() == 0) {
            $stmt = $this->pdo->prepare("INSERT INTO Coches (matricula, modelo, color) 
                                         VALUES (:matricula, :modelo, :color)");
            $stmt->execute([
                ':matricula' => $matricula,
                ':modelo' => $modelo,
                ':color' => $color
            ]);
        }

        $stmt = $this->pdo->prepare("SELECT 1 FROM FormaParte WHERE numeroPiloto = :numeroPiloto AND nombreEquipoPiloto = :nombreEquipo LIMIT 1");
        $stmt->execute([
            ':numeroPiloto' => $numero,
            ':nombreEquipo' => $nombreEquipo
        ]);
        if ($stmt->rowCount() == 0) {
            $stmt = $this->pdo->prepare("INSERT INTO FormaParte (numeroPiloto, nombreEquipoPiloto) 
                                         VALUES (:numeroPiloto, :nombreEquipo)");
            $stmt->execute([
                ':numeroPiloto' => $numero,
                ':nombreEquipo' => $nombreEquipo
            ]);
        }

        $stmt = $this->pdo->prepare("SELECT 1 FROM Tiene WHERE numeroPilotoCoche = :numeroPiloto AND matriculaCoche = :matricula LIMIT 1");
        $stmt->execute([
            ':numeroPiloto' => $numero,
            ':matricula' => $matricula
        ]);
        if ($stmt->rowCount() == 0) {
            $stmt = $this->pdo->prepare("INSERT INTO Tiene (numeroPilotoCoche, matriculaCoche) 
                                         VALUES (:numeroPiloto, :matricula)");
            $stmt->execute([
                ':numeroPiloto' => $numero,
                ':matricula' => $matricula
            ]);
        }

        $this->pdo->commit();

        return "Piloto creado exitosamente.";
    } catch (Exception $e) {
        $this->pdo->rollBack();
        return "Error al crear el piloto: " . $e->getMessage();
    }
  }
}
require_once 'Insertar.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $numero = $_POST['numero'];
    $nombrePiloto = $_POST['nombrePiloto'];
    $apellido = $_POST['apellido'];
    $edad = $_POST['edad'];
    $nacionalidad = $_POST['nacionalidad'];
    $nombreEquipo = $_POST['nombreEquipo'];
    $pais = $_POST['pais'];
    $fans = $_POST['fans'];
    $matricula = $_POST['matricula'];
    $modelo = $_POST['modelo'];
    $color = $_POST['color'];

    if(empty($numero)||empty($nombrePiloto)||empty($apellido)||empty($edad)||empty($nacionalidad)
    ||empty($nombreEquipo)||empty($pais)||empty($fans)||empty($matricula)||empty($modelo)||empty($color)){
        echo("<p>Le ha faltado algún campo por rellenar</p>");
    }else {
        $insertar = new Insertar();

        $resultado = $insertar->insertarPiloto($numero, $nombrePiloto, $apellido, $edad, $nacionalidad, 
                                                $nombreEquipo, $pais, $fans, $matricula, $modelo, $color);

        if (strpos($resultado, "exitosamente") !== false) {
            header('Location: libre.php');
            exit();
        } else {
            echo $resultado;
        }
    }
}
?>