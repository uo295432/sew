class Api{
    f1Circuits2024 = [
        { name: "Sakhir", country: "Bahréin", city: "Sakhir", latitude: 26.0325, longitude: 50.5106 },
        { name: "Jeddah", country: "Arabia Saudí", city: "Yeddah", latitude: 21.6319, longitude: 39.1044 },
        { name: "Albert Park", country: "Australia", city: "Melbourne", latitude: -37.8497, longitude: 144.9683 },
        { name: "Suzuka", country: "Japón", city: "Suzuka", latitude: 34.8431, longitude: 136.5419 },
        { name: "Shanghai", country: "China", city: "Shanghai", latitude: 31.3389, longitude: 121.2197 },
        { name: "Miami", country: "Estados Unidos", city: "Miami", latitude: 25.958, longitude: -80.2389 },
        { name: "Autódromo Enzo e Dino Ferrari", country: "Italia", city: "Imola", latitude: 44.3439, longitude: 11.7161 },
        { name: "Montecarlo", country: "Mónaco", city: "Montecarlo", latitude: 43.7347, longitude: 7.4206 },
        { name: "Gilles Villeneuve", country: "Canadá", city: "Montreal", latitude: 45.5006, longitude: -73.5228 },
        { name: "Barcelona-Catalunya", country: "España", city: "Barcelona", latitude: 41.57, longitude: 2.2611 },
        { name: "Red Bull Ring", country: "Austria", city: "Knittelfeld", latitude: 47.2197, longitude: 14.7647 },
        { name: "Silverstone", country: "Gran Bretaña", city: "Silverstone", latitude: 52.0786, longitude: -1.0169 },
        { name: "Hungaroring", country: "Hungría", city: "Mogyoród", latitude: 47.5789, longitude: 19.2486 },
        { name: "Spa-Francorchamps", country: "Bélgica", city: "Spa-Francorchamps", latitude: 50.4372, longitude: 5.9714 },
        { name: "Zandvoort", country: "Países Bajos", city: "Zandvoort", latitude: 52.3888, longitude: 4.5406 },
        { name: "Monza", country: "Italia", city: "Monza", latitude: 45.6156, longitude: 9.2811 },
        { name: "Bakú City", country: "Azerbaiyán", city: "Bakú", latitude: 40.3725, longitude: 49.8533 },
        { name: "Marina Bay", country: "Singapur", city: "Singapur", latitude: 1.2914, longitude: 103.8644 },
        { name: "Circuit of The Americas", country: "Estados Unidos", city: "Austin", latitude: 30.1342, longitude: -97.6411 },
        { name: "Autódromo Hermanos Rodríguez", country: "México", city: "México D.F", latitude: 19.4042, longitude: -99.0907 },
        { name: "José Carlos Pace (Interlagos)", country: "Brasil", city: "Sao Paulo", latitude: -23.7014, longitude: -46.6978 },
        { name: "Las Vegas", country: "Estados Unidos", city: "Las Vegas", latitude: 36.1703, longitude: -115.1403 },
        { name: "Losail", country: "Qatar", city: "Losail", latitude: 25.4889, longitude: 51.4542 },
        { name: "Yas Marina", country: "Emiratos Árabes", city: "Abu Dhabi", latitude: 24.4672, longitude: 54.6031 }
    ];
    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
        
        const ultimoCircuito = JSON.parse(localStorage.getItem('ultimoCircuito'));
        if (ultimoCircuito) {
            const resultados = document.querySelectorAll('section')[2];
            resultados.innerHTML = `
                <h4>${ultimoCircuito.nombre} (${ultimoCircuito.pais})</h4>
                <p>Distancia: ${ultimoCircuito.dis.toFixed(2)} km</p>
            `;
            this.getMapaEstaticoGoogle(ultimoCircuito.latitud, ultimoCircuito.longitud);
        }
    }
    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }
    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }
    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }
    getAltitud(){
        return this.altitud;
    }
    getMapaEstaticoGoogle(lat,lon){
        var ubicacion=document.querySelectorAll('section')[2];
        
        var apiKey = "&key=AIzaSyC-4JVZ3jGnpI8kJ5tBwMgNNV-tZKtt394";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + lat + "," + lon;
        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + lat + "," + lon;
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        ubicacion.innerHTML += "<img src='"+this.imagenMapa+"' alt='mapa estático google' />";
    }

    calcularDistancia(lat2, lon2) {
        const R = 6371; //Radio de la Tierra en kilómetros
        const toRad = (grados) => (grados * Math.PI) / 180; //Función para convertir grados a radianes
    
        //Diferencias de latitud y longitud en radianes
        const deltaLat = toRad(lat2 - this.latitud);
        const deltaLon = toRad(lon2 - this.longitud);
    
        //Convertir las coordenadas a radianes
        const radLat1 = toRad(this.latitud);
        const radLat2 = toRad(lat2);
    
        //Fórmula de Haversine
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                  Math.cos(radLat1) * Math.cos(radLat2) *
                  Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        const distancia = R * c; //Distancia en kilómetros
        return distancia;
    }

    toggleFullscreen(button) {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            button.textContent = "Haz click para minimizar la pantalla";
        } else {
            document.exitFullscreen();
            button.textContent = "Haz click para maximizar la pantalla";
        }
    }

    mostrarCircuitoRandom() {
        const randomIndex = Math.floor(Math.random() * this.f1Circuits2024.length);
        const randomCircuit = this.f1Circuits2024[randomIndex];
        const distancia = this.calcularDistancia(randomCircuit.latitude, randomCircuit.longitude);

        localStorage.setItem('ultimoCircuito', JSON.stringify({
            latitud: randomCircuit.latitude,
            longitud: randomCircuit.longitude,
            nombre: randomCircuit.name,
            pais: randomCircuit.country,
            dis: distancia,
        }));

        const resultados = document.querySelectorAll('section')[2];
        resultados.innerHTML="";
        resultados.innerHTML = `
            <h4>${randomCircuit.name} (${randomCircuit.country})</h4>
            <p>Distancia: ${distancia.toFixed(2)} km</p>
        `;
        this.getMapaEstaticoGoogle(randomCircuit.latitude, randomCircuit.longitude);
    }
}