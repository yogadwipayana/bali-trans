pm2 stop bali-trans
pm2 delete bali-trans

cd /bali-trans
git pull

npm install
npm run build
pm2 start npm --name "bali-trans" -- run preview

pm2 save