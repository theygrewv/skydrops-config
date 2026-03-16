const std = @import("std");

pub const ArtistProfile = struct {
    handle: []const u8,
    did: []const u8,
    is_bot: bool,
    has_human_verification: bool,

    pub fn canAccessSkydrops(self: ArtistProfile) bool {
        // Direct access to fields proves to Zig 'self' is used
        if (self.is_bot) return false;
        if (!self.has_human_verification) return false;
        return true;
    }
};

pub fn main() !void {
    const bot_account = ArtistProfile{
        .handle = "ai-art-gen.bot",
        .did = "did:plc:bot123",
        .is_bot = true,
        .has_human_verification = false,
    };

    const human_artist = ArtistProfile{
        .handle = "artist.skydrops.app",
        .did = "did:plc:human456",
        .is_bot = false,
        .has_human_verification = true,
    };

    std.debug.print("\n--- Skydrops Security Check ---\n", .{});
    
    if (bot_account.canAccessSkydrops()) {
        std.debug.print("ALLOWED: {s}\n", .{bot_account.handle});
    } else {
        std.debug.print("BLOCKED: {s} (AI/Bot detected)\n", .{bot_account.handle});
    }

    if (human_artist.canAccessSkydrops()) {
        std.debug.print("ALLOWED: {s} (Verified Human Artist)\n", .{human_artist.handle});
    } else {
        std.debug.print("BLOCKED: {s}\n", .{human_artist.handle});
    }
}
