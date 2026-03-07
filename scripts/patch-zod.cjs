const fs = require('fs');
const path = require('path');

// Target file in the local workspace or in node_modules on the VPS
const schemasFile = path.join(__dirname, '..', 'node_modules', 'zod', 'src', 'v4', 'classic', 'schemas.ts');

if (!fs.existsSync(schemasFile)) {
    console.error(`Target file not found: ${schemasFile}`);
    process.exit(0); // Exit gracefully if not found
}

let content = fs.readFileSync(schemasFile, 'utf8');

// 1. Patch ZodType interface
if (!content.includes('register<R extends core.$ZodRegistry>(')) {
    // Use a regex to find the ZodType interface and inject the new methods
    content = content.replace(
        /export interface ZodType<[\s\S]*?> extends core\.\$ZodType<[\s\S]*?> {/,
        `$&
  /**
   * Registers the schema in a registry.
   * Added by OpenClaw patch.
   */
  register<R extends any>(registry: R, ...meta: any[]): this;

  /**
   * Converts the Zod schema to a JSON Schema.
   * Added by OpenClaw patch.
   */
  toJSONSchema(params?: {
      target?: "draft-7" | "draft-2020-12";
      unrepresentable?: "throw" | "any";
      io?: "input" | "output";
      [key: string]: any;
  }): Record<string, unknown>;`
    );
}

// 2. Patch ZodObject interface
if (!content.includes('safeExtend<S extends core.$ZodShape>(')) {
    content = content.replace(
        /export interface ZodObject<[\s\S]*?> extends _ZodType<core\.\$ZodObjectInternals<Shape, Config>>,[\s\S]*?core\.\$ZodObject<Shape, Config> {/,
        `$&
  /**
   * Project-specific extension for safely extending a Zod object schema.
   * Added by OpenClaw patch.
   */
  safeExtend<S extends any>(shape: S): ZodObject<any, any>;`
    );
}

fs.writeFileSync(schemasFile, content);
console.log('Successfully patched Zod schemas.ts with extra methods.');
