<?php
  class Record{

   protected $server;
   protected $user;
   protected $pass;
   protected $dbname;
   protected $pdo;

   public function __construct(){
      $this->server = "localhost";
      $this->user = "DBUSER2024";
      $this->pass = "DBPSWD2024";
      $this->dbname = "records";

      $this->pdo = new PDO("mysql:host=$this->server;dbname=$this->dbname;charset=utf8", $this->user, $this->pass);
   }

   public function insertRecord($nombre,$apellido,$nivel,$tiempo){
      $sql = "INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (:nombre, :apellido, :nivel, :tiempo)";
        
      $stmt = $this->pdo->prepare($sql);
      
      $stmt->bindParam(':nombre', $nombre);
      $stmt->bindParam(':apellido', $apellido);
      $stmt->bindParam(':nivel', $nivel);
      $stmt->bindParam(':tiempo', $tiempo);

      $stmt->execute();
   }

   public function getTop10($nivel) {
      $sql = "SELECT nombre, apellidos, tiempo FROM registro 
        WHERE ABS(nivel - :nivel) < 0.01   
        ORDER BY tiempo ASC LIMIT 10";//Hago el abs porque si no no se me enseñaban el 0.2 y el 0.8
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindParam(':nivel', $nivel);
      $stmt->execute();
      $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
      return $records;
  }


  }
  $nombre = "";
  $apellido = "";
  $nivel = 0;
  $tiempo = 0;
  if (count($_POST)>0) 
    {   
        $record = new Record();
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellidos"];
        $nivel = $_POST["nivel"];
        $tiempo = $_POST["tiempo"];
        $record->insertRecord($nombre,$apellido,$nivel,$tiempo);
        $record->getTop10($nivel);
        $topRecords = $record->getTop10($nivel);
    } else {
        $topRecords = [];
    }
?>
<!DOCTYPE HTML>
<html lang="es">

<head>
   <!-- Datos que describen el documento -->
   <meta charset="UTF-8" />
   <title> Semaforo</title>
   <script src="js/semaforo.js"></script>
   <meta name="author" content="Óscar Cervero Luiña" />
   <meta name="description" content="Juego del semáforo" />
   <meta name="keywords" content="juego,semaforo" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
   <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
   <link rel="stylesheet" type="text/css" href="estilo/semaforo_grid.css" />
   <link rel="icon" href="multimedia/imagenes/favicon.ico" />
</head>

<body>
   <!-- Datos con el contenido que aparece en el navegador -->
   <header>
      <h1><a href="index.html">F1 Desktop</a></h1>
      <nav>
         <a href="index.html">Inicio</a>
         <a href="piloto.html">Piloto</a>
         <a href="noticias.html">Noticias</a>
         <a href="calendario.html">Calendario</a>
         <a href="meteorologia.html">Meteorologia</a>
         <a href="circuito.html">Circuito</a>
         <a href="viajes.php">Viajes</a>
         <a href="juegos.html">Juegos</a>
      </nav>
   </header>
   <p>Estás en:<a href="index.html">Inicio</a>/<a href="juegos.html">Juegos</a>/Semaforo</p>
   <main>
      <h2> Juegos</h2>
      <section>
         <a href="memoria.html">
            <h3>Juego de memoria</h3>
         </a>
         <p>Juego donde tendrás que encontrar todas las parejas de imágenes</p>
         <a href="semaforo.php">
            <h3>Juego del semáforo</h3>
         </a>
         <p>Juego donde pondrás a prueba tu tiempo de reacción</p>
         <a href="api.html">
            <h3>Ejercicio libre js</h3>
         </a>
         <p>Juego donde podrás ver la distancia a la que estás de un circuito</p>
         <a href="php/libre.php">
            <h3>Ejercicio libre php</h3>
         </a>
         <p>Juego donde podrás crear tu propio piloto</p>
      </section>
      <section>
        <script>
            var semaforo=new Semáforo();
         </script>
      </section>
      <section>
         <h3>Top 10 mejores récords - Nivel: <?php echo "$nivel"; ?></h3>
         <ol>
         <?php
            if (!empty($topRecords)) {
               foreach ($topRecords as $record) {
                  echo "<li>{$record['nombre']} {$record['apellidos']} - {$record['tiempo']} segundos</li>";
               }
            } else {
               echo "<li>No hay récords disponibles para este nivel.</li>";
            }
         ?>
         </ol>
      </section>
   </main>
</body>

</html>