#!/bin/bash
docker stop $(docker ps -q --filter ancestor=tpportugal/tpp_expedidor)