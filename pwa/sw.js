var cacheStorageKey = 'my-cache-v1';

var cacheList = [
    '/',
    'index.html',
    'main.css',
    'main.js',
    'img.png'
];
this.addEventListener('install', function (event) {
    console.log('Cache Event');
    event.waitUntil(
        caches.open(cacheStorageKey).then(function(cache) {
            console.log('Adding to Cache:', cacheList);
            return cache.addAll(cacheList);
        })
        .then(function() {
            console.log('install event open cache ' + cacheStorageKey);
            console.log('Skip waiting!');
            return self.skipWaiting();
        })
    );
});

// 自定义请求响应
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // 来来来，代理可以搞一些代理的事情

            // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
            console.log('response: ', response);
            if (response) {
                return response;
            }
            // 如果 service worker 没有返回，那就得直接请求真实远程服务
            var request = event.request.clone(); // 把原始请求拷过来
            return fetch(request).then(function (httpRes) {
                // http请求的返回已被抓到，可以处置了。

                // 请求失败了，直接返回失败的结果就好了。。
                if (!httpRes || httpRes.status !== 200) {
                    return httpRes;
                }

                // 请求成功的话，将请求缓存起来。
                var responseClone = httpRes.clone();
                caches.open(cacheStorageKey).then(function (cache) {
                    cache.put(event.request, responseClone);
                });

                return httpRes;
            })
            // .catch(function(err) { // 无网络情况下从缓存中读取
            //     console.error(err);
            //     return caches.match(event.request);
            // });
        })
    );
});


// 自动更新所有页面

// 安装阶段跳过等待，直接进入 active
// self.addEventListener('install', function (event) {
//     event.waitUntil(self.skipWaiting());
// });

self.addEventListener('activate', function (event) {
    console.log('Activate event');
    event.waitUntil(
        Promise.all([

            // 更新客户端
            self.clients.claim(),

            // 清理旧版本
            caches.keys().then(function (cacheNames) {
                console.log('cacheNames: ', cacheNames, cacheNames.map);
                return Promise.all(
                    cacheNames.map(function (cacheName) {
                        if (cacheName !== cacheStorageKey) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});
