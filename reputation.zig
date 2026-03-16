const std = @import("std");

pub const UserReputation = struct {
    score: i32 = 0,
    vouch_count: u32 = 0,
    flag_count: u32 = 0,
    is_domain_owner: bool = false,

    pub fn getStatus(self: UserReputation) []const u8 {
        if (self.is_domain_owner) return "🌟 SOVEREIGN (Auto-Verified)";
        if (self.score >= 5) return "✅ VERIFIED HUMAN";
        if (self.score <= -10) return "🤖 LIKELY BOT (Filtered)";
        return "⏳ NEUTRAL (Building Trust)";
    }
};

pub fn main() !void {
    // 1. Setup a real human who got accidentally flagged
    var human_artist = UserReputation{
        .score = 6, // They were already verified
        .vouch_count = 6,
        .is_domain_owner = false,
    };

    std.debug.print("\n--- Skydrops Anti-False Positive System ---\n", .{});
    std.debug.print("Initial Status: {s}\n", .{human_artist.getStatus()});

    // 2. Someone flags them by accident (-5 points)
    std.debug.print("⚠️  Accidental Flag received!\n", .{});
    human_artist.score -= 5;
    human_artist.flag_count += 1;

    // 3. Check status again
    std.debug.print("Status after Flag: {s} (Score: {d})\n", .{
        human_artist.getStatus(), 
        human_artist.score 
    });

    std.debug.print("\nResult: The human was NOT labeled a bot. They just moved to Neutral.\n", .{});
}
