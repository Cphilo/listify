#!/bin/bash

NAME=listify
rm $NAME.zip
zip -r $NAME.zip -x tags package.sh *.git* -- .
