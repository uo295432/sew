class Agenda{
    constructor(){
        this.api="http://ergast.com/api/f1/current.json";
    }
    cargarDatos() {
        $.ajax({
            dataType: "json",
            url: this.api,
            method: 'GET',
            success: function(datos) {
                const carreras = datos.MRData.RaceTable.Races;

                const encabezado = `<h3>Carreras de esta temporada</h3>`;
                $("section").append(encabezado);

                carreras.forEach((carrera) => {
                    const nombreCarrera = carrera.raceName;
                    const nombreCircuito = carrera.Circuit.circuitName;
                    const latitud = carrera.Circuit.Location.lat;
                    const longitud = carrera.Circuit.Location.long;
                    const fechaCarrera = carrera.date; 
                    const horaCarrera = carrera.time;

                    const contenidoArticle = `
                        <article>
                            <h3>${nombreCarrera}</h3>
                            <p>Circuito: ${nombreCircuito}</p>
                            <p>Coordenadas: ${latitud}°N, ${longitud}°E</p>
                            <p>Hora de la carrera: ${fechaCarrera} ${horaCarrera}</p>
                        </article>
                    `;

                    $("section").append(contenidoArticle);
                });
            },
        });
    }
}