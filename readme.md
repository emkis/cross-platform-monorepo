## Things to do

I still need to create the example of a package that is cross-platform and
depends on another cross-platform package (@cross/core).

## Updates

The type inference is working great, but when I'm running or building the application
with the `.native` config, it's not mapping correctly using Vite.

The only way to compiling the code works with `.native` files is using the React Native CLI.
From what I read, this is something that the Metro bundle supports by default, that's why it works
great with React Native.

I managed to bundle the code to work with `.native`, but only using ESBuild.

This command works in a package that prioritises `.native` files:

```bash
pnpm esbuild --bundle ./apps/native/src/main.ts --resolve-extensions=.native.ts,.ts --outdir=dist
```
