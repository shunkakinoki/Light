# Code from: https://github.com/calcom/cal.com/blob/main/vercel.sh

rm -r *

git init
git remote add origin https://github.com/LightDotSo/LightDotSo
git fetch --depth=1
git checkout main -f

if [ "$BOT_TOKEN" == "" ]; then
    echo "Error: BOT_TOKEN is empty"
    exit 1
fi

git config --global init.defaultBranch main
git config --global advice.detachedHead false

if [ "$VERCEL_GIT_REPO_SLUG" == "api" ]; then
    SUBMODULE_PATH=apps/api
    SUBMODULE_GITHUB=github.com/LightDotSo/api
fi

if [ "$VERCEL_GIT_REPO_SLUG" == "home" ]; then
    SUBMODULE_PATH=apps/home
    SUBMODULE_GITHUB=github.com/LightDotSo/home
fi

rm -rf tmp || true
mkdir tmp
cd tmp

git init
git remote add $SUBMODULE_PATH https://$BOT_TOKEN@$SUBMODULE_GITHUB
git fetch --depth=1 $SUBMODULE_PATH $VERCEL_GIT_COMMIT_SHA
git checkout $VERCEL_GIT_COMMIT_SHA

cd ..
rm -rf tmp/.git
mv tmp/* $SUBMODULE_PATH/

rm -rf tmp

pnpm install --no-lockfile
