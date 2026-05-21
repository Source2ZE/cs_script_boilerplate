# cs_script_boilerplate

A simple CS2 typescript script boilerplate to get you started quickly.

## Usage

1. Clone the repository or download the ZIP file and extract it.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Run `npm start` to start the watch server.

## Output file

You can change the output file name and path in the `rollup.config.js` file. By default, it is set to `build/index.js` but you can modify it to an absolute path of your cs2 addon to automatically copy the output file there and hotreload it in-game.

## Updating packages

You can use this one liner to update all the s2ze packages to the latest version

`npm install @s2ze/debug@latest @s2ze/math@latest @s2ze/scheduler@latest @s2ze/tsconfig@latest @s2ze/types@latest`
