FROM ubuntu:latest
LABEL authors="houda"

ENTRYPOINT ["top", "-b"]