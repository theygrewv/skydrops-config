export async function onRequest(context) {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome Home | Skydrops</title>
      <style>
          body {
              margin: 0; background-color: #050508; color: white;
              font-family: system-ui, sans-serif;
              background-image: radial-gradient(circle at center, rgba(65, 105, 225, 0.15) 0%, transparent 80%);
              height: 100vh; display: flex; justify-content: center; align-items: center; text-align: center;
          }
          .glass {
              padding: 50px 30px; background: rgba(255, 255, 255, 0.05);
              backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
              border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 30px;
              width: 85%; max-width: 400px;
          }
          .icon { width: 80px; height: 80px; margin-bottom: 20px; image-rendering: pixelated; border-radius: 15px; }
          h1 { font-size: 1.8rem; margin: 10px 0; }
          p { color: rgba(255,255,255,0.7); font-size: 0.9rem; }
      </style>
  </head>
  <body>
      <div class="glass">
          <img src="https://skydrops.app/logo.png" class="icon">
          <h1>Welcome Home, Luminary</h1>
          <p>You have successfully connected your handle to the Skydrops cosmos.</p>
      </div>
  </body>
  </html>`;

  return new Response(html, {
    headers: { "content-type": "text/html;charset=UTF-8" },
  });
}
