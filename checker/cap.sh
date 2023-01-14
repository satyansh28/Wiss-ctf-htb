#!/bin/bash

# This script scans bash files for potential risks like reverse shell or bind shell.
# To use,run it with two flags, -f with the path to shell script and -c with path to config file.


config_file='';
verbose='false';
while getopts ":c:f:" flag
do
    case "$flag" in
        c) config_file=${OPTARG};;
        f) file_to_scan=${OPTARG};;
        *) ;;
    esac
done
if [ -z "$config_file" ]
then
    /bin/echo "Running with default config.."
else
    config=$(<"$config_file")
    for line in $config; do
        
        option=$(/bin/echo "$line" | cut -d "=" -f 1)
        value=$(/bin/echo "$line" | cut -d "=" -f 2)
        if [[ "$option" == "verbose" ]] && [[ "$value" == "true" ]]; then
            verbose='true'
        else
            /bin/echo "$option is not a valid option!"
            exit 0
        fi
    done
fi
text_to_scan=$(<"$file_to_scan");
if [[ "$text_to_scan" =~ [/nc/] ]]; then
    /bin/echo "Potential security risk detected!"
    exit
elif [[ "$verbose" == 'true' ]]; then
    /bin/echo "nc not detected!"
fi
if [[ "$text_to_scan" =~ [/ncat/] ]]; then
    /bin/echo "Potential security risk detected!"
    exit
elif [[ "$verbose" == 'true' ]]; then
    /bin/echo "ncat not detected!"
fi
if [[ "$text_to_scan" =~ [/netcat/] ]]; then
    /bin/echo "Potential security risk detected!"
    exit
elif [[ "$verbose" == 'true' ]]; then
    /bin/echo "netcat not detected!"
fi

/bin/echo "Script looks fine!";

