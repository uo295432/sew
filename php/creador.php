<?php
class Creador {

    protected $server;
    protected $user;
    protected $pass;
    protected $dbname;
    protected $pdo;

    public function __construct() {
        $this->server = "localhost";
        $this->user = "DBUSER2024";
        $this->pass = "DBPSWD2024";
        $this->dbname = "creador";

        $this->pdo = new PDO("mysql:host=$this->server", $this->user, $this->pass);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->ejecutarSQL();
        $this->pdo->exec("USE $this->dbname");
    }

    public function ejecutarSQL() {
        $sql = file_get_contents('Base.sql');
        if ($sql) {
            $this->pdo->exec($sql);
        }
    }

    public function getPDO() {
        return $this->pdo;
    }

    public function obtenerPilotos() {
        $stmt = $this->pdo->prepare("SELECT numero, nombre, apellido, edad, nacionalidad FROM Pilotos");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC); 
    }

    public function obtenerEquipos() {
        $stmt = $this->pdo->prepare("SELECT nombreEquipo, pais, numeroFans FROM Equipos");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC); 
    }

    public function obtenerCoches() {
        $stmt = $this->pdo->prepare("SELECT matricula, modelo, color FROM Coches");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC); 
    }
}
?>