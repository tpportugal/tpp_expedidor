#!/bin/bash

usage() {
	echo "Usage: $0 [-d detached] [-e <development|staging|production>]"
}

docker_run="docker run -v ${PWD}/dist:/data/dist -p 8003:4200 tpportugal/tpp_expedidor:latest"

while getopts ":de:" opt; do
	case $opt in
		d)
			docker_run="docker run -v ${PWD}/dist:/data/dist -d -p 8003:4200 tpportugal/tpp_expedidor:latest"
			;;
		e)
			environment=${OPTARG}
			container_command=""
			case $environment in
				development)
					container_command=" ember serve"
					;;
				staging)
                    container_command=" ember build --output-path /data/dist --environment=staging"
					;;
				production)
                    container_command=" ember build --output-path /data/dist --environment=production"
					;;
				*)
					echo "Error: The environment '$environment' is not defined!" >&2
					break
					;;
			esac
			eval $docker_run "$container_command"
			exit 0
			;;
		\?)
			echo "Invalid option: -$OPTARG" >&2
			break
			;;
		:)
			echo "Option -$OPTARG requires an argument." >&2
			break
			;;
		*)
			usage
			;;
	esac
done

usage
