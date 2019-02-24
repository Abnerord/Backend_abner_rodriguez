<?php
//recibe los parametros del AJAX
    $precio = $_POST['precio'];
    $ciudad = $_POST['ciudad'];
    $tipo= $_POST['tipo'];

    //CREA LAS SUBCADESDAS PARA EL MINIMO Y MAXIMO PRECIO
    $punto = strpos($precio,';');
    $min = substr($precio,0,$punto);
    $max = substr($precio,$punto + 1);

    //ABRE EL ARCHIVO JSON PARA LEERLO Y ALMACENARLO
    $data = file_get_contents("data-1.json");
    $dataprocess = json_decode($data,true);
    

    $buscados = array();

    //RECORRE EL ARRAY CREADO
    foreach($dataprocess as $valor){
       $x = $valor['Precio'];
       $dolar = strpos($x,"$");
       $coma = strpos($x,',');
       $pre = substr($x,$dolar + 1,$coma-1);
       $pos = substr($x,$coma+1);
       $total = $pre.$pos;
       if($total>= $min && $total<=$max){
            array_push($buscados,$valor);
       }
        
    }
    unset($valor);

    $armado = array();
//VERIFICA LAS OPCIONES DEL SELECT
if ($ciudad!="" && $tipo!=""){
    foreach($buscados as $dato){
        if ($dato['Ciudad']== $ciudad && $dato['Tipo']==$tipo){
            array_push($armado,$dato);
        }
    }
 
    unset($dato);
}else if ($ciudad!=""){
    foreach($buscados as $dato){
        if ($dato['Ciudad']== $ciudad){
            array_push($armado,$dato);
        }
    }
   
    unset($dato);
}else if ($tipo!=""){
    foreach($buscados as $dato){
        if ($dato['Tipo']== $tipo){
            array_push($armado,$dato);
        }
    }
    
    unset($dato);
}else{
    $armado = $buscados;
}
 
 //CREA EL ARCHIVO JSON
echo json_encode($armado, JSON_FORCE_OBJECT);

?>