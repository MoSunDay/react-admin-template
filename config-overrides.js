const {
    override,
    addDecoratorsLegacy,
    fixBabelImports,
    addLessLoader,
} = require('customize-cra');

const modiyVars = require("./theme/nx.js");

module.exports = override(
    addDecoratorsLegacy(),
    fixBabelImports('import', {
        libraryName: 'antd',
        librayDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modiyVars,
    }),
);