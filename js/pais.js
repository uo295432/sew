class País{
    constructor(nombre,capital,poblacion) {
        this.nombre=nombre;
        this.capital=capital;
        this.poblacion=poblacion;
        this.apikey = "a5204d8eab0e09a5f18338004f9ddc53";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/forecast?lat=40.3725&lon=49.8533"+ this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
    }
    rellenar(){
        this.circuito="Baku City";
        this.gobierno="República semipresidencialista";
        this.coordenadas="40°22′21″ N, 49°51′11.88″ E";
        this.religion="Islam";
    }
    informacionPrincipal(){
        document.write("<p>"+this.nombre+"  "+this.capital+"</p>");
    }
    getNombre(){
        return "Nombre del país:"+this.nombre;
    }
    getCapital(){
        return "Nombre de la capital:"+this.capital;
    }

    informacionSecundaria(){
        return ("<ul><li>Nombre del circuito:"+this.circuito+"</li><li>Tipo de gobierno:"+this.gobierno+"</li>\
        <li>Cantidad de población:"+this.poblacion+"</li><li>Religión mayoritaria:"+this.religion+"</li></ul>");
    }

    escribeCoordenadas(){
        document.write("<p>Las coordenadas de la línea de meta del circuito son: "+this.coordenadas+"</p>");
    }

    cargarDatos(){
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos) {
                console.log('XML:', datos); 
                let pronosticos3PM = $(datos).find("time").filter(function() {
                    return $(this).attr("from").includes("15:00:00") &&
                           $(this).attr("to").includes("18:00:00");
                });
                let secciones = document.querySelectorAll("main > section");
                let nuevaSeccion = secciones[secciones.length - 1];
                pronosticos3PM.slice(0, 5).each(function() {
                    let fecha = $(this).attr("from").split("T")[0];
                    let tempMax = parseFloat($(this).find("temperature").attr("max"));
                    let tempMin = parseFloat($(this).find("temperature").attr("min"));
                    let humedad = $(this).find("humidity").attr("value");
                    let precip =parseFloat($(this).find("precipitation").attr("value"))||"Valor no especificado"; 
                    let icono = $(this).find("symbol").attr("var"); 

                    console.log('Probabilidad de lluvia:', precip); 
    
                    let iconUrl = `http://openweathermap.org/img/wn/${icono}@2x.png`;
    
                    let articleHtml = `
                        <article>
                            <p>Pronóstico para el día: ${fecha} de 3 a 6 de la tarde</p>
                            <p>Temperatura máxima: ${tempMax} °C</p>
                            <p>Temperatura mínima: ${tempMin} °C</p>
                            <p>Humedad:</strong> ${humedad}%</p>
                            <p>Cantidad de lluvia(mm): ${precip }</p>
                            <img src="${iconUrl}" alt="Icono del clima" />
                        </article>
                    `;
    
                    nuevaSeccion.innerHTML += articleHtml;
                });
            },
        });
    }
}