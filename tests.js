var context = require.context('./src/app', true, /\.spec\.js$/);
context.keys().forEach(context);
console.log(`
Found ${context.keys().length} spec file(s)
${context.keys().join("\n")}
`);