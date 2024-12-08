echo "Ciao a tutti"

npm run build

echo "Ciao a tutti"

cd dist

git init
git add -A
git commit -m 'New Deployment'
git push -f git@github.com:zenforall/CRMWithVue.git master:gh-pages

cd ..
