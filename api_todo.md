TODO list of old API to replicate in detail

# User API

## Register user (email left)

POST `api/user/register/` Allow user to register a new account

- Username must be unique
- Create user on database
- Move maps from pending_user_map to user_map
- On success, send registraton email
- returns empty success message

```
username
password
firstName
lastName
address1
address2
postcode
phone
marketing
organisationNumber
organisation
organisationSubType
organisationType
```

Status 200
```
"success"
```

## Get auth token (done)

POST `token/` Allow user to login and retrieve a token

```
username:admin@test.com
password:password
grant_type:password
```

Status 200
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6ImFkbWluQHRlc3QuY29tIiwiY291bmNpbF9pZCI6MCwiaXNfc3VwZXJfdXNlciI6MCwiZW5hYmxlZCI6MSwibWFya2V0aW5nIjoxLCJpYXQiOjE2NDc1MzI2MDMsImV4cCI6MTY3OTA2ODYwM30.hYdLQ9-gJJs5Mtr8-Vgw9TW0DMfrDmp4ClaCUoaNCR4",
    "token_type": "bearer",
    "expires_in": 31536000
}
```

Status 400
```
{
    "error": "invalid_credentials",
    "error_description": "Username and password combination does not match our record."
}
```

## Get user detail (done)

GET `api/user/details/` Return logged in user's details

```
[
    {
        "username": "hello@hansensalim.com",
        "firstName": "Hansen",
        "lastName": "Salim",
        "marketing": 0,
        "organisation": "",
        "organisationNumber": "",
        "organisationType": "",
        "organisationActivity": "",
        "address1": null,
        "address2": null,
        "city": null,
        "postcode": null,
        "phone": "",
        "council_id": 0,
        "is_super_user": 0
    }
]
```


## Change user email (done)

POST `api/user/email/` Allow user to change its email address
 - username
 - returns 200

## Change user detail (done)

POST `api/user/details/` Allow user to change their user details

```
firstName
lastName
address1
address2
postcode
phone
organisationNumber
organisation
organisationActivity
organisationType
```

returns 200

## Change user password (done)

POST `api/user/password/` Allow logged in user to change its password

```
password
passwordConfirm
```

Status 200

## Reset password (done)

POST `api/user/password-reset/` Allow user to request for password reset when they forget their password
If email exist, reset password to random string and email the password over.

```
username
```

# Map API

## Save map

POST `api/user/map/save/` Allow user to create or update a map
 - Eid empty/null means create new map, otherwise it means updating existing map
 - 

```
eid
name
data
```

```
{"eid":"","name":"test map hsn","data":"{\"map\":{\"zoom\":[7],\"lngLat\":[-2.5746523067064,51.486529542481],\"searchMarker\":null,\"marker\":[-0.2416815,51.5285582],\"gettingLocation\":false,\"currentLocation\":null,\"movingMethod\":\"flyTo\",\"name\":\"test map hsn\"},\"drawings\":{\"polygons\":[],\"activePolygon\":null,\"polygonCount\":1,\"lineCount\":1,\"loadingDrawings\":false},\"markers\":{\"searchMarker\":[-0.2416815,51.5285582],\"currentMarker\":null,\"id\":1,\"markers\":[]},\"mapLayers\":{\"activeLayers\":[]},\"version\":\"1.1\",\"name\":\"test map hsn\"}"}
```

Status 200


## Set map as viewed

POST `api/user/map/view/` Record the activity when a user has viewed a map

```
eid
```

Status 200

## Share map

POST `api/user/map/share/sync/` A method to share access of a map to a list of email addresses

This is sync detach operation.
Email address may or may not be a registered land-ex user and need to be handled accordingly.
Email address given may already be recorded in the database (do not resend email invitation).

1. Get all email address from user_map and pending_user_map that has access to map id (exclude current user)
2. Delete rows from user_map and pending_user_map to has its access revoked (their email not on the request payload email list)
3. For map shared to existing user's email, add to user_map with "access = 1"
4. For map shared to unregistered user, add permission to pending_user_map and send invitation email

```
eid
emailAddresses[string]
```

example req
```
{"eid":306,"emailAddresses":["hello2@hansensalim.com","hello3@hansensalim.com"]}
```

Status 200

## Delete map

POST `api/user/map/delete/` Allow user to soft delete a map

User must have write access "access = 2"
Does soft delete "deleted = 1"

```
eid
```

Status 200

## Get user maps

GET `api/user/maps/` Return map data accessible to logged in user

Do not retrieve soft deleted
Retrieve all maps, both owned and shared



```
[
  {
    "map": {
      "createdDate": "2022-03-18T06:18:58",
      "lastModified": "2022-03-18T06:18:58",
      "eid": 306,
      "name": "test map hsn",
      "data": "{\"map\":{\"zoom\":[7],\"lngLat\":[-2.5746523067064,51.486529542481],\"searchMarker\":null,\"marker\":[-0.2416815,51.5285582],\"gettingLocation\":false,\"currentLocation\":null,\"movingMethod\":\"flyTo\",\"name\":\"test map hsn\"},\"drawings\":{\"polygons\":[],\"activePolygon\":null,\"polygonCount\":1,\"lineCount\":1,\"loadingDrawings\":false},\"markers\":{\"searchMarker\":[-0.2416815,51.5285582],\"currentMarker\":null,\"id\":1,\"markers\":[]},\"mapLayers\":{\"activeLayers\":[]},\"version\":\"1.1\",\"name\":\"test map hsn\"}",
      "sharedWith": [
        {
          "emailAddress": "hello2@hansensalim.com",
          "viewed": false
        },
        {
          "emailAddress": "hello3@hansensalim.com",
          "viewed": false
        }
      ]
    },
    "createdDate": "2022-03-18T06:18:58",
    "access": "WRITE",
    "viewed": false
  }
]
```

# Land ownership API

GET `api/ownership/` Return the geojson polygons of land ownership within a given bounding box area 
Note: connect to the new inspire database server, whitelist will be required

```
sw_lng
sw_lat
ne_lng
ne_lat
```

```
[
    {
        "id": 1,
        "poly_id": "19786272",
        "title_no": "AV7150",
        "rec_status": "A",
        "estate_intrst_code": null,
        "class_title_code": null,
        "pend_nt_code": null,
        "uprn": null,
        "geojson": "{\"type\": \"Polygon\", \"coordinates\": [[[-2.5746523067064, 51.486529542481], [-2.5745856248021, 51.486495250861], [-2.5744979252892, 51.486450272031], [-2.5742058499061, 51.486301539773], [-2.5741928152305, 51.486295758937], [-2.5741877967697, 51.486292951098], [-2.5741429434818, 51.486330432583], [-2.574159525248, 51.486339981596], [-2.5744168168972, 51.486471350378], [-2.5745371287471, 51.486532804292], [-2.5746045250943, 51.48656664285], [-2.5746523067064, 51.486529542481]]]}"
    },
    {
        "id": 11227,
        "poly_id": "19786032",
        "title_no": "BL40856",
        "rec_status": "A",
        "estate_intrst_code": null,
        "class_title_code": null,
        "pend_nt_code": null,
        "uprn": null,
        "geojson": "{\"type\": \"Polygon\", \"coordinates\": [[[-2.5745856248021, 51.486495250861], [-2.5746523067064, 51.486529542481], [-2.5747036433958, 51.486488827962], [-2.5746376928877, 51.486455431965], [-2.5745159353141, 51.486393535647], [-2.5742376319123, 51.486251929422], [-2.5742255093101, 51.486261430136], [-2.5741877967697, 51.486292951098], [-2.5741928152305, 51.486295758937], [-2.5742058499061, 51.486301539773], [-2.5744979252892, 51.486450272031], [-2.5745856248021, 51.486495250861]]]}"
    }
]
```

# Land ownership API

## Get council data

POST `api/council/markers/all/` Get council data

```
[
    {
        "id": 8628,
        "name": "Design Centre London",
        "address_1": "Design Centre",
        "address_2": "Chelsea Harbour",
        "address_3": "Kensington",
        "address_4": "London",
        "postcode": "SW10 0XE",
        "ward": "Chelsea Riverside",
        "category_id": 6,
        "sub_category": "Cultural",
        "type": "Arts",
        "community_space": "no",
        "council_facility": "no",
        "notes": "Centre focussed on interior design and holds industry events",
        "web_address": "https://www.dcch.co.uk/about-us/",
        "email": "concierge.desk@dcch.co.uk",
        "telephone": "020 7225 9166",
        "contact_name": "N/A",
        "latitude": "51.476064",
        "longitude": "-0.18295116",
        "space_available": "51.476064",
        "specialist_spaces": "",
        "kitchen": "",
        "disabled_access": "",
        "price_range": "",
        "is_deleted": 0,
        "migration_id": 17
    },
    {
        "id": 8976,
        "name": "KLC School of Design",
        "address_1": "503 Design Centre East",
        "address_2": "Chelsea Harbour",
        "address_3": "Kensington",
        "address_4": "London",
        "postcode": "SW10 0XF",
        "ward": "Chelsea Riverside",
        "category_id": 2,
        "sub_category": "Education and Training",
        "type": "Academy",
        "community_space": "no",
        "council_facility": "no",
        "notes": "Interior Design School",
        "web_address": "https://www.klc.co.uk/about-klc/contact-us/",
        "email": "N/A",
        "telephone": "020 7376 3377",
        "contact_name": "N/A",
        "latitude": "51.476146",
        "longitude": "-0.18241511",
        "space_available": "51.476146",
        "specialist_spaces": "",
        "kitchen": "",
        "disabled_access": "",
        "price_range": "",
        "is_deleted": 0,
        "migration_id": 17
    },
]
```

## CSV upload

POST `api/council/upload/replace/` CSV Uploads

## Update council data 

POST `api/council/markers/update/` Update council data 

```
id
name
address_1
address_2
address_3
address_4
postcode
ward
category_id
sub_category
type
community_space
council_facility
notes
web_address
email
telephone
contact_name
space_available
specialist_spaces
kitchen
disabled_access
price_range
```

Status 200 `"Council data updated."`

## Delete council data 

POST `api/council/markers/delete/` Delete council data

```
id
```

Status 200 `"Council data deleted."`