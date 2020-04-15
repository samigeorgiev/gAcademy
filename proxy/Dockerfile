FROM envoyproxy/envoy:v1.14.1

COPY ./envoy.yaml /etc/envoy/envoy.yaml

EXPOSE 9901
EXPOSE 8000
EXPOSE 8001
EXPOSE 8002

CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml
