(function(exports) {
    "use strict";

    function Medida(valor, tipo) {
        /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
        /* ademas de new Medida(45.2, "Km") */
        this.valor = valor;
        this.tipo = tipo;
        // this.setValor = function(aux) {
        //     valor = aux;
        // }
        // this.setTipo = function(aux) {
        //     tipo = aux;
        // }

        // this.getTipo = function() {
        //     return tipo;
        // }
    }

    Medida.prototype.getValor = function() {
        console.log("Medida getVal = " + this.valor)
        return this.valor;
    };

    function Temperatura(valor, tipo) {
        Medida.call(this,valor,tipo);
    };
    Temperatura.prototype = new Medida();
    Temperatura.prototype.constructor = Temperatura;
    Temperatura.prototype.getTemp = function() {
        console.log("getTemp: ");

    }

    function Celsius(valor) {};

    function Farenheit(valor) {
        this.toCelsius = function() {
            valor = (valor - 32) * 5 / 9;
            return valor;
        }
    }

    exports.Temperatura = Temperatura;
    exports.Celsius = Celsius;
    exports.Farenheit = Farenheit;

    exports.convertir = function() {
        var valor = document.getElementById('convert').value,
            elemento = document.getElementById('converted'),
            /* Extienda la RegeExp a la especificación. use una XRegExp */
            regexp = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i,
            valor = valor.match(regexp);

        if (valor) {
            var numero = valor[1],
                tipo = valor[2].toLowerCase();

            numero = parseFloat(numero);
            console.log("Valor: " + numero + ", Tipo: " + tipo);

            switch (tipo) {
                case 'c':
                    var celsius = new Celsius(numero);
                    elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
                    break;
                case 'f':
                    var farenheit = new Farenheit(numero);
                    elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
                    break;

                default:
                    /* rellene este código */
            }
        } else
            elemento.innerHTML = "";
    }

    exports.selectMedida = function() {
        var valor = document.getElementById('medida').value;
        var temp = new Medida(3, "km");
        
        console.log(temp.getValor())
        var temp = new Temperatura(4,"k");
        console.log(temp.valor);
        temp.getTemp();


    }

})(this);
