## Things to explain better

- When to have an `.native.ts` file and when to have a `.ts` file.
- Why inside a package we don't have the `moduleSuffixes` configuration we need
  to have exports with explicit `.native.ts` suffixes.
- How to structure a package that supports both platforms but depend on packages
  that also have different entry points per platform.
- Does the bundler includes things of `.native.ts` files on web?

## Monorepo structure

### Applications

The applications in this monorepo are just simple examples to demonstrate how
different applications inside a monorepo can use the same internal packages
but change have different behaviours based on the platforms they are targeting
with the `moduleSuffixes` configuration.

- **@cross/web**: You can run this by executing `pnpm start:web`.
- **@cross/native**: You can run this by executing `pnpm start:native`.

Or to run both, just simply execute `pnpm start`.

### Packages

All the packages within this monorepo that are used by the applications.

#### @cross/permissions

> A package with zero dependencies that works in Web React and React Native.

As we don't have any distinction between platforms (web or native) and the code
of this package is the same for both, we don't need to have any specific suffixes
in the file names, they can be named normally as `file.ts` or `file.tsx`.

The `tsconfig.json` of this package also doesn't need to have any configuration
for `moduleSuffixes` as this package doesn't depend on anything else that has
different files per platform.

---

#### @cross/core

> A package with zero dependencies but with different entry points for Web React and React Native.

This package has modules that are platform agnostic, which means that they
work both in React and React Native, but it also has modules that are not
so in these cases the need to specify different entry points for each platform.

The **event-emitter** module for example, is platform agnostic and you can see
that inside its folder we only have regular `.ts` files, as we don't need to
specify different entry points for each platform.

The **logger** module is only available for React Native platform, so inside its
folder, we only have `.native.ts` files to be explicit about the target platform.
This ensures no one would get confused about which platform this module supports
and also allows the possibility of adding a `logger.ts` file in the future that
would support the Web React platform too.

The **apis** module..
Explains that some files are both platforms and other not,

This package has the `index.ts` and `index.native.ts`, this means we will export
everything that is supported in Web React platform on the `index.ts` and
everything that is supported in React Native platform on the `index.native.ts`,
the consumer of our package will resolve the right entry point of this package
based on their `tsconfig.json` configuration.

We don't need the `tsconfig.json` to have the configuration for `moduleSuffixes`
as we don't depend on a package that has these different files per platform.

---

#### @cross/payments

...

---

#### @cross/config

Just a simple package to define the base TypeScript configuration that are
used in all the packages and applications.
