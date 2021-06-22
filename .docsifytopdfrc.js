const {name} = require("./package.json");

// 页脚
const footerTemplate = `<div 
style="width:80%;margin:0 auto;font-size:8px;border-top:1px solid #ddd;padding:10px 0;display: flex; justify-content: space-between; ">
<span style="">csii-vx</span>
<div><span class="pageNumber">
</span> / <span class="totalPages"></span></div>
</div>`;
// 页眉
const headerTemplate = `<div class="title"
style="width:80%;margin:0 auto;font-size:8px;border-bottom:1px solid #ddd;padding:10px 0;text-align: center;"></div>`

module.exports = {
  contents: ["_coverpage.md", "_sidebar.md" ], // array of "table of contents" files path
  pathToPublic: `pdf/${name||"readme"}.pdf`, // path where pdf will stored
  pdfOptions: {
    printBackground: true, // 是否打印背景图 默认false
    headerTemplate,
    footerTemplate,
    displayHeaderFooter: true, // 显示页眉和页脚。默认是不显示
    margin: {
      top: 80,
      bottom: 80
    }
  }, // reference: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
  removeTemp: true, // remove generated .md and .html or not
  emulateMedia: "print", // mediaType, emulating by puppeteer for rendering pdf, 'print' by default (reference: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pageemulatemediamediatype)
}