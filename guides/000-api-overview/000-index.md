---
title: APIs
path: /apis/overview
---

## Sense API

The Sense API is a RESTful JSON API that allows developers to access the majority of the Sense platform’s functionality, such as:

- Creating and managing user accounts within the organization 
- Configuring data channels and projects to organize rules and collections of data streams
- Defining landmarks around areas of interest for geographical-based triggers
- Specifying additional data attributes or time constraints for evaluation
- Building rules around these various conditions and the corresponding actions to be executed

Endpoint: https://sense-api.sixgill.com


#### Authentication

The Sense API authenticates requests with a user-specific JSON web token through Bearer authentication.

To get this token, the user makes a POST [/v2/login](/apis/sense-api#/Authenticate/post_v2_login) request with their email and password combination.

Once a token has been generated, it can be used as the token for many requests. Note that certain calls require a token that includes the organization ID, such as creating a rule. To get this new token, use GET [/v2/organizations](/apis/sense-api#/Organizations/get_v2_organizations) to get the organization ID, then POST [/v2/login](/apis/sense-api#/Authenticate/post_v2_login) by passing in the organizationId along with the email and password.


## Ingress API

The Ingress API is a key component that allows data ingestion into Sense, enabling devices to connect to the Sense pipeline for event.

- API supports both JSON and Protobuf formatted data
- Allows mobile (iOS, Android) and generic IoT devices to register with the platform
- Mobile devices post sensor data payloads to the Ingress mobile endpoint, sending device location, power and activity state, and readings of nearby beacons and WiFis
- IoT devices post sensor data payloads to the Ingress IoT endpoint

Endpoint: http://sense-ingress-api.sixgill.com

#### Authentication

To register with the Ingress API, devices POST [/v1/registration](/apis/ingress#/Register/post_v1_registration) info and a valid API Key, which can be found in the dashboard under the [Channels](/guides/channels/overview) section for the appropriate channel. On successful authentication, a JSON web token is returned, along with the ID for the organization it's registered with.