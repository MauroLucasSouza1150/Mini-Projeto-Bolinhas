const palco = document.querySelector("#palco");
const numObjetos = document.querySelector("#num-objetos");
const txtQtde = document.querySelector("#txt-qtde");
const btnAdicionar = document.querySelector("#btn-adicionar");
const btnRemover = document.querySelector("#btn-remover");

// definindo o a alrgura e altura da div palco
let larguraPalco = palco.offsetWidth;
let alturaPalco = palco.offsetHeight;
let bolas = [];
let numBola = 0;

// criando a classe bolinha
class Bola {
    constructor(arrayBolas, palco) {
        // definindo as propriedades das bolinhas;
        this.tam = Math.floor(Math.random() * 20) + 10;
        this.r = Math.floor(Math.random() * 255);
        this.g = Math.floor(Math.random() * 255);
        this.b = Math.floor(Math.random() * 255);
        this.px = Math.floor(Math.random() * (larguraPalco - this.tam));
        this.py = Math.floor(Math.random() * (alturaPalco - this.tam));
        this.velx = Math.floor(Math.random() * 2) + 0.5;
        this.vely = Math.floor(Math.random() * 2) + 0.5;
        this.dirx = (Math.random() * 10) > 5 ? 1 : -1;
        this.diry = (Math.random() * 10) > 5 ? 1 : -1;
        this.palco = palco;
        this.arrayBolas = arrayBolas;
        this.id = Date.now() + " " + Math.floor(Math.random() * 10000000000);
        this.desenhar();
        this.controle = setInterval(this.controlar, 10);
        this.eu = document.getElementById(this.id);
        numBola ++;
        numObjetos.innerHTML = numBola;
    }
    // Metódos das bolinhas;
    minhaPos = () => {
        return this.arrayBolas.indexOf(this);
    }
    remover = () => {
        clearInterval(this.controle);
        bolas = bolas.filter((b) => {
            if(b.id != this.id) {
                return b
            }
        })
        this.eu.remove();
        numBola --
        numObjetos.innerHTML = numBola; 
    }
    desenhar = () => {
        const div = document.createElement("div");
        div.setAttribute("id",this.id);
        div.setAttribute("class", "bola");
        div.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;
        background-color:rgb(${this.r},${this.g},${this.b})`);
        this.palco.appendChild(div);
    }
    controleBordas = () => {
        if(this.px + this.tam >= larguraPalco) {
            this.dirx = -1;
        }else if (this.px <= 0) {
            this.dirx = 1
        }
        if(this.py + this.tam >= alturaPalco) {
            this.diry = -1;
        }else if (this.py <= 0) {
            this.diry = 1
        }
    }
    controlar = () => {
        this.controleBordas();
        this.px += this.dirx * this.velx;
        this.py += this.diry * this.vely;
        this.eu.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px; 
        height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`);
        if((this.px > larguraPalco) || (this.py > alturaPalco)) {
            this.remover()
        }
    }
}

window.addEventListener("resize", (evt) => {
    larguraPalco = palco.offsetWidth;
    alturaPalco = palco.offsetHeight;
})

btnAdicionar.addEventListener("click", (evt) => {
    const qtde = txtQtde.value;
    for(let i = 0; i < qtde; i ++) {
        // instaciar as bolinhas
        bolas.push(new Bola(bolas, palco))
    }
});

btnRemover.addEventListener("click", (evt) => {
    bolas.map((b) => {
        // remover bolinhas
        b.remover();
    })
})






