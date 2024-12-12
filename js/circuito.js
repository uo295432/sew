class Circuito {
    constructor() {
        this.init();
    }

    init() {
        $(document).ready(() => {
            $("#fileInput").on("change", (event) => {
                const file = event.target.files[0];

                if (file) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        const xmlContent = e.target.result;
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(xmlContent, "application/xml");

                        if (xmlDoc.documentElement.nodeName === "parsererror") {
                            $("#output").html("<p>Error al analizar el archivo XML.</p>");
                            return;
                        }

                        this.renderXML(xmlDoc);
                    };

                    reader.readAsText(file);
                }
            });
        });
    }

    renderXML(xmlDoc) {
        const circuito = $(xmlDoc).find("circuito");
        let html = "<h2>Información del Circuito</h2>";

        html += `<p><strong>Nombre:</strong> ${circuito.find("nombre").text()}</p>`;
        html += `<p><strong>Longitud Total:</strong> ${circuito.find("longitudTotal").text()} ${circuito.find("longitudTotal").attr("unidad")}</p>`;
        html += `<p><strong>Anchura Media:</strong> ${circuito.find("anchuraMedia").text()} ${circuito.find("anchuraMedia").attr("unidad")}</p>`;
        html += `<p><strong>Fecha:</strong> ${circuito.find("fecha").text()}</p>`;
        html += `<p><strong>Hora:</strong> ${circuito.find("hora").text()}</p>`;
        html += `<p><strong>Vueltas:</strong> ${circuito.find("vueltas").text()}</p>`;
        html += `<p><strong>Localidad:</strong> ${circuito.find("localidad").text()}</p>`;
        html += `<p><strong>País:</strong> ${circuito.find("país").text()}</p>`;

        const referencias = circuito.find("referencias referencia");
        if (referencias.length > 0) {
            html += "<h3>Referencias</h3><ul>";
            referencias.each(function() {
                html += `<li><a href="${$(this).text()}" target="_blank">${$(this).text()}</a></li>`;
            });
            html += "</ul>";
        }

        const fotografias = circuito.find("fotografías fotografía");
        if (fotografias.length > 0) {
            html += "<h3>Fotografías</h3>";
            fotografias.each(function() {
                html += `<figure><img src="${$(this).text()}" alt="${$(this).attr("descripción")}" style="max-width: 100%; height: auto;">
                          <figcaption>${$(this).attr("descripción")}</figcaption></figure>`;
            });
        }

        const videos = circuito.find("vídeos vídeo");
        if (videos.length > 0) {
            html += "<h3>Vídeos</h3>";
            videos.each(function() {
                html += `<video controls style="max-width: 100%;">
                            <source src="${$(this).text()}" type="video/mp4">
                            Tu navegador no soporta la reproducción de este video.
                        </video>`;
            });
        }

        const tramos = circuito.find("tramos tramo");
        if (tramos.length > 0) {
            html += "<h3>Tramos</h3><ul>";
            tramos.each(function() {
                const distancia = $(this).find("distancia").text();
                const unidad = $(this).find("distancia").attr("unidad");
                const sector = $(this).find("sector").text();
                html += `<li>Tramo del sector ${sector}: ${distancia} ${unidad}</li>`;
            });
            html += "</ul>";
        }

        $("#output").html(html);
    }
}
