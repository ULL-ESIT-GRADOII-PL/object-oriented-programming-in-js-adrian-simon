(function(exports) {
    "use strict";
 
    function Medida(valor, tipo) {
        /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
        /* ademas de new Medida(45.2, "Km") */
        var value = valor;
        var type = tipo;
        this.getValor = function(){
          return this.value;
        }
         this.getTipo = function(){
          return this.type;
        }
    }

    function Temperatura(valor, tipo) {
        /* tipo es opcional. Debería admitir new Medida("45.2 F") */
    }

    function Celsius(valor) {
        this.toFarenheit = function() {
            valor = (valor * 9 / 5) + 32;
            return valor;
        }
    }

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

    exports.selectMedida = function(){
      var valor = document.getElementById('medida').value;
      console.log(valor)
      var prueba = new Medida(3,"km")
      console.log(prueba.getValor())
    }

})(this);
