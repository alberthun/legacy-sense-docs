---
title: Landmarks API Guide
---

Landmarks, or geofences, are geographical points of interest (POIs) defined by a perimeter. Landmarks are often used as a condition of a rule to evaluate a device's proximity to an area. A rule may check if a device has entered, exited, is inside, or outside the landmark. See [Landmark Conditions](/guides/rules/api-guide#landmark-conditions) in the Rules API guide for more information on using landmarks in rules.

*Please double-check your coordinates when creating landmarks via the API. It may be helpful to check the dashboard and verify that they are created in the desired location.*

Example:
```json
{
	"shape": {
		"type": "circle",
		"radius": 431.24315046869395,
		"coordinates": [-118.4968901261501, 34.009050781957086]
	},
	"name": "Santa Monica circle",
	"address": null,
	"projectId": "01CW6N0PAGB2RX3PSRWSM9FDHX"
}
```
Fields:
* shape - (required) A geoshape that defines the bounding area of the landmark. See [Shapes](#shapes) for more information
* name - (required) Name of the landmark
* address - (optional) Address of landmark
* projectId - ID of the project this landmark belongs to

 
 
## Shapes

A model that describes the geometric shape and geographic location surrounding the perimeter of the landmark.

_Please note: This model follows the [Elasticsearch definition of geoshape](https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-shape.html). In GeoJSON and WKT, and therefore Elasticsearch, the correct coordinate order is longitude, latitude (X, Y) within coordinate arrays. This differs from many Geospatial APIs (e.g., Google Maps) that generally use the colloquial latitude, longitude (Y, X)._

### circle

Description: A circle specified by a center point and radius with units in **meters**.

Fields:
* type - "circle"
* radius - distance from the center of the circle to the perimeter
* coordinates - the geographical points (longitude, latitude) specifying the center of the circle

> The following example defines a circle around the Santa Monica Pier.

Example:
```json
{
	"type": "circle",
	"radius": 347.8844954300416,
	"coordinates": [-118.49735821940999, 34.00862590188913]
}
```

### envelope

Description: A landmark defined by a bounding rectangle, or envelope, specified by only the top left and bottom right points.

Fields:
* type - "envelope"
* coordinates - the geographical points (longitude, latitude) specifying the top left (northwestern) and the bottom right (southeastern) corner of the bounding rectangle
	
> The following example defines a rectangle around the Santa Monica Pier using the northwestern and southeasten coordinates of the area.
	
Example:
```json
{
	"type": "envelope",
	"coordinates": [
		[-118.49373430430006, 34.00731755046173],
		[-118.5007295054109, 34.01112402948093]
	]
}
```

### polygon

Description: A closed polygon whose first and last point must match, thus requiring n + 1 vertices to create an n-sided polygon and a minimum of 4 vertices.


Fields:
* type - "polygon"
* coordinates - the geographical points (longitude, latitude) specifying the vertices of the polygon

> The following example defines a polygon around the specified area of the Santa Monica Pier.

Example:
```json
{
	"type": "polygon",
	"coordinates": [
		[
			[-118.50088165976331, 34.00744764114932],
			[-118.49822090842054, 34.00929753728191],
			[-118.50010918356702, 34.01064935897037],
			[-118.49787758566663, 34.01178771843661],
			[-118.49830673910901, 34.01363752001817],
			[-118.49581764914319, 34.013139500480044],
			[-118.49444435812757, 34.01022247023586],
			[-118.49770592428968, 34.007376490493286],
			[-118.49856423117444, 34.00773224317736],
			[-118.49985169150159, 34.00687843423184]
		]
	]
}
```
