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
    }
}