export default {
  async fetch(request) {
    try {
      const url = new URL(request.url);
      const host = url.hostname;

      // 1. IDENTITY RESOLUTION
      if (url.pathname.startsWith('/.well-known/atproto-did')) {
        // REPLACE THE STRING BELOW WITH YOUR ACTUAL DID
        return new Response("did:plc:z72i7hddtos6os66i2n772mo", { 
          headers: { "content-type": "text/plain" },
        });
      }

      // 2. THE ETHER UI (Profile Page)
      const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Skydrops | ${host}</title>
          <style>
              body { margin: 0; background: #050508; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }
              .glass { padding: 40px; background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); text-align: center; }
              .btn { display: block; margin-top: 20px; padding: 10px; background: white; color: black; text-decoration: none; border-radius: 10px; }
          </style>
      </head>
      <body>
          <div class="glass">
              <div style="font-size: 0.8rem; color: #5d83f7; letter-spacing: 2px;">WELCOME HOME, LUMINARY</div>
              <h1>${host}</h1>
              <p>Where the Skies touch Grass.</p>
              <a href="#" class="btn">Sign in with Skydrops</a>
          </div>
      </body>
      </html>`;

      return new Response(html, { headers: { "content-type": "text/html;charset=UTF-8" } });

    } catch (e) {
      // This part prevents the 1101 error by showing you the actual error message
      return new Response("Worker Error: " + e.message, { status: 500 });
    }
  },
};
