(function(exports) {
    "use strict";

    function Medida(valor, tipo) {
        /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
        /* ademas de new Medida(45.2, "Km") */
        if (tipo === null) {
            console.log(valor);
        } else {
            this.valor = valor;
            this.tipo = tipo;
        }
    }

    Medida.prototype.getValor = function() {
        console.log("Medida getVal = " + this.valor)
        return this.valor;
    };

    function Temperatura(valor, tipo) {
        Medida.call(this, valor, tipo);
    };
    Temperatura.prototype = new Medida("32 c");
    Temperatura.prototype.constructor = Temperatura;

    function Celsius(valor) {
        Temperatura.call(this, valor, "C");
    };
    Celsius.prototype = new Temperatura("32 c");
    Celsius.prototype.constructor = Temperatura;

    Celsius.prototype.toFarenheit = function() {
        this.valor = (this.valor * 9 / 5) + 32;
        return this.valor;
    }
    Celsius.prototype.toKelvin = function() {
        this.valor = this.valor + 273.15;
        return this.valor;
    }

    function Farenheit(valor) {
        Temperatura.call(this, valor, "F");
    };
    Farenheit.prototype = new Temperatura("32 f");
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

    Kelvin.prototype = new Temperatura("32 k");
    Kelvin.prototype.constructor = Temperatura;
    Kelvin.prototype.toCelsius = function() {
        this.valor = this.valor - 273.15;
        return this.valor;
    }
    Kelvin.prototype.toFarenheit = function() {
        this.valor = (this.valor * 1.8) - 459.67;
        return this.valor;
    }

    function Longitud(valor, tipo) {
        Medida.call(this, valor, tipo);
    };

    Longitud.prototype = new Medida("32 km");
    Longitud.prototype.constructor = Longitud;

    function Metro(valor) {
        Longitud.call(this, valor, "M");
    }

    Metro.prototype = new Longitud("32 m");
    Metro.prototype.constructor = Longitud;
    Metro.prototype.toYarda = function() {
        this.valor = (this.valor / 0.9144);
        return this.valor;
    }
    Metro.prototype.toPulgada = function() {
        this.valor = (this.valor * 39.3701);
        return this.valor;
    }

    function Pulgada(valor) {
        Longitud.call(this, valor, "P");
    }

    Pulgada.prototype = new Longitud("32 P");
    Pulgada.prototype.constructor = Longitud;
    Pulgada.prototype.toMetro = function() {
        this.valor = (this.valor / 39.3701);
        return this.valor;
    }
    Pulgada.prototype.toYarda = function() {
        this.valor = (this.valor / 36);
        return this.valor;
    }

    function Yarda(valor) {
        Longitud.call(this, valor, "Y");
    }

    Yarda.prototype = new Longitud("32 Y");
    Yarda.prototype.constructor = Longitud;
    Yarda.prototype.toMetro = function() {
        this.valor = (this.valor * 0.9144);
        return this.valor;
    }
    Yarda.prototype.toPulgada = function() {
        this.valor = (this.valor * 36);
        return this.valor;
    }

    exports.Temperatura = Temperatura;
    exports.Longitud = Longitud;
    exports.Celsius = Celsius;
    exports.Farenheit = Farenheit;
    exports.Kelvin = Kelvin;
    exports.Metro = Metro;
    exports.Yarda = Yarda;
    exports.Pulgada = Pulgada;

    exports.convertir = function() {
        var valor = document.getElementById('convert').value;
        var elemento = document.getElementById('converted');
        var cadena = XRegExp('^(?<valor>[+-]?\\d+(\\.\\d+)?([e][+-]?\\d+)?[ ]*) # valor  \n\
                    (?<tipo>[a-z]+)                                             # tipo   \n\
                    (?<to>[ ]+(?:to[ ]+)?)                                      #to \n\
                    (?<tipo2>[a-z]+)[ ]*$                                       #tipo2', 'xi');
        var match = XRegExp.exec(valor, cadena);
        console.log(match)
        if (match == null) {
            elemento.innerHTML = "Introduzca por ejemplo -32.5e10f to K"
            elemento.style.color = 'red';

        } else {
            elemento.style.color = 'green';

            console.log("Valor: " + match.match)
            console.log("Tipo inicial: " + match.tipo)
            console.log("Tipo final: " + match.tipo2)

            if (match) {
                var numero = match.valor;
                var tipo = match.tipo.toLowerCase();
                tipo = tipo.charAt(0);
                numero = parseFloat(numero);
                var tipo2 = match.tipo2.toLowerCase();

                console.log("Tipo: " + tipo)
                console.log("Tipo 2: " + tipo2)

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
                        break;
                    case 'm':
                        nueva = new Metro(numero);
                        break;
                    case 'y':
                        nueva = new Yarda(numero);
                        break;
                    case 'p':
                        nueva = new Pulgada(numero);
                        break;
                    default:
                        elemento.innerHTML = "Introduzca por ejemplo -32.5e10f to K";
                        elemento.style.color = 'red';
                }
                switch (tipo2) {
                    case 'k':
                        elemento.innerHTML = nueva.toKelvin().toFixed(2) + " Kelvin";
                        break;
                    case 'c':
                        elemento.innerHTML = nueva.toCelsius().toFixed(2) + " Celsius";
                        break;
                    case 'f':
                        elemento.innerHTML = nueva.toFarenheit().toFixed(2) + " Farenheit";
                        break;
                    case 'm':
                        elemento.innerHTML = nueva.toMetro().toFixed(2) + " Metros";
                        break;
                    case 'y':
                        elemento.innerHTML = nueva.toYarda().toFixed(2) + " Yardas";
                        break;
                    case 'p':
                        elemento.innerHTML = nueva.toPulgada().toFixed(2) + " Pulgadas";
                        break;
                    default:
                        elemento.style.color = 'red';
                        elemento.innerHTML = "Introduzca por ejemplo -32.5e10f to K";
                        break;
                }
            } else {
                elemento.innerHTML = "Introduzca por ejemplo -32.5e10f to K";
                elemento.style.color = 'red';
            }

        }
    }
})(this);
