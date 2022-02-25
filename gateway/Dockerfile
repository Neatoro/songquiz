FROM oryd/oathkeeper:v0.38.23-beta.1

WORKDIR /proxy

COPY oathkeeper.yaml /proxy/config.yaml
COPY rules.json /proxy/rules.json

CMD [ "serve", "-c", "/proxy/config.yaml" ]
