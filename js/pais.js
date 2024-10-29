class País{
    nombre;
    capital;
    circuito;
    población;
    gobierno;
    coordenadas;
    religión;
    constructor(nombre,capital,población) {
        this.nombre=nombre;
        this.capital=capital;
        this.población=población;
    }
    rellenar(){
        this.circuito="Baku City";
        this.gobierno="República semipresidencialista";
        this.coordenadas="40°22′21″ N, 49°51′11.88″ E";
        this.religión="Islam";
    }
    informaciónPrincipal(){
        document.write("<p>"+this.nombre+"  "+this.capital+"</p>");
    }
    getNombre(){
        return this.nombre;
    }
    getCapital(){
        return this.capital;
    }
    getCircuito(){

    }
    getPoblación(){

    }
    getGobierno(){

    }
    getCoordenadas(){

    }
    getReligión(){

    }

}