<?php
  require_once 'Creador.php';
  $creador = new Creador();
  $pilotos = $creador->obtenerPilotos();
  $equipos = $creador->obtenerEquipos();
  $coches = $creador->obtenerCoches();
?>
<!DOCTYPE HTML>
<html lang="es">

<head>
   <!-- Datos que describen el documento -->
   <meta charset="UTF-8" />
   <title> LibrePhp</title>
   <meta name="author" content="Óscar Cervero Luiña" />
   <meta name="description" content="Ejercicio libre php" />
   <meta name="keywords" content="php,bases,datos,nube" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
   <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
   <link rel="stylesheet" type="text/css" href="../estilo/php.css" />
   <link rel="icon" href="multimedia/imagenes/favicon.ico" />
</head>

<body>
   <!-- Datos con el contenido que aparece en el navegador -->
   <header>
      <h1><a href="index.html">F1 Desktop</a></h1>
      <nav>
         <a href="../index.html">Inicio</a>
         <a href="../piloto.html">Piloto</a>
         <a href="../noticias.html">Noticias</a>
         <a href="../calendario.html">Calendario</a>
         <a href="../meteorologia.html">Meteorologia</a>
         <a href="../circuito.html">Circuito</a>
         <a href="../viajes.php">Viajes</a>
         <a href="../juegos.html">Juegos</a>
      </nav>
   </header>
   <p>Estás en:<a href="index.html">Inicio</a>/<a href="juegos.html">Juegos</a>/LibrePhp</p>
   <main>
      <h2> Juegos</h2>
      <section>
         <a href="../memoria.html">
            <h3>Juego de memoria</h3>
         </a>
         <p>Juego donde tendrás que encontrar todas las parejas de imágenes</p>
         <a href="../semaforo.php">
            <h3>Juego del semáforo</h3>
         </a>
         <p>Juego donde pondrás a prueba tu tiempo de reacción</p>
         <a href="../api.html">
            <h3>Ejercicio libre js</h3>
         </a>
         <p>Juego donde podrás ver la distancia a la que estás de un circuito</p>
         <a href="libre.php">
            <h3>Ejercicio libre php</h3>
         </a>
         <p>Juego donde podrás crear tu propio piloto</p>
      </section>
      <section>
        <h3>Importar y exportar datos</h3>
        <form action="importar.php" method="POST" enctype="multipart/form-data">
            <label for="csvFile">Selecciona el archivo CSV:</label>
            <input type="file" id="csvFile" name="csvFile" accept=".csv" required />
            <button type="submit">Importar Datos</button>
        </form>
        <form action="exportar.php" method="POST">
            <button type="submit">Exportar Datos a CSV</button>
        </form>
      </section>
      <section>
        <h3>Crear tu propio piloto</h3>
        <p>Rellena los datos de este formulario para crear tu propio piloto. Un piloto puede pertenecer a varias escuderías distintas
         y tener varios coches. Para ponerle más escuderías o coches a un piloto existente basta con poner su número de piloto en el formulario.
         Cada piloto tiene un único número de piloto.
        </p>
        <form action="insertar.php" method="POST">
            <label for="numero">Número del piloto:</label>
            <input type="text" id="numero" name="numero" /> 
            <label for="nombrePiloto">Nombre del piloto:</label>
            <input type="text" id="nombrePiloto" name="nombrePiloto" />   
            <label for="apellido">Apellido del piloto:</label>
            <input type="text" id="apellido" name="apellido" />   
            <label for="edad">Edad del piloto:</label>
            <input type="text" id="edad" name="edad" />  
            <label for="nacionalidad">Nacionalidad del piloto:</label>
            <input type="text" id="nacionalidad" name="nacionalidad" />  
            <label for="nombreEquipo">Nombre del equipo:</label>
            <input type="text" id="nombreEquipo" name="nombreEquipo" />   
            <label for="pais">País del equipo:</label>
            <input type="text" id="pais" name="pais" />  
            <label for="fans">Número de fans del equipo:</label>
            <input type="text" id="fans" name="fans" />  
            <label for="matricula">Matrícula del coche:</label>
            <input type="text" id="matricula" name="matricula" />
            <label for="modelo">Modelo del coche:</label>
            <input type="text" id="modelo" name="modelo" /> 
            <label for="color">Color del coche:</label>
            <input type="text" id="color" name="color" /> 
            <input type="submit" value="Crear" />
         </form>
      </section>
      <section>
         <h3>Lista con los pilotos</h3>
         <ul>
         <?php
         foreach ($pilotos as $piloto) {
            echo "<li>{$piloto['numero']} {$piloto['nombre']} {$piloto['apellido']} {$piloto['edad']} {$piloto['nacionalidad']}</li>";
         }
         ?>
         </ul>
         <h3>Lista con los equipos</h3>
         <ul>
         <?php
         foreach ($equipos as $equipo) {
            echo "<li>{$equipo['nombreEquipo']} {$equipo['pais']} {$equipo['numeroFans']}</li>";
         }
         ?>
         </ul>
         <h3>Lista con los coches</h3>
         <ul>
         <?php
         foreach ($coches as $coche) {
            echo "<li>{$coche['matricula']} {$coche['modelo']} {$coche['color']}</li>";
         }
         ?>
         </ul>
      </section>
   </main>
</body>

</html>