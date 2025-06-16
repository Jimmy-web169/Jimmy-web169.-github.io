// Language Switcher JavaScript
(function() {
  'use strict';

  // 等待頁面完全載入
  window.addEventListener('load', function() {
    // 處理語言切換連結點擊
    const languageLinks = document.querySelectorAll('.language-switcher .dropdown-item');

    languageLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();

        const lang = this.getAttribute('data-lang');
        const currentHost = window.location.protocol + '//' + window.location.host;

        if (lang === 'zh-tw') {
          window.location.href = currentHost + '/';
        } else if (lang === 'en') {
          window.location.href = currentHost + '/en/';
        } else {
          const href = this.getAttribute('href');
          window.location.href = currentHost + href;
        }
      });
    });
  });
})();
