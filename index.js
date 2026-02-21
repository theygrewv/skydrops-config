export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Serve the metadata file
    if (url.pathname === "/client-metadata.json") {
      const metadata = {
        "client_id": "https://skydrops.app/client-metadata.json",
        "client_name": "Skydrops",
        "client_uri": "https://skydrops.app",
        "redirect_uris": ["https://skydrops.app/callback"],
        "scope": "atproto transition:generic",
        "grant_types": ["authorization_code", "refresh_token"],
        "response_types": ["code"]
      };

      return new Response(JSON.stringify(metadata), {
        headers: { "content-type": "application/json" },
      });
    }

    // Default response for the root or other paths
    return new Response("Skydrops Metadata Node Active", { status: 200 });
  },
};
