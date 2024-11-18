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
        elementsBarajados=this.elements;
        for(i=this.elements.length - 1;i>0;i--){
            j=Math.floor(Math.random() * (i + 1));
            [elementsBarajados[i],elementsBarajados[j]]=[elementsBarajados[j],elementsBarajados[i]];
        }
        this.elements=elementosBarajados;
    }
    unflipCards(){
        setTimeout(() =>{
            this.firstCard.setAtribute("data-state","initial");
            this.secondCard.setAtribute("data-state","initial");
            this.resetBoard();
        },2500);
    }
    resetBoard(){
        hasFlippedCard=false;
        lockBoard=false;
        firstCard=null;
        secondCard=null;
    }
    checkForMatch(){
        firstCard=secondCard ? this.disableCards() : this.unflipCards();
    }
    disableCards(){
        this.firstCard.setAtribute("data-state","revealed");
        this.secondCard.setAtribute("data-state","revealed");
        this.resetBoard();
    }
    createElements(){
        for(i=0;i<this.elements.length;i++){
            //quizá haya que poner data-state="" después de data element
            var e=document.createElement("<article data-element='"+this.elements[i][element]+"' data-state='initial'>"+"<h3>Tarjeta de memoria</h3>\
            <img src='"+this.elements[i][source]+"' alt='"+this.elements[i][element]+"' />"+"</article>");
            document.body.main.appendChild(e);
        }
    }
    addEventListeners(){
        for(i=0;i<this.elements.length;i++){
            this.flipCard.bind(card, this);
        }
    }
    flipCard(game){

    }
}