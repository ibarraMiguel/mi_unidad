$(document).ready(function () {
	$('body').scrollspy({
		target: '#scroll-spy',
		offset: 70
	});
	var height = $('#howto').innerHeight();
	var windowHeight = $(window).height();
	var navHeight = $('nav.navbar').innerHeight();
	var siblingHeight = $('#howto').nextAll().innerHeight();

	if (height < windowHeight) {
		$('body').css("padding-bottom", windowHeight - navHeight - height - siblingHeight + "px");
	}
	$(window).resize(function (event) {
		var height = $('#howto').innerHeight();
		var windowHeight = $(window).height();
		var navHeight = $('nav.navbar').innerHeight();
		var siblingHeight = $('#howto').nextAll().innerHeight();


		if (height < windowHeight) {
			$('body').css("padding-bottom", windowHeight - navHeight - height - siblingHeight + "px");
		}
	});

	$('nav.navbar a, .scrollTop').click(function (event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;

			$('section').removeClass("focus");
			$(hash).addClass("focus");
			setTimeout(function () {
				$(hash).removeClass("focus");
			}, 2000);
			$('html, body').animate({
				scrollTop: $(hash).offset().top - 69
			}, 600, function () {
				window.location.hash = hash;
			});
			$(".navbar-collapse").collapse('hide');
		}

	});
	$(window).scroll(function () {
		var scrollPos = $('body').scrollTop();
		if (scrollPos > 0) {
			$('.navbar').addClass('show-color');
			$('.scrollTop').addClass('show-button');
		} else {
			$('.navbar').removeClass('show-color');
			$('.scrollTop').removeClass('show-button');
		}

	});
});

$('#myModal').on('shown.bs.modal', function () {
	$('#myInput').focus()
})
$(".toggle-password").click(function () {

	$(this).toggleClass("fa-eye fa-eye-slash");
	var input = $($(this).attr("toggle"));
	if (input.attr("type") == "password") {
		input.attr("type", "text");
	} else {
		input.attr("type", "password");
	}
});

$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

$(window).scroll(function () {
	$('.fadedfx').each(function () {
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
		if (imagePos < topOfWindow + 500) {
			$(this).addClass("fadeIn");
		}
	});
});

$(document).ready(function () {
	$("#submit").click(function () {
		const name = $("#nombre").val();
		const email = $("#email").val();
		const tel = $("#telefono").val();
		const message = $("#message").val();
		if (name == "" || message == "" || tel == "") {
			document.getElementById('submit').style.display = 'inline';
			const Toast = swal.mixin({
				toast: true,
				position: 'center',
				showConfirmButton: false,
				timer: 10000,
			});
			Toast.fire({
				type: 'warning',
				title: 'Debe ingresar los campos requeridos',
				width: '26rem',
				padding: '1.8rem',
			})
		} else {
			document.getElementById('cargando').style.display = 'inline';
			document.getElementById('submit').style.display = 'none';
			$('#cargando').attr("disabled", true);
			$.ajax({
				type: "POST",
				url: "https://miunidadresidencial.com/apirest/index.php/email/",
				data: { name: name, email: email, message: message, tel: tel }
			})
				.done((rpt) => {
					if (rpt.error) {
						Swal.fire({
							title: error,
							text: "No se enviaron datos",
							type: 'error',
							confirmButtonText: 'Cerrar'
						})
						document.getElementById('cargando').style.display = 'none';
						document.getElementById('submit').style.display = 'inline';
					} else {
						const Toast = swal.mixin({
							toast: true,
							position: 'center',
							showConfirmButton: false,
							timer: 1500,
						});
						Toast.fire({
							type: 'success',
							title: 'Mensaje enviado',
							width: '26rem',
							padding: '1.8rem',
						});
						document.getElementById('cargando').style.display = 'none';
						document.getElementById('submit').style.display = 'inline';
						$("#nombre").val("");
						$("#telefono").val("");
						$("#email").val("");
						$("#message").val("");
					}
				})
		}
	});
});

popupWhatsApp = () => {

	let btnClosePopup = document.querySelector('.closePopup');
	let btnOpenPopup = document.querySelector('.whatsapp-button');
	let popup = document.querySelector('.popup-whatsapp');
	let sendBtn = document.getElementById('send-btn');

	btnClosePopup.addEventListener("click", () => {
		popup.classList.toggle('is-active-whatsapp-popup')
	})

	btnOpenPopup.addEventListener("click", () => {
		popup.classList.toggle('is-active-whatsapp-popup')
		popup.style.animation = "fadeIn .6s 0.0s both";
	})

	sendBtn.addEventListener("click", () => {
		let msg = document.getElementById('whats-in').value;
		let relmsg = msg.replace(/ /g, "%20");
		window.open('https://wa.me/573168247983?text=' + relmsg, '_blank');
	});
}

popupWhatsApp();