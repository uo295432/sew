class Semáforo{
    levels=[0.2,0.5,0.8];
    lights = 4;
    unload_moment=null;
    clic_moment=null;
    botonArranque = null; 
    botonReaccion = null; 
    mensajeTiempo = null;

    constructor(){
        this.difficulty=Math.floor(Math.random() * 3);
        this.createStructure();
    }
    createStructure(){
        const sections = document.querySelectorAll('main > section');
        const mainElement = sections[1];

        const encabezado = document.createElement('h2');
        encabezado.textContent = "Semáforo";
        mainElement.appendChild(encabezado);

        for (let i = 0; i < this.lights; i++) {
            const luz = document.createElement('div');
            mainElement.appendChild(luz);
        }

        this.botonArranque = document.createElement('button');
        this.botonArranque.textContent = "Arranque";
        this.botonArranque.addEventListener('click', () => {
            this.initSequence();
        });
        mainElement.appendChild(this.botonArranque);

        this.botonReaccion = document.createElement('button');
        this.botonReaccion.textContent = "Reacción";
        this.botonReaccion.disabled = true;
        this.botonReaccion.addEventListener('click', () => {
            this.stopReaction();
        });
        mainElement.appendChild(this.botonReaccion);
        
        this.mensajeTiempo = document.createElement('p');
        mainElement.appendChild(this.mensajeTiempo);
    }

    initSequence(){
        const mainElement = document.querySelector('main > section:nth-of-type(2)');
        mainElement.classList.add('load');
        this.botonArranque.disabled = true;

        setTimeout(() =>{
            this.unload_moment=new Date();
            this.endSequence();
        },2000+(this.difficulty*100));
    }

    endSequence(){
        const mainElement = document.querySelector('main > section:nth-of-type(2)');
        mainElement.classList.remove('load');
        mainElement.classList.add('unload');
        this.botonReaccion.disabled = false;
    }

    stopReaction(){
        this.clic_moment=new Date();
        const tiempoReaccion = (this.clic_moment - this.unload_moment).toFixed(3);
        this.mensajeTiempo.textContent = `Tiempo de reacción: ${tiempoReaccion} milisegundos`;
        const mainElement = document.querySelector('main > section:nth-of-type(2)');
        mainElement.classList.remove('unload');
        this.botonArranque.disabled = false;
        this.botonReaccion.disabled = true;

        this.createRecordForm(tiempoReaccion);
    }

    createRecordForm(tiempo) {
        const mainElement = document.querySelector('main > section:nth-of-type(2)');
        
        const form = document.createElement('form');
        form.action = "semaforo.php";  
        form.method = "POST";
    
        const nombreLabel = document.createElement('label');
        nombreLabel.setAttribute('for', 'nombre');  
        nombreLabel.textContent = "Nombre:";
        const nombreInput = document.createElement('input');
        nombreInput.type = "text";
        nombreInput.id = "nombre";  
        nombreInput.name = "nombre";
        form.appendChild(nombreLabel);
        form.appendChild(nombreInput);
    
        const apellidosLabel = document.createElement('label');
        apellidosLabel.setAttribute('for', 'apellidos');  
        apellidosLabel.textContent = "Apellidos:";
        const apellidosInput = document.createElement('input');
        apellidosInput.type = "text";
        apellidosInput.id = "apellidos";  
        apellidosInput.name = "apellidos";
        form.appendChild(apellidosLabel);
        form.appendChild(apellidosInput);
    
        const nivelLabel = document.createElement('label');
        nivelLabel.setAttribute('for', 'nivel');  
        nivelLabel.textContent = "Nivel:";
        const nivelInput = document.createElement('input');
        nivelInput.type = "text";
        nivelInput.id = "nivel";  
        nivelInput.name = "nivel";
        nivelInput.value = this.levels[this.difficulty];  
        nivelInput.readOnly = true;  
        form.appendChild(nivelLabel);
        form.appendChild(nivelInput);
    
        const tiempoLabel = document.createElement('label');
        tiempoLabel.setAttribute('for', 'tiempo');  
        tiempoLabel.textContent = "Tiempo de reacción:";
        const tiempoInput = document.createElement('input');
        tiempoInput.type = "text";
        tiempoInput.id = "tiempo";  
        tiempoInput.name = "tiempo";
        tiempoInput.value = tiempo / 1000;  // Tiempo calculado en segundos
        tiempoInput.readOnly = true;
        form.appendChild(tiempoLabel);
        form.appendChild(tiempoInput);
    
        const submitInput = document.createElement('input');
        submitInput.type = "submit";
        submitInput.value = "Registrar";  
        form.appendChild(submitInput);
    
        mainElement.appendChild(form);
    }
}