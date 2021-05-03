const { Router } = require('express');
const router = Router();

const webPush = require('../webpush');

let suscripcionPush;

router.post('/suscribirse', async (req, res) => {
  suscripcionPush = req.body;
  console.log(suscripcionPush, 'aqui');
  res.status(200).json();
});

router.post('/new-message', async (req, res) => {
  const { message } = req.body;

  const payload = JSON.stringify({
    title: 'Siap-Sport :)',
    message: message,
  });

  try {
    await webPush.sendNotification(suscripcionPush, payload);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
