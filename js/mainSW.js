
'use strict';

const applicationServerPublicKey = '<key public>';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;
/*
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray; 
}
*/
//----------------------------------------------------------------SIRVE REGISTRAR SERVICE WORKER
//Registar el Sevice Worker y La mensajería Push/
/*if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('El SW y Push son soportados');

  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then(function (swReg) {
      console.log('SW es registrado', swReg);
      swRegistration = swReg;
      //initialiseUI();
    })
    .catch(function (error) {
      console.error('SW Error', error);
    });
} else {
  console.warn('Los mensaje Push no son soportado');
  pushButton.textContent = 'Push no soportado';
}*/

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./firebase-messaging-sw.js')
    .then(function (swReg) {
          console.log('SW registrado', swReg);})
    .catch(function (swError) {
      console.error('SW Error: ', swError);
    });
  });
}


firebase.messaging().requestPermission()  
  .then(function (token) {
    console.log('Recibido permiso.');
    // En el parámetro "token" tienes el código para poder enviar las notificaciones
  })
  .catch(function (err) {
    console.log('No se ha obtenido permiso', err);
  });


  messaging.onMessage(function (payload) {
    console.log("Notificación recibida", payload);
  });

//----------------------------------------------------------------------FIN SIRVE 
/*
function initialiseUI() {
  //añadimos el evento clic al boton
  pushButton.addEventListener('click', function () {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });
}

  //Configurar el valor inicial del subcriptor
  swRegistration.pushManager.getSubscription()
    .then(function (subscription) {
      isSubscribed = !(subscription === null);
      updateSubscriptionOnServer(subscription);

      if (isSubscribed) {
        console.log('Usuario esta subscrito');
      } else {
        console.log('Usuario no esta subscrito');
      }
      updateBtn();
    });
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Bloqueado';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Mensaje push habilitado';
  } else {
    pushButton.textContent = 'Mensaje push desabilitado';
  }
  pushButton.disabled = false;
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function (subscription) {
      console.log('Usuario esta subscrito: ', subscription);
      updateSubscriptionOnServer(subscription);
      isSubscribed = true;
      updateBtn();
    })
    .catch(function (err) {
      console.log('Fallo al subscribir el usuario: ', err);
      updateBtn();
    });
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Enviar subscripcion al servidor de la app
  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}

function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
    .then(function (subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .catch(function (error) {
      console.log('Error desuscribir ', error);
    })
    .then(function () {
      updateSubscriptionOnServer(null);
      console.log('Usuario desuscrito');
      isSubscribed = false;
      updateBtn();
    });
}

*/