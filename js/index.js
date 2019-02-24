
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
playVideoOnScroll();


$('#mostrarTodos').click(function(){
    $.ajax({
      type: "GET",
      url: "data-1.json",
      data: "data",
      dataType: "json",
      success: function (data) {
        var contenedor = $(".resultado");
        var indice = data.length;
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
            if(ciudades.indexOf(data[indice].Ciudad)===-1){ciudades.push(data[indice].Ciudad)}
        });

        indicet = tipos.length;
        indicec = ciudades.length;

        $.each(ciudades, function (indicec) { 
          $('#selectCiudad').append('<option value="'+ciudades[indicec]+'">'+ciudades[indicec]+'</option>');
        });

        $.each(tipos, function (indicet) { 
          $('#selectTipo').append('<option value="'+ciudades[indicet]+'">'+ciudades[indicet]+'</option>');
        });

        $('select').material_select();
      }
    });
    

}

rellenar();
});
   