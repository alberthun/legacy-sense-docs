---
title: Rules API Guide
date: "2015-05-01T22:12:03.284Z"
description: "Building Rules with the Sense API"
---

A rule defines the set of automated actions that are performed when one or more conditions for sensor data are met. Sensor data can come from mobile or IoT devices. Rules can be used to send an SMS, push, email, or webhook when an event occurs and can be run at certain times of the day. 

_Note: Be sure the project being used is tied to the appropriate data channels to be processed in the rule_

Example:
```json
{
  "projectId": "01CRDS7BVRPPDGC6FEE5EXDRP0",
  "name": "Entering Santa Monica Pier",
  "type": "cloud",
  "description": "",
  "actions": [{
    "type": "email",
    "message": "Welcome to the Pier",
    "subject": "Enjoy your stay!",
    "recipients": {
      "emails": ["test@test.com"]
    }
  }],
  "conditions": "event.channelId == '01CRDS6EJC9SHVADJWCVXB0V45' && enterLandmark(('01CRPPFG5Q4F58HGM8D5H37ED3'), event.location.position)",
  "conditionsObject": [{
    "type": "and",
    "items": [{
      "type": "schedule"
    }, {
      "type": "and",
      "items": [{
        "ids": ["01CRPPFG5Q4F58HGM8D5H37ED3"],
        "type": "landmark",
        "trigger": "enter",
        "attribute": "event.location.position",
        "channelId": "01CRDS6EJC9SHVADJWCVXB0V45"
      }]
    }]
  }],
  "generator": "custom",
  "enabled": true
}
```
Fields:
* projectId - ID of the project this rule is associated with
* name - (required) Name of the rule
* type - cloud or edge
* description - (optional) Description of rule
* actions - Describes what will occur when the condition is satisfied. See [Actions](#actions) for more details.
* conditions - the free-form expression to be evaluated for this rule. It may include Javascript in the expression. This is automatically translated from the more structured **conditionsObject**, and is optional as long as a valid conditionsObject exists. See [Conditions](#conditions) for more details.
* conditionsObject - Describes the conditions that must be met in order to execute the action(s). A condition can be composed of one or more items joined with boolean operator types. See [Conditions](#conditions) for more details.
* generator - How the rule was generated
* enabled - The state of the rule. If true, the rule is actively running; if false, it is disabled.

## Actions

Rules trigger one or more actions when an event occurs. Available actions include sending an SMS, a push notification to a device, sending an email, or invoking a webhook. 

### push
  Sends a push notification to the triggering mobile device. *Requires a mobile app using the Reach SDK.*

  Fields:
  * type - "push"
  * subject - (string) the subject content of the push message
  * message - (string) the body of the push message. [Templates](http://docs.sixgill.com/templates.html) can be used which will be replaced dynamically when the rule is triggered

  Example:
  ```json
  "actions": [{
          "type": "push",
          "subject": "Welcome to the gym!",
          "message": "Have a great workout"
  }]
  ```

### email
  Sends an email to one or more recipients when the rule is triggered.

  Fields:
  * type - "email"
  * subject - (string) the subject content of the email
  * message - (string) the body of the email. [Templates](http://docs.sixgill.com/templates.html) can be used which will be replaced dynamically when the rule is triggered
  * recipients - an object specifying an array of email addresses to send to when the rule is triggered

  Example:
  ```json
  "actions":[{
    	"type": "email",
    	"subject": "entering gym",
    	"message": "have a great workout",
    	"recipients": {
    		"emails": ["test@test.com"]
  	}
  }]
  ```

### webhook 
  Invokes a webhook to a web service. This is typically used to send HTTP requests to external systems when a rule is triggered.

  Fields:

  * type - "webhook"
  * method - (required) POST, PUT, PATCH, DELETE
  * headers - (optional) An object specifying the request headers. See example below.
  * url - (required) the URL of the request. [Templates](http://docs.sixgill.com/templates.html) can be used which will be replaced dynamically when the rule is triggered
  * body - (optional) the request payload. [Templates](http://docs.sixgill.com/templates.html) can be used which will be replaced dynamically when the rule is triggered
  * username - (optional) username for authorization
  * password - (optional) password for authorization

  > The following example sends a POST request to https://sixgill.com with a simple JSON payload. 

  Example:
  ```json
  "actions":[{ 
           "type":"webhook",
           "method":"POST",
           "headers":{ 
              "header":"Content-Type",
              "value":"text/json"
           },
           "url":"https://sixgill.com",
           "body":"{\"test\": \"test\"}",
           "username":"username",
           "password":"password"
  }]
  ```

### SMS
Sends an SMS to the specified recipient telephone numbers.

Fields:
* type - "sms"
* message - (string) the content of the SMS message
 * recipients - an object specifying an array of telephone phone numbers to send to when the rule is triggered

Example:
```json
"actions": [{
	"type": "sms",
	"message": "test",
	"recipients": {
		"telephoneNumbers": ["5551234567"]
	}
}]
```   

## Conditions
Conditions for the rule are specified either using the advanced, free-form style, or using a more simple, structured format of the **conditionsObject**. Rules created with conditionsObjects will automatically be translated into their free-form condition. Conditions are composed of one or more items joined with boolean operators to form a logical expression that can be evaluated.

### Operators

#### "and"

Description:
	This is a boolean operator for the conditionsObject that allows you to combine conditions with "AND" semantics. All items combined with "AND" must evaluate to true for the condition to be met.
	
> The following example checks if the device is inside a landmark AND traveling at a specific velocity

Example:
```json
 {
	  "type": "and",
	  "items": [
	    {
	      "ids": [
	        "01CRBK63PB7DR1419M76VR6KC9"
	      ],
        "type": "landmark",
        "trigger": "enter",
	      "attribute": "event.location.position",
	      "channelId": "01CRBG7HVM0KW8PEX1HK7VZSZR"
	    },
	    {
	      "type": "matchAttribute",
	      "value": "something",
	      "operator": "==",
	      "attribute": "event.location.velocity",
	      "channelId": "01CRBG7HVM0KW8PEX1HK7VZSZR"
	    }
      ]
}
```

#### "or"

Description:
	This is a boolean operator that allows you to combine conditions with "OR" semantics. Either predicate must evaluate to true for the condition to be met.

> The following condition checks whether the device is inside one landmark or the other.

Example:
```json
{
  "type": "or",
  "items": [{
    "ids": ["01CRF31GB0JTX2392AJMTHDME0"],
    "type": "insideLandmark",
    "attribute": "event.location.position",
    "channelId": "01CRDS6EJC9SHVADJWCVXB0V45"
  }, {
    "ids": ["01CRPPFG5Q4F58HGM8D5H37ED3"],
    "type": "landmark",
    "trigger": "enter",
    "attribute": "event.location.position",
    "channelId": "01CRDS6EJC9SHVADJWCVXB0V45"
  }]
}
```

### Landmark Conditions

The conditionsObject accepts specific landmark condition types to define geofence triggers. In these examples, the value of the **event.location.position** attribute is compared against the landmark boundary to determine the device's proximity to the landmark.

Fields:
* id -  ID of the landmark to compare the device's position against
* type - "landmark" 
* trigger - One of the following:
  * enter - Evaluate whether or not a device event entered a landmark that it was previously outside of.
  * exit - Evaluate whether or not a device has exited a landmark that it was previously inside of.
  * inside - Evaluate whether or not a device is inside of a given landmark.
  * outside - Evaluate whether or not a device event is outside of a given landmark. 
* attribute - the attribute in the device payload that will be used for evaluation
* channelId - ID of the channel to be used as the data source for this condition

> The following example checks if the device was previously outside the landmark and is now inside it.

Example:
```json
{
  "ids": ["01CRPPFG5Q4F58HGM8D5H37ED3"],
  "type": "landmark",
  "trigger": "enter",
  "attribute": "event.location.position",
  "channelId": "01CRDS6EJC9SHVADJWCVXB0V45"
}
```

   
### Scheduling
Schedules are optional date/time parameters that define when the rule is valid. By default, the rule will be enabled within 5 mminutes of activation and will run indefinitely until it is disabled.

Schedules parameters be defined in the **conditionsObject** as an item joined to other conditions with an "and" clause. The following conditionsObject describes an insideLandmark rule that only applies from September 26, 2018 to October, 6, 2018, from 9am to 5pm Monday to Fridays, in the New York timezone. Timezone is specified under the rule's "properties" object. 


* date - to and from dates when the rule is valid, in milliseconds
* weekdays - days when the rule is valid (0 = sunday, 1 = monday, etc)
* timeOfDay - to and from hours of the day when the rule is valid, in seconds from midnight

Example:
```json
"conditionsObject": [{
    "type": "and",
    "items": [{
      "type": "schedule",
      "date": {
        "from": 1537977600000,
        "to": 1538841600000
      },
      "weekDays": [1, 2, 3, 4, 5],
      "timeOfDay": {
        "from": 32400,
        "to": 61200
      }
    }, {
      "type": "and",
      "items": [{
        "attribute": "event.location.position",
        "channelId": "01CRDS6EJC9SHVADJWCVXB0V45",
        "type": "landmark",
        "trigger": "enter",
        "ids": ["01CRF31GB0JTX2392AJMTHDME0"]
      }]
    }]
  }]
```

Schedule parameters can also be defined using an advanced Javascript condition **conditions**.

Examples:
- toDate(isostring) - convert isostring to date
- now(timezone) - return the current date in given timezone
- minutesOfDay(timezone) - returns minutes of the day in given timezone
- dayOfWeek(timezone) - returns day of the week (sunday-saturday : 0 - 6) in given timezone

See the [Advanced Rules](/guides/rules/advanced-rules) guide for more information.