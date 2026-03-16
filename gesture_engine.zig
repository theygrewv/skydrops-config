const std = @import("std");

pub const GestureType = enum { single_tap, double_tap, none };

pub const TouchHandler = struct {
    last_tap_time: i64,
    threshold_ms: i64 = 300,

    pub fn init() TouchHandler {
        return .{ .last_tap_time = 0 };
    }

    pub fn handleTap(self: *TouchHandler, current_time: i64) GestureType {
        const delta = current_time - self.last_tap_time;
        
        if (delta < self.threshold_ms) {
            self.last_tap_time = 0; // Reset after successful double tap
            return .double_tap;
        } else {
            self.last_tap_time = current_time;
            return .single_tap;
        }
    }
};

pub fn main() !void {
    var handler = TouchHandler.init();
    const stdout = std.debug;

    stdout.print("\n--- Skydrops Gesture Engine ---\n", .{});
    stdout.print("Double-tap handle to verify...\n\n", .{});

    // Simulate First Tap
    var now = std.time.milliTimestamp();
    var result = handler.handleTap(now);
    stdout.print("Tap 1: {s}\n", .{@tagName(result)});

    // Simulate a quick Second Tap (200ms later)
    std.Thread.sleep(200 * std.time.ns_per_ms);
    now = std.time.milliTimestamp();
    result = handler.handleTap(now);
    
    if (result == .double_tap) {
        stdout.print("Tap 2: {s} 🌟 TRIGGERING TRUST DASHBOARD\n", .{@tagName(result)});
    }
}
