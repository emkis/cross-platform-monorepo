# Cross Platform Monorepo

This is an example of an monorepo with internal packages that supports different platforms like React for Web and React Native at the same time in a way that is transparent for the consumer of the packages.

## Example

Consider you have two applications, one React application for Web and a React Native app, in each client you want to use the same package like an Design System, but each one of them have their specific differences so you can't import the same exact code.

Which means that the import below should fail, right? But it doesn't.

```ts
// web-client.ts
import { Button } from "@demo/components";

// native-client.ts
import { Button } from "@demo/components";
```

Both imports have the same path and the same package, but resolve to different modules and each one of them imports a different **Button** component, one of them that works in React for Web and the other for React Native.

## How this works?

This is possible because of the [`moduleSuffixes`](https://www.typescriptlang.org/tsconfig#moduleSuffixes) option that the TypeScript configuration (**tsconfig.json**) file supports, it allows us to change the priority of how the module resolution algorithm of an import works.

Consider that we have a package called **@demo/components**, and this package has the following structure:

```
src/
  Button.ts
  Button.native.ts
  index.ts
```

The content of **index.ts** file is:

```ts
export { Button } from "./Button";
```

In another TypeScript project that has the TSconfig file with the following configuration:

```json
{
  "compilerOptions": {
    "moduleSuffixes": [".native", ""]
  }
}
```

With a simple import like this:

```ts
import { Button } from "@demo/components";
```

TypeScript will look at the entry point of this package which is the `index.ts`, then it will look to the export of `./Button` module and try to resolve `./Button.native.ts` first, if it doesn't find it, it will try to resolve the file `./Button.ts`. In short, instead of referencing the usual `index.ts` files, it will prioritise `index.native.ts` files first, and then `index.ts` files.

This is just a simple example and the module resolution algorithm is more complex than that, but it gives enough context for you to understand how this works. Read more details in the links below if you want to know more.

- [TypeScript Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- [moduleSuffixes](https://www.typescriptlang.org/tsconfig#moduleSuffixes) option in TSConfig.

## See the "magic" in action

This monorepo has two applications, each one of them are built with the same internal packages but both behave differently because of the `moduleSuffixes` rules.

> As these applications are just an example, neither of them run on Web or Native environments, they are going to be executed with Node but the outcome will be the same as if they were being executed in a real environment.

You can run the applications by following these instructions:

- **@cross/web**: You can run this by executing `pnpm start:web`.
- **@cross/native**: You can run this by executing `pnpm start:native`.
- Or to run both, just simply execute `pnpm start`.

After both apps finish running you will see the logs of each application in the terminal and you can see how they behave differently, specifically in the Payment APIs urls and in the way they fetch payments.

## How to define the structure of a package?

Usually we can use a simple structure in most of the packages, but unfortunately, the same default structure doesn't work if your package depends on other packages that also are cross platform.

This might be confusing for now, but keep reading and it will be clear once you understand the different type of packages there are.

### Platform agnostic package

This type of package will work in both platforms, React for Web and React Native. Here the idea is to have code that can imported directly by any application, regardless of the platform.

In this case we don't need to have any specific suffixes in the file names, they can be named normally as `file.ts` or `file.tsx`.

Check the **event-emitter** module of the **@cross/core** package as an example.

### Packages

All the packages within this monorepo are used by the applications.

#### @cross/permissions

> A package with zero dependencies that works in Web React and React Native.

As we don't have any distinction between platforms (web or native) and the code of this package is the same for both, we don't need to have any specific suffixes in the file names, they can be named normally as `file.ts` or `file.tsx`.

The `tsconfig.json` of this package also doesn't need to have any configuration for `moduleSuffixes` as this package doesn't depend on anything else that has different files per platform.

---

#### @cross/core

> A package with zero dependencies but with different entry points for Web React and React Native.

This package has modules that are platform agnostic, which means that they work both in React and React Native, but it also has modules that are not so in these cases the need to specify different entry points for each platform.

The **event-emitter** module for example, is platform agnostic and you can see that inside its folder we only have regular `.ts` files, as we don't need to specify different entry points for each platform.

The **logger** module is only available for React Native platform, so inside its folder, we only have `.native.ts` files to be explicit about the target platform.
This ensures no one would get confused about which platform this module supports and also allows the possibility of adding a `logger.ts` file in the future that would support the Web React platform too.

The **apis** module..
Explains that some files are both platforms and other not,

This package has the `index.ts` and `index.native.ts`, this means we will export everything that is supported in Web React platform on the `index.ts` and everything that is supported in React Native platform on the `index.native.ts`, the consumer of our package will resolve the right entry point of this package based on their `tsconfig.json` configuration.

We don't need the `tsconfig.json` to have the configuration for `moduleSuffixes` as we don't depend on a package that has these different files per platform.

---

#### @cross/payments

...

---

#### @cross/config

Just a simple package to define the base TypeScript configuration that are used in all the packages and applications.

## Things to explain better

- When to have an `.native.ts` file and when to have a `.ts` file.
- Why inside a package we don't have the `moduleSuffixes` configuration we need to have exports with explicit `.native.ts` suffixes.
- How to structure a package that supports both platforms but depend on packages that also have different entry points per platform.
- Does the bundler includes things of `.native.ts` files on web?
