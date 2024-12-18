<?php
class Exportar {

    protected $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function exportarDatos() {
        $fileName = 'datos_exportados.csv';

        $file = fopen($fileName, 'w');
        if ($file === false) {
            die("Error al crear el archivo CSV.");
        }

        $query = "
            SELECT DISTINCT
                p.numero, 
                p.nombre, 
                p.apellido, 
                p.edad, 
                p.nacionalidad, 
                e.nombreEquipo AS equipo, 
                e.pais, 
                e.numeroFans, 
                c.matricula, 
                c.modelo, 
                c.color
            FROM Pilotos p
            INNER JOIN FormaParte fp ON p.numero = fp.numeroPiloto
            INNER JOIN Equipos e ON fp.nombreEquipoPiloto = e.nombreEquipo
            LEFT JOIN (
    SELECT numeroPilotoCoche, matriculaCoche 
    FROM Tiene 
    GROUP BY numeroPilotoCoche
) t ON t.numeroPilotoCoche = p.numero
LEFT JOIN Coches c ON c.matricula = t.matriculaCoche;
        ";

        $stmt = $this->pdo->query($query);
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            fputcsv($file, $row, ';');
        }
        fclose($file);

        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $fileName . '"');
        header('Pragma: no-cache');
        header('Expires: 0');

        readfile($fileName);

        unlink($fileName);
    }
}
require_once 'Creador.php';
$creador = new Creador();
$pdo = $creador->getPDO();
$exportar = new Exportar($pdo);
$exportar->exportarDatos();
?>