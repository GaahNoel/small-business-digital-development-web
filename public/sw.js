if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let a={};const r=e=>n(e,c),o={module:{uri:c},exports:a,require:r};s[c]=Promise.all(t.map((e=>o[e]||r(e)))).then((e=>(i(...e),a)))}}define(["./workbox-75794ccf"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/924-ba01de79e7876c51.js",revision:"tN_ZVF6sr76cX_eqExp-J"},{url:"/_next/static/chunks/framework-c62b762f9af1c2aa.js",revision:"tN_ZVF6sr76cX_eqExp-J"},{url:"/_next/static/chunks/main-b82de7430d8403b8.js",revision:"tN_ZVF6sr76cX_eqExp-J"},{url:"/_next/static/chunks/pages/_app-a4deb167f5be2d42.js",revision:"tN_ZVF6sr76cX_eqExp-J"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"tN_ZVF6sr76cX_eqExp-J"},{url:"/_next/static/chunks/pages/index-d89755f54ddb6cd5.js",revision:"tN_ZVF6sr76cX_eqExp-J"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"tN_ZVF6sr76cX_eqExp-J"},{url:"/_next/static/chunks/webpack-9b0e45c24ba97727.js",revision:"tN_ZVF6sr76cX_eqExp-J"},{url:"/_next/static/tN_ZVF6sr76cX_eqExp-J/_buildManifest.js",revision:"tN_ZVF6sr76cX_eqExp-J"},{url:"/_next/static/tN_ZVF6sr76cX_eqExp-J/_middlewareManifest.js",revision:"tN_ZVF6sr76cX_eqExp-J"},{url:"/_next/static/tN_ZVF6sr76cX_eqExp-J/_ssgManifest.js",revision:"tN_ZVF6sr76cX_eqExp-J"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icon-192x192.png",revision:"2057fe7a9c2c861f0ef9ff06f238285b"},{url:"/icon-256x256.png",revision:"c400e80ef1dfbbd7c00f0125691bc3e9"},{url:"/icon-384x384.png",revision:"8d37c6683fc6888cb1820b77f7597721"},{url:"/icon-512x512.png",revision:"959a3f07d1818cb0e0c1a3bc791e5831"},{url:"/manifest.json",revision:"79ae845cb4e79903794211021bcae0f5"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
