const fs = require('fs');
const path = require('path');

const schemasFile = path.join(__dirname, '..', 'node_modules', 'zod', 'src', 'v4', 'classic', 'schemas.ts');

if (!fs.existsSync(schemasFile)) {
  console.error(`Target file not found: ${schemasFile}`);
  process.exit(0);
}

let content = fs.readFileSync(schemasFile, 'utf8');

// 1. Patch ZodType interface (Types)
if (!content.includes('register<R extends any>(')) {
  content = content.replace(
    /export interface ZodType<[\s\S]*?> extends core\.\$ZodType<[\s\S]*?> {/,
    `$&
  register<R extends any>(registry: R, ...meta: any[]): this;
  toJSONSchema(params?: {
      target?: "draft-7" | "draft-2020-12";
      unrepresentable?: "throw" | "any";
      io?: "input" | "output";
      [key: string]: any;
  }): Record<string, unknown>;`
  );
}

// 2. Patch ZodType implementation (Runtime)
if (!content.includes('inst.toJSONSchema =')) {
  // Inject into the ZodType constructor
  // We use explicit types since this is a .ts file
  content = content.replace(
    /export const ZodType: core\.\$constructor<ZodType> = \/\*@__PURE__\*\/ core\.\$constructor\("ZodType", \(inst, def\) => {/,
    `$&
  (inst as any).register = (registry: any, ...meta: any[]) => {
    registry.register(inst, ...meta);
    return inst;
  };
  (inst as any).toJSONSchema = (params: any) => {
    return (core as any).toJSONSchema(inst, params);
  };`
  );
}

// 3. Patch ZodObject interface (Types)
if (!content.includes('safeExtend<S extends any>(')) {
  content = content.replace(
    /export interface ZodObject<[\s\S]*?> extends _ZodType<core\.\$ZodObjectInternals<Shape, Config>>,[\s\S]*?core\.\$ZodObject<Shape, Config> {/,
    `$&
  safeExtend<S extends any>(shape: S): ZodObject<any, any>;`
  );
}

// 4. Patch ZodObject implementation (Runtime)
if (!content.includes('inst.safeExtend =')) {
  // Inject into the ZodObject constructor
  content = content.replace(
    /export const ZodObject: core\.\$constructor<ZodObject> = \/\*@__PURE__\*\/ core\.\$constructor\("ZodObject", \(inst, def\) => {/,
    `$&
  (inst as any).safeExtend = (shape: any) => {
    const newShape = { ...(inst as any).shape, ...shape };
    return (ZodObject as any).init(inst.clone(), { ...def, shape: newShape });
  };`
  );
}

fs.writeFileSync(schemasFile, content);
console.log('Successfully patched Zod schemas.ts with extra types and methods (v2).');
