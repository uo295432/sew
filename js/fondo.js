class Fondo{
    pais;
    capital;
    circuito;
    constructor(pais,capital,circuito){
        this.pais=pais;
        this.capital=capital;
        this.circuito=circuito;
    }
    obtenerImagen() {
        const flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI, 
            {
                tags: this.capital+","+this.pais+","+this.circuito, 
                tagmode: "any",
                format: "json"
            }
        )
        .done((data) => {
            if (data.items.length > 0) {
                const url = data.items[0].media.m.replace("_m", "_b");
                $("main").css({
                    "background-image": `url(${url})`,
                    "background-size": "cover",
                    "background-position": "center",
                    "background-repeat": "no-repeat",
                    'min-height': '100vh', 
                    'margin': '0'
                });
            }
        });
    }
}