export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname;

    // 1. IDENTITY RESOLUTION
    if (url.pathname.startsWith('/.well-known/atproto-did')) {
      return new Response("did:plc:z72i7hddtos6os66i2n772mo", { 
        headers: { "content-type": "text/plain" },
      });
    }

    // 2. THE ETHER UI
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Skydrops | ${host}</title>
        <style>
            body {
                margin: 0; background-color: #050508; color: white;
                font-family: 'Inter', system-ui, sans-serif;
                background-image: 
                    radial-gradient(circle at 15% 25%, rgba(65, 105, 225, 0.12) 0%, transparent 45%),
                    radial-gradient(circle at 85% 75%, rgba(138, 43, 226, 0.12) 0%, transparent 45%);
                height: 100vh; display: flex; justify-content: center; align-items: center;
                overflow: hidden;
            }
            .glass-sheet {
                position: relative; width: 90%; max-width: 380px; padding: 40px;
                background: rgba(255, 255, 255, 0.04);
                backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 28px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4); text-align: center;
            }
            .app-icon {
                width: 96px; height: 96px; margin: 0 auto 24px;
                background: url('https://skydrops.app/logo.png'); background-size: cover;
                image-rendering: pixelated; border-radius: 18px;
                box-shadow: 0 0 20px rgba(65, 105, 225, 0.4);
            }
            .tagline { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.25em; color: #5d83f7; margin-bottom: 12px; }
            h1 { font-size: 1.6rem; margin: 12px 0; }
            p { color: rgba(255, 255, 255, 0.65); font-size: 0.95rem; margin-bottom: 30px; }
            .btn {
                display: block; padding: 14px; margin-bottom: 10px;
                text-decoration: none; border-radius: 14px; font-weight: 600;
                transition: all 0.3s ease; cursor: pointer;
            }
            .btn-primary { background: white; color: black; border: none; }
            .btn-secondary { background: rgba(255, 255, 255, 0.08); color: white; border: 1px solid rgba(255, 255, 255, 0.2); }
        </style>
    </head>
    <body>
        <div class="glass-sheet">
            <div class="tagline">Welcome home, Luminary</div>
            <div class="app-icon"></div>
            <h1>${host}</h1>
            <p>Where the Skies touch Grass.</p>
            <button onclick="signIn()" class="btn btn-primary" style="width:100%">Sign in with Skydrops</button>
            <a href="https://bsky.app/profile/${host}" class="btn btn-secondary">View on Bluesky</a>
        </div>
        <script>
            function signIn() {
                const handle = prompt("Enter your handle:");
                if (handle) {
                    window.location.href = "https://bsky.app/oauth/authorize?client_id=https://skydrops.app/client-metadata.json&redirect_uri=https://skydrops.app/callback&scope=atproto%20transition:generic&login_hint=" + encodeURIComponent(handle);
                }
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
