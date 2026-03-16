const std = @import("std");

pub const VerificationStatus = enum {
    verified_domain,
    verified_human,
    unverified,
    blocked_bot,
};

pub const User = struct {
    handle: []const u8,
    is_behavioral_bot: bool,

    pub fn getStatus(self: User) VerificationStatus {
        // 1. Check for Bot Behavior first (The Ultimate Filter)
        if (self.is_behavioral_bot) return .blocked_bot;

        // 2. Auto-verify if they own their own domain
        // If the handle doesn't end in .bsky.social, it's a custom domain
        if (!std.mem.endsWith(u8, self.handle, ".bsky.social")) {
            return .verified_domain;
        }

        // 3. Otherwise, they need manual human verification
        return .unverified;
    }
};

pub fn main() !void {
    const users = [_]User{
        .{ .handle = "singer.com", .is_behavioral_bot = false },
        .{ .handle = "bot.bsky.social", .is_behavioral_bot = true },
        .{ .handle = "new-artist.bsky.social", .is_behavioral_bot = false },
    };

    for (users) |user| {
        const status = user.getStatus();
        std.debug.print("User: {s: <25} Status: {s}\n", .{ user.handle, @tagName(status) });
        
        if (status == .verified_domain) {
            std.debug.print("   -> ✨ Auto-verified via Sovereign Domain\n", .{});
        } else if (status == .blocked_bot) {
            std.debug.print("   -> 🚫 Logic Alert: Bot behavior detected!\n", .{});
        }
    }
}
