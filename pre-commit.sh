#!/bin/sh

git stash -q --keep-index
gulp build
RESULT=$?
git stash pop -q
[ $RESULT -ne 0 ] && exit 1
git add dist/.
exit 0