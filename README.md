## Express

Express is a minimal NodeJS framework, a higher level of abstraction.
Express contains a very robust set of features: complex routing, easier handling of requests and responses, middleware, server-side rendering, etc.
Express allows for rapid development of NodeJS applications: we don't have to reinvent the wheel.
Express make it easier to organize our application into MVC architecture.

## API

![alt text](/dev-data/readme-img/image.png)

Rest Architecture:
![alt text](/dev-data/readme-img/image-1.png)
Put - Need to pass whole object to be updated
Patch - Can pass just updated part of the object to be updated

## JSON

Each key_name should be a string, but key_value can be any data type like string, number, boolean, array or any other object.
Enveloping while sending it into response:
{
"status": "success",
"statusCode": 200,
"data": data_object
}

Stateless RESTful API:
All state should be handled on the client. Each request must contain all the information necessary to process a certain request. The server should not have to remember the previous requests.

## Status codes

200 - OK
201 - Created
404 - Resource not found
500 - Server error
204 - Content not

## Responding to url parameters

app.get('/api/v1/tours/:id/:x/:y?', (req, res) => {
res.status(200).json({
status: 'success',
});
});
where ? is used to make the parameter y optional
