class Memoria{
    elements=[
        {
            element:"RedBull",
            source:"https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"
        },
        {
            element:"McLaren",
            source:"https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"
        },
        {
            element:"Alpine",
            source:"https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"
        },
        {
            element:"AstonMartin",
            source:"https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"
        },
        {
            element:"Ferrari",
            source:"https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"
        },
        {
            element:"Mercedes",
            source:"https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"
        },
        {
            element:"RedBull",
            source:"https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"
        },
        {
            element:"McLaren",
            source:"https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"
        },
        {
            element:"Alpine",
            source:"https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"
        },
        {
            element:"AstonMartin",
            source:"https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"
        },
        {
            element:"Ferrari",
            source:"https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"
        },
        {
            element:"Mercedes",
            source:"https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"
        }
    ]
    constructor(){
        this.hasFlippedCard=false;
        this.lockBoard=false;
        this.firstCard=null;
        this.secondCard=null;
        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }
    shuffleElements(){
        let elementsBarajados = [...this.elements];
        for(let i=this.elements.length - 1;i>0;i--){
            let j=Math.floor(Math.random() * (i + 1));
            [elementsBarajados[i],elementsBarajados[j]]=[elementsBarajados[j],elementsBarajados[i]];
        }
        this.elements=elementsBarajados;
    }
    unflipCards(){
        setTimeout(() =>{
            this.firstCard.setAttribute("data-state","initial");
            this.secondCard.setAttribute("data-state","initial");
            this.resetBoard();
        },1000);
    }
    resetBoard(){
        this.hasFlippedCard=false;
        this.lockBoard=false;
        this.firstCard=null;
        this.secondCard=null;
    }
    checkForMatch(){
        this.firstCard.getAttribute('data-element')===this.secondCard.getAttribute('data-element') ? this.disableCards() : this.unflipCards();
    }
    disableCards(){
        this.firstCard.setAttribute("data-state","revealed");
        this.secondCard.setAttribute("data-state","revealed");
        this.resetBoard();
    }
    createElements(){
        const sections = document.querySelectorAll('main > section');
        const targetSection = sections[1];
        this.elements.forEach(item => {
            const article = document.createElement('article');
            article.setAttribute('data-element', item.element);
            article.setAttribute('data-state', 'initial');

            article.innerHTML = `
                <h3>Tarjeta de memoria</h3>
                <img src="${item.source}" alt="${item.element}" />
            `;

            targetSection.appendChild(article);
        });
    }
    addEventListeners(){
        const articles = document.querySelectorAll('article');
        articles.forEach(card => {
            // Usamos bind para asegurar que el contexto de `this` se mantenga en la clase Memoria
            card.addEventListener('click', this.flipCard.bind(this, card));
        });
    }
    flipCard(game){
        if(this.lockBoard==true || game.getAttribute('data-state')=='revealed' || game==this.firstCard){
            return;
        }else{
            game.setAttribute('data-state', 'flip');
            if(this.hasFlippedCard==true){
                this.secondCard=game;
                this.lockBoard=true;
                this.checkForMatch();
            }else{
                this.hasFlippedCard=true;
                this.firstCard=game;
            }
        }
    }
}