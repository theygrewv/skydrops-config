const std = @import("std");

pub const User = struct {
    handle: []const u8,
    score: i32 = 0,
    is_sovereign: bool = false,

    pub fn getStatus(self: User) []const u8 {
        if (self.is_sovereign) return "🌟 SOVEREIGN";
        if (self.score >= 5) return "✅ VERIFIED HUMAN";
        if (self.score <= -10) return "🚫 BLOCKED (BOT)";
        return "⏳ NEUTRAL";
    }
};

pub const GuardSystem = struct {
    users: std.StringHashMap(User),
    allocator: std.mem.Allocator,

    pub fn init(allocator: std.mem.Allocator) GuardSystem {
        return .{
            .users = std.StringHashMap(User).init(allocator),
            .allocator = allocator,
        };
    }

    pub fn deinit(self: *GuardSystem) void {
        self.users.deinit();
    }

    pub fn processDoubleTap(self: *GuardSystem, handle: []const u8) !void {
        var user = self.users.get(handle) orelse User{
            .handle = handle,
            .is_sovereign = !std.mem.endsWith(u8, handle, ".bsky.social"),
        };

        // Render the Dashboard
        std.debug.print("\n--- 🛡️  SKydrops TRUST DASHBOARD: {s} ---\n", .{user.handle});
        std.debug.print("Current Standing: {s}\n", .{user.getStatus()});
        std.debug.print("Trust Score:      {d}\n", .{user.score});
        std.debug.print("------------------------------------------\n", .{});

        try self.users.put(handle, user);
    }
};

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var guard = GuardSystem.init(allocator);
    defer guard.deinit();

    // Simulation: Double-tapping a custom domain user
    try guard.processDoubleTap("artist.skydrops.app");
    
    // Simulation: Double-tapping a standard bsky user
    try guard.processDoubleTap("newuser.bsky.social");
}
