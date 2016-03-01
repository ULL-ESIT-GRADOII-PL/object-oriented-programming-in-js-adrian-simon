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
        Medida.call(this, valor, tipo);
    };
    Temperatura.prototype = new Medida();
    Temperatura.prototype.constructor = Temperatura;

    function Celsius(valor) {
        Temperatura.call(this, valor, "C");
    };
    Celsius.prototype = new Temperatura();
    Celsius.prototype.constructor = Temperatura;
    Celsius.prototype.toFarenheit = function() {
        this.valor = (this.valor * 9 / 5) + 32;
        return this.valor;
    }

    function Farenheit(valor) {
        Temperatura.call(this, valor, "F");
    };
    Farenheit.prototype = new Temperatura();
    Farenheit.prototype.constructor = Temperatura;
    Farenheit.prototype.toCelsius = function() {
        this.valor = (this.valor - 32) * 5 / 9;
            return this.valor;
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
        var cel = new Celsius(32);
        console.log(cel.toFarenheit());
        var far = new Farenheit(32);
        console.log(far.toCelsius());


    }

})(this);
