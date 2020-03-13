const pluginName = 'HtmlAfterPlugin';
class HtmlAfterPlugin {
  createAssetsFragment(data) {

    const dir={
      js:item=>`<script type="module" src="${item}"></script>`,
      css:item=>`<link rel="stylesheet" href="${item}"/>`
    }

    let js=data.js.map(dir.js).join('');
    let css=data.css.map(dir.css).join('');

    return{
      js,
      css
    }
  }
  apply(compiler) {
    // compiler.hooks.compilation.tap(pluginName, compilation => {
    //   compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
    //     pluginName,
    //     (htmlPluginData, cb) => {
    //       htmlPluginData.body.forEach(tag => {
    //         if (tag.tagName == 'script') {
    //           tag.attributes.type = 'module';
    //         }
    //       });
    //       cb(null, htmlPluginData);
    //     }
    //   );
    // });

    compiler.hooks.compilation.tap(pluginName, compilation => {
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName,htmlPluginData=>{
            // htmlPluginData.replace();
            let _html=htmlPluginData.html;
            let result=this.createAssetsFragment(htmlPluginData.assets);
            _html = _html.replace(/@components/g, "../../components");
            _html=_html.replace('<!--injectcss-->',result.css);
            _html=_html.replace('<!--injectjs-->',result.js);
            htmlPluginData.html=_html
            console.log("htmlplugindata==========",htmlPluginData.assets)
        })
    });
  }
}

module.exports = HtmlAfterPlugin;

