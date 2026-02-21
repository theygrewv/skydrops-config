export async function onRequest(context) {
  const metadata = {
    "client_id": "https://skydrops.app/client-metadata.json",
    "client_name": "Skydrops",
    "client_uri": "https://skydrops.app",
    "logo_uri": "https://skydrops.app/logo.png",
    "redirect_uris": ["https://skydrops.app/callback"],
    "scope": "atproto transition:generic",
    "grant_types": ["authorization_code", "refresh_token"],
    "response_types": ["code"],
    "token_endpoint_auth_method": "none",
    "application_type": "web",
    "dpop_bound_access_tokens": true
  };

  return new Response(JSON.stringify(metadata), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "access-control-allow-origin": "*"
    },
  });
}
