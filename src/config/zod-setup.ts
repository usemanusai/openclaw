import { z, toJSONSchema } from "zod";

/**
 * Zod v4 Runtime Augmentations
 * 
 * This file adds legacy Zod v3 methods that the OpenClaw codebase expects
 * but are not part of the standard Zod v4 implementation or types.
 */

// 1. Augment ZodType with .register() and .toJSONSchema()
if (!(z.ZodType.prototype as any).register) {
    (z.ZodType.prototype as any).register = function (registry: any, ...meta: any[]) {
        if (typeof registry?.register === "function") {
            registry.register(this, ...meta);
        }
        return this;
    };
}

if (!(z.ZodType.prototype as any).toJSONSchema) {
    (z.ZodType.prototype as any).toJSONSchema = function (params?: any) {
        return toJSONSchema(this, params);
    };
}

// 2. Augment ZodObject with .safeExtend()
if (!(z.ZodObject.prototype as any).safeExtend) {
    (z.ZodObject.prototype as any).safeExtend = function (shape: any) {
        return this.extend(shape).strict();
    };
}

console.log("[ZodSetup] Runtime augmentations applied (.register, .toJSONSchema, .safeExtend)");
