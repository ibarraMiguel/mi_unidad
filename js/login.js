$( document ).ready(function() {
    url = "";
    $('#selectlogin').on('change', function() {
        if ($('#selectlogin').val() === 'usuario') {
            url = '/m/customer.pl';
        }
        if ($('#selectlogin').val() === 'admin') {
            url = '/m/index.pl';
        }
        if ($('#selectlogin').val() === 'gestor') {
            url = '/login_verificar.php';
        }
    });

    $( "#login" ).click(function() {
        const site = 'https://miunidadresidencial.com';
        const User = $("#usuario").val();
        const Pass = $("#password-field").val();

        let Tipo_user = '';
        let Rol = '';

        if (url === '/login_verificar.php') {
            const navigate = site + '/content.php';

            $.ajax({
                type: 'POST',
                url: '/login_verificar.php',
                data: {User: User, Password: Pass}
            }).done(function (rpt) {
                if (rpt === '1') {
                    $(location).attr('href', navigate);
                } else {
                    swal({
                        title: 'Error',
                        text: 'Verifique sus credenciales',
                        type: 'error',
                        confirmButtonText: 'Cerrar',
                        confirmButtonColor: '#d20810'
                    });
                }
            });
        } else {
            if (url === '/m/customer.pl') {
                Rol = 'CustomerUserLogin';
                Tipo_user = 'ITILMakerCliente';
            }
            if (url === '/m/index.pl') {
                Rol = 'UserLogin';
                Tipo_user = 'ITILMakerAgente';
            }

            $.ajax({
                type: "POST",
                url: "https://miunidadresidencial.com/apirest/index.php/rest/sessionPortal",
                data: { login: User, pass: Pass, rol: Rol }
            })
            .done((rpt) => {
                if (rpt.Error) {
                    swal({
                        title: rpt.Error.ErrorMessage,
                        text: "verifique sus credenciales.",
                        type: 'error',
                        confirmButtonText: 'Cerrar'
                    })
                } else {
                    const navigate = site + url + '?' + Tipo_user + '=' + rpt.SessionID;
                    $(location).attr('href', navigate);
                }
            })
            .fail(() => {
                swal({
                    title: "Hubo un error de conexión",
                    text: "Intentelo de nuevo mas tarde.",
                    type: 'error',
                    confirmButtonText: 'Cerrar'
                })
            });
        }
    });
});
