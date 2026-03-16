const std = @import("std");

pub const UserStanding = struct {
    handle: []const u8,
    score: i32,
    vouches_received: u32,
    flags_received: u32,
    is_sovereign: bool,

    pub fn renderDashboard(self: UserStanding) void {
        const stdout = std.debug;
        stdout.print("\n--- 🛡️  SKydrops TRUST DASHBOARD: {s} ---\n", .{self.handle});
        stdout.print("Standing:   {s}\n", .{if (self.score >= 5 or self.is_sovereign) "✨ VERIFIED HUMAN" else "⏳ PENDING"});
        stdout.print("Trust Score: {d}\n", .{self.score});
        stdout.print("Activity:    [+{d} Vouches] [-{d} Flags]\n", .{self.vouches_received, self.flags_received});
        
        if (self.is_sovereign) {
            stdout.print("Note:        Verified via DNS Sovereign Domain.\n", .{});
        } else if (self.flags_received > 0) {
            stdout.print("Note:        Community flags detected. Manual review suggested.\n", .{});
        }
        stdout.print("--------------------------------------------------\n", .{});
    }
};

pub fn main() !void {
    // Simulate a user who was verified but then flagged (Score: 6 - 5 = 1)
    const artist = UserStanding{
        .handle = "creative-human.bsky.social",
        .score = 1, 
        .vouches_received = 2, // e.g. two Domain Owners (+6)
        .flags_received = 1,   // e.g. one Domain Owner flag (-5)
        .is_sovereign = false,
    };

    // This would be triggered by your Double-Tap logic
    artist.renderDashboard();
}
