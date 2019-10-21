/*Push.create("OE LLAVE!", {
    body: "Vamo' a por empanadas?",
    icon: 'imgs/icon.png',
    timeout: 8000,
    onClick: function () {
        window.location = "https://www.google.com/maps/place/6%C2%B033'51.9%22N+75%C2%B049'34.7%22W/@6.5644167,-75.8284943,17z/data=!3m1!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d6.5644237!4d-75.8263125";
        this.close(); 
    }
});*/

const title = 'Que tal, cómo te va?';
const options = {
    body: 'Hay Maduras calientes en tu zona.\n¿Quieres Conocerlas? :)',
    icon: 'imgs/icon.png',
    image: "imgs/1.png",
    badge: "imgs/descarga.jpg",
    vibrate: "[255,75,200]"
};
registration.showNotification(title, options);