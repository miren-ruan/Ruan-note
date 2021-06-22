(function() {
  function eachToc(list) {
    var nav = {
      num: 0,
      list: [],
      currentH1: null,
      currentH2: null,
      currentH3: null,
    }
    list.forEach(item => {
      var title = document.createElement("div");
      title.innerHTML = item.title;
      item.title = title.innerText;
      nav.num++;
      if(item.level === 1) {
        nav.currentH1 = {title: item.title, level: item.level, slug: item.slug, children: []};
        nav.list.push(nav.currentH1);
        nav.currentH2 = null;
      } else if(item.level === 2) {
        nav.currentH2 = {title: item.title, level: item.level, slug: item.slug, children: []};
        if(nav.currentH1) {
          nav.currentH1.children.push(nav.currentH2);
        }
        nav.currentH3 = null;
      } else if(item.level === 3) {
        nav.currentH3 = {title: item.title, level: item.level, slug: item.slug, children: []};
        if(nav.currentH2) {
          nav.currentH2.children.push(nav.currentH3);
        } else if (nav.currentH1) {
          nav.currentH1.children.push(nav.currentH3);
        } else {
          nav.list.push(nav.currentH3);
        }
      }
    });
    return nav;
  }
  function each(list, p, level=1) {
    return list.reduce((pre, current, index) => {
      var num = p? `${p}.${index+1}` : `${index+1}`;
      pre += `<a class="h${level}" href="${current.slug}"><span class="toc-title">${current.title}</span><span class="toc-num">${num}</span></a>${each(current.children||[], num, level+1)}`
      return pre;
    }, "");
  }

  function coverPage(config = {}) {
    console.log(config, "config");
    if(!config.title) config.title = "";
    if(!config.subTitle) config.subTitle = "";
    if(!config.date) {
      var nowDate = new Date();
      var now = `${nowDate.getFullYear()}年${nowDate.getMonth()+1}月`;
      config.date = now;
    }
    if(!config.author) config.author = "北京科蓝软件系统股份有限公司";
    var converPage = document.createElement('div');
    converPage.className = "page-cover";
    converPage.innerHTML = "<div class=\"page-cover-logo\">"
    + "<img src=\"/assets/images/csii-logo.png\" /></div>"
    + "<div class=\"page-cover-title\">" + config.title + "</div>"
    + "<div class=\"page-cover-sub-title\">" + config.subTitle + "</div>"
    + "<div class=\"page-cover-date\">" + config.date + "</div>"
    + "<div class=\"page-cover-author\">" + config.author + "</div>";
    return converPage;
  }

  function install(hook, vm) {
    hook.afterEach((html, next) => {
      var conf = vm.config.toc || {};
      var nav = eachToc(vm.compiler.cacheTOC[vm.route.file]||[]);
      var content = document.querySelector(".markdown-section");
      var doc = document.createElement("div");
      doc.className = "page-toc";
      var h = Math.ceil(nav.num * 30 / document.body.clientHeight)*100;
      doc.style = "height: " + h + "vh;"
      var _nav = each(nav.list);
      doc.innerHTML = _nav;
      content.before(coverPage(conf));
      content.before(doc);
      next(html);
    });
  }
  $docsify.plugins = [].concat(install, $docsify.plugins);
})();