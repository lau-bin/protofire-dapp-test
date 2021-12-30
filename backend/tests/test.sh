#!/bin/bash

set -o allexport && \
source tests/test.env && \
set +o allexport && \

if [ "$1" = 'int' ]; then
  jest int 
else
  jest unit
fi




 

