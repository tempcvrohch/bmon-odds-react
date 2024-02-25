#!/bin/bash
# run this in root of project

avatar_dir="./public/img/avatars"

if [ ! -d $"$avatar_dir" ]; then
	mkdir "$avatar_dir"
fi

for i in {1..20}; do
	curl -o "$avatar_dir/$i.jpg" "https://avatars.tzador.com/face?gender=male&size=100";
	sleep 0.5;
done