export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname;

    // 1. IDENTITY RESOLUTION (Handshake)
    if (url.pathname.startsWith('/.well-known/atproto-did')) {
      return new Response("did:plc:z72i7hddtos6os66i2n772mo", { 
        headers: { "content-type": "text/plain" },
      });
    }

    // 2. THE ETHER UI (Glass Sheet Design)
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>Skydrops | ${host}</title>
        <style>
            * { box-sizing: border-box; }
            body {
                margin: 0; padding: 0; 
                background-color: #050508; 
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-image: 
                    radial-gradient(circle at 15% 25%, rgba(65, 105, 225, 0.15) 0%, transparent 45%),
                    radial-gradient(circle at 85% 75%, rgba(138, 43, 226, 0.15) 0%, transparent 45%);
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }

            .glass-sheet {
                position: relative;
                width: 85%;
                max-width: 360px;
                padding: 35px 25px;
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(30px);
                -webkit-backdrop-filter: blur(30px);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 30px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
                text-align: center;
            }

            .app-icon {
                width: 80px;
                height: 80px;
                margin: 0 auto 20px;
                background: url('https://skydrops.app/logo.png'); 
                background-size: cover;
                background-position: center;
                image-rendering: pixelated;
                border-radius: 18px;
            }

            .tagline {
                font-size: 0.7rem;
                text-transform: uppercase;
                letter-spacing: 0.2em;
                color: #5d83f7;
                margin-bottom: 8px;
                font-weight: 700;
            }

            h1 { font-size: 1.4rem; margin: 5px 0 15px 0; letter-spacing: -0.02em; }
            
            .btn-group { display: flex; flex-direction: column; gap: 12px; margin-top: 25px; }

            .btn {
                display: block;
                padding: 14px;
                text-decoration: none;
                border-radius: 15px;
                font-weight: 600;
                font-size: 0.9rem;
                transition: 0.2s;
                border: none;
                cursor: pointer;
            }

            .btn-primary { background: #ffffff; color: #000000; }
            .btn-secondary { background: rgba(255, 255, 255, 0.1); color: #ffffff; border: 1px solid rgba(255,255,255,0.1); }
        </style>
    </head>
    <body>
        <div class="glass-sheet">
            <div class="tagline">Welcome home, Luminary</div>
            <div class="app-icon"></div>
            <h1>${host}</h1>
            <div class="btn-group">
                <button onclick="signIn()" class="btn btn-primary">Sign in with Skydrops</button>
                <a href="https://bsky.app/profile/${host}" class="btn btn-secondary">View on Bluesky</a>
            </div>
        </div>

        <script>
            function signIn() {
                const h = prompt("Enter your handle:");
                if(h) window.location.href="https://bsky.app/oauth/authorize?client_id=https://skydrops.app/client-metadata.json&redirect_uri=https://skydrops.app/callback&scope=atproto%20transition:generic&login_hint="+encodeURIComponent(h);
            }
        </script>
    </body>
    </html>
    `;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};
