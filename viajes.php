<?php
  class Carrusel{
   protected $pais;
   protected $capital;
   public function __construct($pais,$capital){
      $this->pais = $pais;
      $this->capital = $capital;
   }

   public function getPais(){
      return $this->pais;
   }

   public function getCapital(){
      return $this->capital;
   }
  }
  class Moneda{//He usado fixer.io para el cambio de moneda
   protected $local;
   protected $euros;
   protected $access_key = 'ebca8a3d0524a97df162e6446f6bb2d3';
   public function __construct($local,$euros){
      $this->local = $local;
      $this->euros = $euros;
   }

   public function obtenerTasaDeCambio($from, $to) {
      $url = "http://data.fixer.io/api/latest?access_key={$this->access_key}&symbols={$from},{$to}";
      $respuesta = file_get_contents($url);
      $data = json_decode($respuesta, true);
      
      if (isset($data['rates'][$from]) && isset($data['rates'][$to])) {
         $tasaDeCambio = $data['rates'][$to] / $data['rates'][$from];
         return $tasaDeCambio;
      } else {
         return false; 
      }
   }
   public function convertir($from, $to, $amount) {
      $tasaDeCambio = $this->obtenerTasaDeCambio($from, $to);
      return $amount * $tasaDeCambio;
   }
  }
  $carrusel = new Carrusel("Azerbaijan","Baku");
  $perPage = 10;
  $tag = $carrusel->getPais().",".$carrusel->getCapital();
  $url = 'http://api.flickr.com/services/feeds/photos_public.gne?';
  $url.= '&tags='.$tag;
  $url.= '&per_page='.$perPage;
  $url.= '&format=json';
  $url.= '&nojsoncallback=1';

  $respuesta = file_get_contents($url);
  $json = json_decode($respuesta);
?>
<!DOCTYPE HTML>
<html lang="es">

<head>
   <!-- Datos que describen el documento -->
   <meta charset="UTF-8" />
   <title> Viajes</title>
   <meta name="author" content="Óscar Cervero Luiña" />
   <meta name="description" content="Viajes que va a realizar el piloto" />
   <meta name="keywords" content="viajes" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
   <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
   <link rel="icon" href="multimedia/imagenes/favicon.ico" />
   <script src="js/viajes.js"></script>
   <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
   <script async="" defer="" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC-4JVZ3jGnpI8kJ5tBwMgNNV-tZKtt394" ></script>
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
         <a href="viajes.php" class="active">Viajes</a>
         <a href="juegos.html">Juegos</a>
      </nav>
   </header>
   <p>Estás en:<a href="index.html">Inicio</a>/ Viajes</p>
   <main>
      <h2> Viajes</h2>
      <h3>Mapa dinámico</h3>
      <button onclick="viajes.getMapaDinámicoGoogle()">Mostrar Mapa Dinámico</button>
      <div>
      </div>
      <article>
         <h3>Carrusel de imágenes</h3>
         <?php
         for($i=0;$i<$perPage;$i++) {
            $URLfoto = $json->items[$i]->media->m;       
            print "<img alt='".$i."' src='".$URLfoto."' />";
         }
         ?>
         <button> &gt; </button>
         <button> &lt; </button>
      </article>
      <section>
         <h3>Cambio de moneda</h3>
         <form method="POST">
           <label for="cantidad">Cantidad moneda local:</label>
           <input type="text" id="cantidad" name="cantidad">
           <input type="submit" value="Registrar">
         </form>
         <?php
           if (count($_POST)>0) {
            $moneda = new Moneda("AZN","EUR");
            $amount=$_POST["cantidad"];
            $converted_amount = $moneda->convertir("AZN","EUR", $amount); 
            if (is_numeric($converted_amount)) {
                echo "<p>$amount AZN son equivalentes a $converted_amount EUR.</p>";
            } else {
                echo "<p>Error al obtener la tasa de cambio.</p>";
            }
           }   
         ?>
      </section>
      <section>
         <h3>Mapa estático</h3>
         <button onclick="viajes.getMapaEstaticoGoogle()">Mostrar Mapa Estático</button>
      </section>
   </main>
   <script>
      var viajes = new Viajes();
   </script>
</body>

</html>