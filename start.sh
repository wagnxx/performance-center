#!/bin/bash

# for ip in 192.168.1.{1..254}
# do
#  (
#  ping $ip -c 4 &>/dev/null;
#  if [ $? -eq 0 ]; then
#   echo $ip is alive
#  fi
#  ) &
# done
# wait

# npm  run serve

npm run client:dev & npm run server:dev & npm run server:start ||  exit 1