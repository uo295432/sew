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

                carreras.forEach((carrera) => {
                    const nombreCarrera = carrera.raceName;
                    const nombreCircuito = carrera.Circuit.circuitName;
                    const latitud = carrera.Circuit.Location.lat;
                    const longitud = carrera.Circuit.Location.long;
                    const fechaCarrera = carrera.date; 
                    const horaCarrera = carrera.time;

                    const contenidoArticle = `
                        <article>
                            <p><strong>Carrera: </strong>${nombreCarrera}</p>
                            <p><strong>Circuito:</strong> ${nombreCircuito}</p>
                            <p><strong>Coordenadas:</strong> ${latitud}°N, ${longitud}°E</p>
                            <p><strong>Hora de la carrera:</strong> ${fechaCarrera} ${horaCarrera}</p>
                        </article>
                    `;

                    $("section").append(contenidoArticle);
                });
            },
        });
    }
}