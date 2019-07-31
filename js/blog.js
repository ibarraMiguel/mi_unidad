$(document).ready(function(){
    $.ajax({
        type: 'POST',
        url: 'php/cargar_categorias.php'
    })
    .done(function(listas_cat){
        $('#cat').html(listas_cat)
    })
    .fail(function(){
        alert('Hubo un errror al cargar las Categorias')
    })

    $.ajax({
        type: 'POST',
        url: 'php/cargar_contenido_completo.php'
    })
    .done(function(rpt){
        if(rpt != "mal"){
        document.getElementById('principal').innerHTML=rpt;
        }
    })
    .fail(function(){
        alert('Hubo un errror al cargar las Categorias')
    })

    $('#cat').on('change', function(){
        var tipo = $('#cat').val()
        if (tipo == "Seleccione una categoría") {
        document.getElementById('principal').innerHTML="";
        }
        $.ajax({
        type: 'POST',
        url: 'php/cargar_subcategorias.php',
        data: {'tipo': tipo}
        })
        .done(function(listas_subCat){
        $('#subcat').html(listas_subCat)
        })
        .fail(function(){
        alert('Hubo un error al cargar las subCategorias')
        })
    })

    $(function() {
        $(document).on('click', '#filtrar', function(event) {
        var value = $('#cat option:selected').text()
        var value2 = $('#subcat option:selected').text()

        if (value != "Seleccione una categoría" && value2 != "Seleccione una subcategoría") {
            $.ajax({
            type: 'POST',
            url: 'php/cargar_full_contenido.php',
            data: {'tipo': value, 'tipo2': value2}
            })
            .done(function(rpt){
            if(rpt != "mal"){
                document.getElementById('principal').innerHTML=rpt;
            }
            })
            .fail(function(){
            $('body').overhang({
            type: 'error',
            message: 'Hubo un error',
            duration: 3
            });
            })
        }

        if(value != "Seleccione una categoría" && value2 == "Seleccione una subcategoría"){
            $.ajax({
            type: 'POST',
            url: 'php/cargar_full_contenido.php',
            data: {'tipo': value}
            })
            .done(function(rpt){
            if(rpt != "mal"){
                document.getElementById('principal').innerHTML=rpt;
            }
            })
            .fail(function(){
            $('body').overhang({
            type: 'error',
            message: 'Hubo un error',
            duration: 3
            });
            })
        }
        });

        $(document).on('click', '#buscar', function(event) {
        var buscador = document.getElementById('buscador').value;
        if(buscador.trim() != ""){
            $.ajax({
            type: 'POST',
            url: 'php/filtrar_contenido.php',
            data: {'buscar': buscador.trim()}
            })
            .done(function(rpt){
            if(rpt != "mal"){
                document.getElementById('principal').innerHTML=rpt;
            }
            if(rpt == "mal"){
                document.getElementById('principal').innerHTML="<p style=\"font-size: 110%\"><strong>No hay resultados</strong></p>";
            }
            })
            .fail(function(){
            $('body').overhang({
            type: 'error',
            message: 'Hubo un error',
            duration: 3
            });
            })
        }
        else{
        $("body").overhang({
            type: "error",
            message: "Asegurese de no dejar el campo vacío",
            duration: 3
        });
        }
        });
    });
    })