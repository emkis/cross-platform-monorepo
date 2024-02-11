/**
 * This file is the default entry point for the payments package, which by
 * default targets the web platform.
 *
 * We also exports everything else from the `shared` folder, as they are platform
 * agnostic and can be used in both web and native.
 */

export * from "./shared";
export * from "./web";
