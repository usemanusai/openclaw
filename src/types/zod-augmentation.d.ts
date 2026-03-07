import { ZodType, ZodObject, ZodRawShape } from "zod";

declare module "zod" {
    export interface ZodType<out Output = any, out Input = any, out Internals = any> {
        /**
         * Registers the schema in a registry.
         * Part of Zod v4 legacy/classic support in this project.
         */
        register<R extends any>(registry: R, ...meta: any[]): this;

        /**
         * Converts the Zod schema to a JSON Schema.
         * This provides the .toJSONSchema() method that the project expects.
         */
        toJSONSchema(params?: {
            target?: "draft-7" | "draft-2020-12";
            unrepresentable?: "throw" | "any";
            io?: "input" | "output";
            [key: string]: any;
        }): Record<string, unknown>;
    }

    export interface ZodObject<
        out Shape extends ZodRawShape = ZodRawShape,
        out Config = any
    > {
        /**
         * Project-specific extension for safely extending a Zod object schema.
         */
        safeExtend<S extends ZodRawShape>(shape: S): ZodObject<any, any>;
    }
}
