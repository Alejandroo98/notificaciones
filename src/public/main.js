const PUBLIC_VAPID_KEY = 'BB8SiQrPYDnDpD0RDITYCNfaMtImncVrPUwqEUdJ3ZcN3OzdBUq_CkXGnzwhP5YJxNGBYVO6MHnF-U0U1wlPaFw';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const suscribirse = async () => {
  /* Service sorked */
  const register = await navigator.serviceWorker.register('/worked.js', {
    scope: '/',
  });
  console.log('New Service worked');

  const suscripcion = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  });

  await fetch('/suscribirse', {
    method: 'POST',
    body: JSON.stringify(suscripcion),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('Suscrito');
};

let form = document.querySelector('#myform');
let message = document.querySelector('#message');

form.addEventListener('submit', async (x) => {
  x.preventDefault();

  await fetch('/new-message', {
    method: 'POST',
    body: JSON.stringify({
      message: message.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  form.reset();
});

suscribirse();
