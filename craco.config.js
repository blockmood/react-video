const CracoAntDesignPlugin = require("craco-antd");
const CracoLessPlugin = require("craco-less");
const { loaderByName } = require("@craco/craco");

module.exports = {
  plugins: [
    { plugin: CracoAntDesignPlugin },
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule(lessRule, context) {
          // You have to exclude these file suffixes first,
          // if you want to modify the less module's suffix
          lessRule.exclude = /\.m\.less$/;
          return lessRule;
        },
        modifyLessModuleRule(lessModuleRule, context) {
          // Configure the file suffix
          lessModuleRule.test = /\.m\.less$/;

          // Configure the generated local ident name.
          const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
          cssLoader.options.modules = {
            localIdentName: "[local]_[hash:base64:5]",
          };

          return lessModuleRule;
        }
      }
    }
  ],
};