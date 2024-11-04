class Fondo{
    constructor(pais,capital,circuito){
        this.pais=pais;
        this.capital=capital;
        this.circuito=circuito;
    }
    obtenerImagen(){
        var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        var data=$.getJSON(flickrAPI,{
            tags:"oviedo",
            tagmode:"any",
            format:"json"
        })
        $("<img />").attr( "src", data).appendTo( "#imagenes" );
    }
}