class País{
    constructor(nombre,capital,poblacion) {
        this.nombre=nombre;
        this.capital=capital;
        this.poblacion=poblacion;
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

}