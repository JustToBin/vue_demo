# 目录结构

``` bash
.
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── secure
│   │   ├── server.crt
│   │   └── server.key
│   ├── server-render.js
│   ├── server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   ├── webpack.prod.conf.js
│   └── webpack.server.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── system.setting.js
├── index.html
├── package-lock.json
├── package.json
├── src
│   ├── App.vue
│   ├── apis
│   │   ├── auth.js
│   │   ├── index.js
│   │   └── userInfo.js
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   ├── common
│   │   │   ├── Auth.vue
│   │   │   ├── CustTable.vue
│   │   │   ├── I18nSelect.vue
│   │   │   ├── Icon.vue
│   │   │   └── SideMenu.vue
│   │   └── index.js
│   ├── directives
│   │   ├── common
│   │   │   ├── auth.js
│   │   │   ├── notAuth.js
│   │   │   └── role.js
│   │   └── index.js
│   ├── i18n
│   │   ├── en.js
│   │   ├── index.js
│   │   └── zh-CN.js
│   ├── images
│   │   ├── BG.png
│   │   ├── login_bg.png
│   │   ├── login_logo.png
│   │   └── logo.png
│   ├── main.js
│   ├── router
│   │   ├── index.js
│   │   └── links
│   │     └── index.js
│   ├── services
│   │   ├── Logger.js
│   │   └── index.js
│   ├── store
│   │   ├── index.js
│   │   └── modules
│   │     ├── app.js
│   │     ├── auth.js
│   │     ├── index.js
│   │     └── user.js
│   ├── styles
│   │   ├── common.less
│   │   ├── definitions.less
│   │   ├── iconfont
│   │   │   ├── demo.css
│   │   │   ├── demo_fontclass.html
│   │   │   ├── demo_symbol.html
│   │   │   ├── demo_unicode.html
│   │   │   ├── iconfont.css
│   │   │   ├── iconfont.eot
│   │   │   ├── iconfont.js
│   │   │   ├── iconfont.svg
│   │   │   ├── iconfont.ttf
│   │   │   └── iconfont.woff
│   │   └── reset.less
│   ├── utils
│   │   ├── authUtil.js
│   │   ├── dateUtil.js
│   │   ├── helperUtil.js
│   │   ├── index.js
│   │   ├── localStorage.js
│   │   ├── requestUtil.js
│   │   └── urlUtil.js
│   └── views
│     ├── changePwd.vue
│     ├── forgetPwd.vue
│     ├── layouts
│     │   └── main.vue
│     ├── login.vue
│     └── main
│       ├── index.vue
│       ├── userAdd.vue
│       ├── userEdit.vue
│       └── userInfo.vue
├── static
│   ├── favicon.ico
│   └── public.js
└── yarn.lock
```