# Code from: https://github.com/calcom/cal.com/blob/main/vercel.sh

if [ "$BOT_TOKEN" == "" ]; then
    echo "Error: BOT_TOKEN is empty"
    exit 1
fi

set -e
output=$(git submodule status --recursive)
submodules=$(echo $output | sed "s/ -/__/g" | sed "s/ /=/g" | sed "s/-//g" | tr "__" "\n")

git config --global init.defaultBranch main
git config --global advice.detachedHead false

for submodule in $submodules; do
    IFS="=" read COMMIT SUBMODULE_PATH <<<"$submodule"

    if [ "$SUBMODULE_PATH" == "apps/api" ]; then
        SUBMODULE_GITHUB=github.com/LightDotSo/api
    fi

    if [ "$SUBMODULE_PATH" == "apps/home" ]; then
        SUBMODULE_GITHUB=github.com/LightDotSo/home
    fi

    rm -rf tmp || true
    mkdir tmp
    cd tmp

    git init
    git remote add $SUBMODULE_PATH https://$BOT_TOKEN@$SUBMODULE_GITHUB
    git fetch --depth=1 $SUBMODULE_PATH $COMMIT
    git checkout $COMMIT

    cd ..
    rm -rf tmp/.git
    mv tmp/* $SUBMODULE_PATH/

    rm -rf tmp
done
