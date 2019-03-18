## 安装：
npm i -d

## 启动：
npm run serve
启动后，可以通过http://localhost:3007/print/访问

## nginx配置
```
location /print/ {
    proxy_pass http://127.0.0.1:3007/print/;
    proxy_set_header Host '$host:99';
}
```
其中的$host:99要根据你的开发环境实际情况而定。

## 其它启动命令
```
serve
    vue-cli-service serve
build-beta
    vue-cli-service build --mode beta
build-release
    vue-cli-service build --mode release
lint
    vue-cli-service lint
deploy
    rishiqing-deploy --config='.rishiqing-deploy.yml'
```
 