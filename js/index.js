
$(document).ready(function () {

  $('select').material_select();
/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();

//Funcion para el boton de mostrar todo

$('#mostrarTodos').click(function(){
    $.ajax({
      type: "GET",
      url: "data-1.json",
      data: "data",
      dataType: "json",
      success: function (data) {
        var contenedor = $(".resultado"); //toma el selector donde se concatenara las card
        contenedor.empty();
      $.each(data, function (indice) { 
       
        contenedor.append('<div>'
        +'<div class="card horizontal valign-wrapper">'
        + '<div class="card-image">'
        + '<img src="img/home.jpg" class="responsive-img">'   
        + '</div>'
        + '<div class="card-stacked">'
        +   '<div class="card-content">'
        +     '<p>'
        +       '<b>Dirección: </b>' + data[indice].Direccion +'<br>'
        +       '<b>Ciudad: </b>' + data[indice].Ciudad +'<br>'
        +       '<b>Teléfono: </b>' + data[indice].Telefono +'<br>'
        +       '<b>Código Postal: </b>' + data[indice].Codigo_Postal +'<br>'
        +       '<b>Tipo: </b>' + data[indice].Tipo +'<br>'
        +       '<b>precio: </b>' + data[indice].Precio +'<br>'
        +     '</p>'
        +    '</div>'
        +   '<div class="card-action">'
        +      '<a>ver mas</a>'
        +    '</div>'
        +  '</div>'
        +'</div>');        
      });
    
   

      },
      error: function(){
        console.log("no se ha podido");
        
      }

      
    });

});

//Funcion para rellenar las opciones del select
function rellenar(){
  var tipos = [];
    var ciudades = [];
    var indicet,indicec;
    $.ajax({
      type: "GET",
      url: "data-1.json",
      data: "data",
      dataType: "JSON",
      success: function (data) {
        $.each(data, function (indice) { 
            if(tipos.indexOf(data[indice].Tipo)===-1){tipos.push(data[indice].Tipo)}
            if(ciudades.indexOf(data[indice].Ciudad)===-1){ciudades.push(data[indice].Ciudad)} //con each se recorren los arrays
        });

        indicet = tipos.length;
        indicec = ciudades.length;

        $.each(ciudades, function (indicec) { 
          $('#selectCiudad').append('<option value="'+ciudades[indicec]+'">'+ciudades[indicec]+'</option>');
        });

        $.each(tipos, function (indicet) { 
          $('#selectTipo').append('<option value="'+tipos[indicet]+'">'+tipos[indicet]+'</option>');
        });

        $('select').material_select();
      }
    });
    

}

rellenar();


//Funcion para llamar el archivo php y crear el json de la busqueda
$("#submitButton").click(function () { 
  var precio = $("#rangoPrecio").val();
  var ciudad = $("#selectCiudad").val();
  var tipo = $("#selectTipo").val();
  var respuesta;
  var impresion;
  console.log(precio + ciudad + tipo);
  
  $.ajax({
    type: "POST",
    url: "buscador.php",
    data: {ciudad:ciudad, precio:precio, tipo:tipo},
    success: function (response) {
    
      var dat = JSON.parse(response);
      var tamaño = dat.length;
      var contenedordos = $(".resultado");
      contenedordos.empty();
      $.each(dat, function (tamaño) { 
       
        contenedordos.append('<div>'
        +'<div class="card horizontal valign-wrapper">'
        + '<div class="card-image">'
        + '<img src="img/home.jpg" class="responsive-img">'   
        + '</div>'
        + '<div class="card-stacked">'
        +   '<div class="card-content">'
        +     '<p>'
        +       '<b>Dirección: </b>' + dat[tamaño].Direccion +'<br>'
        +       '<b>Ciudad: </b>' + dat[tamaño].Ciudad +'<br>'
        +       '<b>Teléfono: </b>' + dat[tamaño].Telefono +'<br>'
        +       '<b>Código Postal: </b>' + dat[tamaño].Codigo_Postal +'<br>'
        +       '<b>Tipo: </b>' + dat[tamaño].Tipo +'<br>'
        +       '<b>precio: </b>' + dat[tamaño].Precio +'<br>'
        +     '</p>'
        +    '</div>'
        +   '<div class="card-action">'
        +      '<a>ver mas</a>'
        +    '</div>'
        +  '</div>'
        +'</div>');        
      });
      
       

    }
  });
  
});

});
   