#!/bin/bash

# use set -e to terminate the script on error
set -e

source .server

aws s3 cp dist.zip s3://$BUCKET/code/lambdalist.zip

# using -e let's us use escape characters such as \n if the output is in quotation marks
echo -e '\n\n\nlambdalist.zip uploaded to the bucket. Updating lambda functions...\n'

# Updating the s3 code doesn't update the lambdas, which make a copy of the s3 code.
# The lambdas have to reload their code source to get the updated s3 code.
i=1
PID=0
pids=()
for lambda in $EDIT_LAMBDALIST
do
    aws lambda update-function-code \
        --function-name  $lambda \
        --s3-bucket $BUCKET \
        --s3-key code/lambdalist.zip \
        1>>/dev/null \
        &
        # The & runs this command in the background so we can update all lambdas simultaneously 
        # redirecting standard output to /dev/null just means that it doesn't get saved anywhere
        # standard error should still show up in the terminal as it is represented by the number 2 instead of 1
    echo lambda $i, $lambda, uploading from s3
    pids[${i-1}]=$!
    ((i=i+1))
done

# Wait for each process to finish
for pid in ${pids[*]}; do
    wait $pid
done

echo -e '\nLambda functions updated.'