---
title: Landmarks Overview
---

Landmarks are geographical points of interest (POIs) defined by a perimeter. Landmarks can be used as conditions to rules that evaluate a device's proximity to an area. A rule may check if a device has entered, exited, is inside, or outside the landmark. The Landmark API provides some options for defining landmark boundaries using a circle, polygon, or rectangle.

There are 3 ways to add a landmark on Sense:	

## Landmarks tab
1. In the dashboard, go to Projects > Landmarks
2. Click **Add New Landmark**

![](./images/landmark_create_landmark.png)

3. Move the map or use Google Addresses to center the map as needed, or select from Existing Landmarks  
4. Use the Drawing Tools to create a geofence around your desired area  
5. Click **Use Geofence**  

![](./images/landmark_use_geofence.png)

6. Enter a name for the landmark  
7. Click **Create Landmark** to save

The landmark will now be available in the **Select From Project Landmarks** dropdown when creating a rule.

## Add New Rule

When creating a Managed rule, you will have the option to add a **Add Location Condition**

Under **Which location do you want the event to trigger from?** you can select the landmark for this condition

To create a new landmark, click **Add New Landmark**  

a) Move the map or use Google Addresses to center the map as needed, or select from Existing Landmarks  
b) Use the Drawing Tools to create a geofence around your desired area  
c) Click **Use Geofence**  
d) Enter a name for the landmark  
e) Click **Create Landmark** to save  

## The API

See the [Landmarks API Guide](/guides/landmarks/api-guide) for information on creating rules through the Sense API.