#!/bin/bash

if [[ $# -ne 1 ]]; then
  echo "usage: `basename "$0"` [username]"
  exit 1
fi

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

source "$DIR/common.sh"
admin_command "mute/$1"