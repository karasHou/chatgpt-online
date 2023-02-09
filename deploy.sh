#!/usr/bin/env sh

# 忽略错误
set -e

# 先推送本地master仓库
git push

# 构建
npm run build

# 进入待发布的目录
cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init

git config --local user.name "猴头咕"
git config --local user.email "948618251@qq.com"

git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
# git push -f git@github.com:karasHou/karasHou.github.io.git master

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:karasHou/chatgpt-online.git master:gh-pages

rm -rf .git

cd -
