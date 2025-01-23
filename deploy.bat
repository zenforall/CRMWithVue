npm run build
cd dist

echo "Sto per fare il deploy"

git init
git add -A
git commit -m 'New Deployment'
git push -f git@github.com:zenforall/CRMWithVue.git master:gh-pages

cd ..
