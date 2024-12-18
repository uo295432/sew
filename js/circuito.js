class Circuito {
    constructor() {
        this.file = null;
        this.archivoKML=null;
    }

    ficheroXML() {
        if (this.file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const xmlContent = e.target.result;
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlContent, "application/xml");

                if (xmlDoc.documentElement.nodeName === "parsererror") {
                    document.querySelector("section").innerHTML = "<p>Error al analizar el archivo XML.</p>";
                    return;
                }

                this.renderXML(xmlDoc);
            };

            reader.readAsText(this.file);
        }
    }

    renderXML(xmlDoc) {
        const output = document.querySelectorAll('main > section')[0];
        let html = "<h3>Información del Circuito</h3>";

        const circuito = xmlDoc.querySelector("circuito");
        html += `<p>Nombre: ${circuito.querySelector("nombre").textContent}</p>`;
        html += `<p>Longitud Total: ${circuito.querySelector("longitudTotal").textContent} ${circuito.querySelector("longitudTotal").getAttribute("unidad")}</p>`;
        html += `<p>Anchura Media: ${circuito.querySelector("anchuraMedia").textContent} ${circuito.querySelector("anchuraMedia").getAttribute("unidad")}</p>`;
        html += `<p>Fecha: ${circuito.querySelector("fecha").textContent}</p>`;
        html += `<p>Hora: ${circuito.querySelector("hora").textContent}</p>`;
        html += `<p>Vueltas: ${circuito.querySelector("vueltas").textContent}</p>`;
        html += `<p>Localidad: ${circuito.querySelector("localidad").textContent}</p>`;
        html += `<p>País: ${circuito.querySelector("país").textContent}</p>`;

        const referencias = circuito.querySelectorAll("referencias referencia");
        html += "<h4>Referencias</h4><ul>";
        referencias.forEach((ref) => {
            html += `<li><a href="${ref.textContent}" target="_blank">${ref.textContent}</a></li>`;
        });
        html += "</ul>";

        const fotografias = circuito.querySelectorAll("fotografías fotografía");
        html += "<h4>Fotografías</h4>";
        fotografias.forEach((foto) => {
            const imagePath = `xml/${foto.textContent}`; 
            html += `<figure>
                <img src="${imagePath}" alt="${foto.getAttribute("descripción")}">
                <figcaption>${foto.getAttribute("descripción")}</figcaption>
             </figure>`;
        });

        const videos = circuito.querySelectorAll("vídeos vídeo");
        if (videos.length > 0) {
            html += "<h4>Vídeos</h4>";
            videos.forEach((video) => {
                const videoPath = `xml/${video.textContent}`; 
                html += `<video controls>
                            <source src="${videoPath}" type="video/mp4">
                            Tu navegador no soporta la reproducción de este video.
                        </video>`;
            });
        }

        const tramos = circuito.querySelectorAll("tramos tramo");
        if (tramos.length > 0) {
            html += "<h4>Tramos</h4><ul>";
            let cont=1;
            tramos.forEach((tramo) => {
                const distancia = tramo.querySelector("distancia").textContent;
                const unidad = tramo.querySelector("distancia").getAttribute("unidad");
                const sector = tramo.querySelector("sector").textContent;
                const latitud = tramo.querySelector("latitud").textContent;
                const longitud = tramo.querySelector("longitud").textContent;
                const altitud = tramo.querySelector("altitud").textContent;
                html += `<li>Tramo ${cont}: Sector ${sector}: ${distancia} ${unidad}; Latitud:${latitud} Longitud:${longitud} Altitud:${altitud}</li>`;
                cont++;
            });
            html += "</ul>";
        }

        output.innerHTML = html;
    }


    ficheroKML() {
        if (this.file) {
            const fileName = this.file.name;
            const fileExtension = fileName.split('.').pop().toLowerCase(); 
            if (fileExtension === 'kml') {
                this.archivoKML = this.file;  
                this.getMapaDinámicoGoogle();  
            } else {
                document.write("<p>No es un archivo KML </p>");
                this.archivoKML = null; 
            }
        }
    }

    getMapaDinámicoGoogle() {
        var map;
        const reader = new FileReader();
        const mapContainer = document.createElement("div");
        const mainElement = document.querySelector("main");
        const p = mainElement.querySelectorAll("p");
        const secondP = p[0];
        secondP.insertAdjacentElement("afterend", mapContainer);
        reader.onload = (e) => {
            const kmlText = e.target.result;
    
            const parser = new DOMParser();
            const kmlDoc = parser.parseFromString(kmlText, "application/xml");
    
            map = new google.maps.Map(document.querySelector("main > div"), {
                center: new google.maps.LatLng(40.3734205, 49.8552053),
                zoom: 12,
                mapTypeId: 'terrain'
            });

            const placemarks = kmlDoc.getElementsByTagName("Placemark");
            for (let i = 0; i < placemarks.length; i++) {
                const coordinates = placemarks[i].getElementsByTagName("coordinates")[0]?.textContent.trim();
                if (coordinates) {
                    const coordsArray = coordinates.split(/\s+/);
    
                    coordsArray.forEach(coord => {
                        const [lng, lat] = coord.split(",").map(Number);
                        new google.maps.Marker({
                            position: { lat, lng },
                            map: map,
                            title: placemarks[i].getElementsByTagName("name")[0]?.textContent || "Sin título",
                            icon: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png" 
                        });
                    });
                }
            }
        };
        reader.readAsText(this.archivoKML);
    }

    ficheroSVG() {
        if (this.file) {
            const fileName = this.file.name;
            const fileExtension = fileName.split('.').pop().toLowerCase(); 
            if (fileExtension === 'svg') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    let svgContent = e.target.result;

                    svgContent = svgContent.replace(/<svg[^>]*version="2\.0"[^>]*>/, '<svg xmlns="http://www.w3.org/2000/svg">');

                    if (!/<svg[^>]*xmlns="http:\/\/www.w3.org\/2000\/svg"/.test(svgContent)) {
                       svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
                    }

    
                    const container = document.querySelectorAll('main > section')[1];
                    let html = "<h3>Archivo de altimetría:</h3>";
                    container.innerHTML=html;
                    container.innerHTML += svgContent; 
                };
    
                reader.readAsText(this.file); 
            } else {
                document.write("<p>No es un archivo SVG</p>");
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const circuito = new Circuito();
});