---
title: APIs
path: /apis
---

## Sense API

The Sense API is a RESTful JSON API that allows developers to access the majority of the Sense platform’s functionality, such as:

- Creating and managing user accounts within the organization
- Configuring data channels and projects to organize rules and collections of data streams
- Defining landmarks around areas of interest for geographical-based triggers
- Specifying additional data attributes or time constraints for evaluation
- Building rules around these various conditions and the corresponding actions to be executed

Endpoint: https://sense-api.sixgill.com | [Sense API Docs](/apis/sense-api)

#### Authentication

The Sense API authenticates requests with a user-specific JSON web token through Bearer authentication.

To get this token, the user makes a POST [/v2/login](/apis/sense-api/#tag/authenticate/paths/~1v2~1login/post) request with their email and password combination. _These are the same credentials used to log into your account on the dashboard._


## Ingress API

The Ingress API is a key component that allows data ingestion into Sense, enabling devices to connect to the Sense pipeline for event.

- API supports both JSON and Protobuf formatted data
- Allows mobile (iOS, Android) and generic IoT devices to register with the platform
- Mobile devices post sensor data payloads to the Ingress mobile endpoint, sending device location, power and activity state, and readings of nearby beacons and WiFis
- IoT devices post sensor data payloads to the Ingress IoT endpoint

Endpoint: http://sense-ingress-api.sixgill.com | [Ingress API Docs](/apis/ingress)

#### Authentication

To register with the Ingress API, devices POST [/v1/registration](/apis/ingress#tag/Register/paths/~1v1~1registration/post) info and a valid API Key, which can be found in the dashboard under the [Channels](/guides/channels/overview) section for the appropriate channel. On successful authentication, a JSON web token is returned, along with the ID for the organization it's registered with.
