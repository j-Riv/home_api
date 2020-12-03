# HOME API
> A home automation API

Currently it can only control Philips Hue Lights but as necessity grows and time permits I will keep adding to this.

## Dependencies
- Node
- Yarn

## Setup
> .env
```bash
# Philips Hue
HUE_BRIDGE_IP="The IP of the Philips Hue Bridge"
HUE_USERNAME="The Username of the Philips Hue User"
```

## Build
```bash
yarn start
```

## Docker Build Image
```bash
docker build --tag jriv/home_api:latest .
```
