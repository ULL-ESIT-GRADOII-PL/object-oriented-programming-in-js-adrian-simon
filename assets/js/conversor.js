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
    Farenheit.prototype.toKelvin = function() {
        this.valor = (5 * (this.valor - 32) / 9) + 273.15
        return this.valor;
    }

    function Kelvin(valor) {
        Temperatura.call(this, valor, "K");
    }

    Kelvin.prototype = new Temperatura();
    Kelvin.prototype.constructor = Temperatura;
    Kelvin.prototype.toCelsius = function() {
        this.valor = (this.valor - 32) * 5 / 9;
        return this.valor;
    }

    exports.Temperatura = Temperatura;
    exports.Celsius = Celsius;
    exports.Farenheit = Farenheit;

    exports.convertir = function() {
        var valor = document.getElementById('convert').value;
        valor = valor.replace(/\s/g, '');
        var elemento = document.getElementById('converted');
            
        var cadena = XRegExp('(?<valor>[+-]?\\d+(\\.\\d+)?([e][+-]?\\d+)?)# valor  \n\
                    (?<tipo>[a-z]+)# tipo   \n\
                    (?<to>[to]?) #to \n\
                    (?<tipo2>[fck])#tipo2', 'x');
        var match = XRegExp.exec(valor, cadena);
        console.log("Valor: " + match.match)
        console.log("Tipo inicial: " + match.tipo)
        console.log("Tipo final: " + match.tipo2)

        if (match) {
            var numero = match.valor;
            var tipo = match.tipo.toLowerCase();
            tipo = tipo.charAt(0);
            numero = parseFloat(numero);
            var tipo2 = match.tipo2.toLowerCase();
            console.log("Valor: " + numero + ", Tipo: " + tipo);
            console.log(tipo)
            var nueva;
            switch (tipo) {
                case 'c':
                    nueva = new Celsius(numero);
                    break;
                case 'f':
                    nueva = new Farenheit(numero);
                    break;
                case 'k':
                    nueva = new Kelvin(numero);
                default:
                    elemento.innerHTML = "Introduzca por ejemplo -32.5e10f to K"
            }
            switch (tipo2) {
                case 'k':
                    elemento.innerHTML = nueva.toKelvin().toFixed(2) + " Kelvin";
                case 'c':
                    elemento.innerHTML = nueva.toCelsius().toFixed(2) + " Celsius";
                case 'f':
                    elemento.innerHTML = nueva.toFarenheit().toFixed(2) + " Farenheit";

                default:
                    elemento.innerHTML = "Introduzca por ejemplo -32.5e10f to K"
            }
        } else
            elemento.innerHTML = "Introduzca por ejemplo -32.5e10f to K"
    }

    // exports.selectMedida = function() {
    //     var valor = document.getElementById('medida').value;
    //     var temp = new Medida(3, "km");

    //     console.log(temp.getValor())
    //     var cel = new Celsius(32);
    //     console.log(cel.toFarenheit());
    //     var far = new Farenheit(32);
    //     console.log(far.toCelsius());


    // }

})(this);
