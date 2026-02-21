export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname;

    // 1. IDENTITY RESOLUTION (Handshake)
    if (url.pathname.startsWith('/.well-known/atproto-did')) {
      return new Response("did:plc:your_did_here", { 
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
            /* (Styles from before - glass, aura, buttons) */
            body {
                margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif;
                background-color: #050508;
                background-image: 
                    radial-gradient(circle at 15% 25%, rgba(65, 105, 225, 0.12) 0%, transparent 45%),
                    radial-gradient(circle at 85% 75%, rgba(138, 43, 226, 0.12) 0%, transparent 45%);
                height: 100vh; display: flex; justify-content: center; align-items: center;
                color: white; overflow: hidden;
            }
            .glass-sheet {
                position: relative; width: 90%; max-width: 380px; padding: 40px;
                background: rgba(255, 255, 255, 0.04);
                backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 28px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4); text-align: center; z-index: 1;
            }
            .app-icon {
                width: 96px; height: 96px; margin: 0 auto 24px;
                background: url('https://skydrops.app/logo.png'); background-size: cover;
                image-rendering: pixelated; border-radius: 18px;
            }
            .tagline { font-size: 0.75rem; text-transform: uppercase; color: #5d83f7; margin-bottom: 12px; }
            .button-group { display: flex; flex-direction: column; gap: 12px; }
            .btn { display: block; padding: 14px; text-decoration: none; border-radius: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
            .btn-primary { background: white; color: black; border: none; }
            .btn-secondary { background: rgba(255, 255, 255, 0.08); color: white; border: 1px solid rgba(255, 255, 255, 0.2); }
        </style>
    </head>
    <body>
        <div class="glass-sheet">
            <div class="tagline">Welcome Home, Luminary</div>
            <div class="app-icon"></div>
            <h1>${host}</h1>
            <p>Where the Skies touch Grass.</p>
            
            <div class="button-group">
                <button onclick="signIn()" class="btn btn-primary">Sign in with Skydrops</button>
                <a href="https://bsky.app/profile/${host}" class="btn btn-secondary">View on Bluesky</a>
            </div>
        </div>

        <script>
            function signIn() {
                const handle = prompt("Enter your handle (e.g., v.skydrops.app):");
                if (handle) {
                    // This creates the standard AT Protocol OAuth authorization URL
                    const clientID = "https://skydrops.app/client-metadata.json";
                    const redirectURI = "https://skydrops.app/callback";
                    
                    // We send the user to the "entryway" to resolve their server and log in
                    const authURL = "https://bsky.app/oauth/authorize" + 
                                    "?client_id=" + encodeURIComponent(clientID) +
                                    "&redirect_uri=" + encodeURIComponent(redirectURI) +
                                    "&scope=atproto%20transition:generic" +
                                    "&login_hint=" + encodeURIComponent(handle);
                    
                    window.location.href = authURL;
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
