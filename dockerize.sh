#!/bin/bash
# builds and deploys docker image to dockerhub

repo="sixgill/sense-docs"



if [[ $# -eq 0 ]]; then
	echo "missing version number (command line argument #1)"
  exit
fi

npm run build

docker build -t $repo:v$1 -f Dockerfile . &&
docker push $repo:v$1 &&
docker push $repo:v$1