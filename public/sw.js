if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let a={};const r=e=>i(e,t),g={module:{uri:t},exports:a,require:r};s[t]=Promise.all(n.map((e=>g[e]||r(e)))).then((e=>(c(...e),a)))}}define(["./workbox-75794ccf"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Ad-Video.mp4",revision:"f79200f80aab9b68be2efb4a193ac20c"},{url:"/Ad-Video.mp4:Zone.Identifier",revision:"9269e17e9c0c9f316fe5105d547ae700"},{url:"/Item.svg",revision:"7373adf2479fbc7b9a9ee6b2e50586c3"},{url:"/Logo.svg",revision:"2936f4188ae46f5e9207d72bb3dae96a"},{url:"/Noel.jpg",revision:"b89e60601d544df4fde64b74fc4b6dab"},{url:"/Nogueira.jpg",revision:"5494ec6ec566e31ee11ed7b7d9be0120"},{url:"/Shop-Bg.svg",revision:"dda86c52818848053d12c188e3f63de3"},{url:"/Shop.svg",revision:"22295d8c86bc058c18579850d4981b00"},{url:"/_next/static/chunks/0c428ae2-d4ea8c49e31497f1.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/1067-da874cda30cb2131.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/1bfc9850-d5f7e122025ef187.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/2474-cb40ec6a282d9e59.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/252f366e-8ef8473e23c8fa75.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/2604-34a38eaec743fde6.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/2945-f39ca678509fdc2f.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/2c796e83-9033b1e8c6aef660.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/3693-d654c3f90287fd9b.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/4018-8b7780c1cdcee004.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/447-5e998c45ffddc659.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/4602-d716d2f717340ce0.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/4818-734eda68015f66b9.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/4afafdf3-76d2767359d4261a.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/5432-2ff520a17453d161.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/5483-213ae453aafb1dc3.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/579-72e69b750805cf87.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/5979-4baea3bd5f54e421.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/6365-19fa801623b34ad9.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/6893-4e0c775769668b41.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/7496-581ab688ab698dff.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/78e521c3-7730f4d2d3bc3fa6.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/8133-25dfe173a6c2d342.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/8429-5b93625933385ae5.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/8672-cc79187d44b3213b.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/9464-d6763bb5f9a8d8f5.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/9651-88517209cb4ebe79.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/a00da3a2-b74fe0cb367e01fa.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/d7eeaac4-cc1661503dda203e.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/ea88be26-0916539e7153d77e.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/fc56bfa5-16dacdbe4c98b94e.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/framework-a070cbfff3c750c5.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/main-7a436e2b91da37e6.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/_app-7f55f56612335041.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/_error-25839e52160ad85d.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/business-items/%5Bid%5D-252fd38e47a845a1.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/businesses-nearby-e351156466359bbe.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/credential-user-4c46f3c3ec9a2135.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/email-validation/%5Bid%5D-a943e62eec04a028.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/entrepreneur-a51f907a590fef96.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/establishment-register-b7237da94a71e963.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/establishment/%5Bid%5D-e22d83f01cf1aa84.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/finalize-order-fb281e0a3f0a107f.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/index-e0e2c4305fe1403c.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/login-44e83601725e580b.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/order-info/%5Bid%5D-474196c85f1029fd.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/order-list-7d1b341d7231e189.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/product-list-b7d51ea4edf6483c.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/product-register/%5Bid%5D-05294b18af4643f8.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/service-list-70462c17bc0d5d47.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/shop-e4ad510c6ae55e00.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/pages/user-profile-dfae140e2ff70a8d.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/chunks/webpack-5bc3c02718d096b9.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/css/100aac278bfe1213.css",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/css/3b781a1ff48f0d43.css",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/css/84cf20c8de8d8771.css",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/ibj7C-SGwxg5IjzQg6KE9/_buildManifest.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/ibj7C-SGwxg5IjzQg6KE9/_middlewareManifest.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/_next/static/ibj7C-SGwxg5IjzQg6KE9/_ssgManifest.js",revision:"ibj7C-SGwxg5IjzQg6KE9"},{url:"/business-analytics.json",revision:"0b33dd054781e8821edaaafd4726228e"},{url:"/business-idea-animation.json",revision:"7c8aca2133f85e476925024ed0f2c5c0"},{url:"/business-meta.json",revision:"e44eff4e65c95c698d2c10c8812c2e9d"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icon-192x192.png",revision:"2057fe7a9c2c861f0ef9ff06f238285b"},{url:"/icon-256x256.png",revision:"c400e80ef1dfbbd7c00f0125691bc3e9"},{url:"/icon-384x384.png",revision:"8d37c6683fc6888cb1820b77f7597721"},{url:"/icon-512x512.png",revision:"959a3f07d1818cb0e0c1a3bc791e5831"},{url:"/imgLoader.gif",revision:"926304843ea8e8b9bc22c52c755ec34f"},{url:"/imgLoaderGrey.gif",revision:"bb01ab84dfdb6aeceb578d37f5d388eb"},{url:"/manifest.json",revision:"79ae845cb4e79903794211021bcae0f5"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
