class Noticias{
    constructor(){
        if (window.File && window.FileReader && window.FileList && window.Blob) 
        {  
            //El navegador soporta el API File
            document.write("<p>Este navegador soporta el API File </p>");
            
        }else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
    }
    readInputFile(file){
        var archivo = file[0];
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) 
        {
          var lector = new FileReader();
          lector.onload = function (evento) {
            var texto = lector.result;
            var noticias = texto.split('\n');
            const secciones = document.querySelectorAll("main > section");
            const seccion = secciones[secciones.length - 1];
            noticias.forEach(element => {
                let partes = element.split('_');
                let titulo = partes[0];
                let texto = partes[1];
                let autor = partes[2];

                const noticiaHTML = `
                    <article>
                        <h3>${titulo}</h3>
                        <p><strong>Texto:</strong> ${texto}</p>
                        <p><strong>Autor:</strong> ${autor}</p>
                    </article>
                `;

                seccion.innerHTML += noticiaHTML;
            });
          }      
          lector.readAsText(archivo);
        }else {
            console.error("Error : ¡¡¡ Archivo no válido !!!");
        }    
    }

    agregarNoticia(tituloAMano,textoAMano,autorAMano){
        const secciones = document.querySelectorAll("main > section");
        const seccion = secciones[secciones.length - 1];
        const noticiaHTML = `
            <article>
                <h3>${tituloAMano}</h3>
                <p><strong>Texto:</strong> ${textoAMano}</p>
                <p><strong>Autor:</strong> ${autorAMano}</p>
            </article>
        `;
        seccion.innerHTML += noticiaHTML;
    }
}