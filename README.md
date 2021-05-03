# MVP Twitter

MVP Twitter is a Graphql and Node coding challenge for [Point.app](https://www.point.app/)

## Installation

#### Run with [Docker](https://www.docker.com/)

##### Start
```bash
docker-compose up
```

##### Stop
```bash
docker-compose down
```

## Docs

Docs are a [Postman](https://www.postman.com/) collection and located in [`/postman`](https://github.com/n0tAD0ct0r/point_challenge/tree/main/postman).

The API consists of 

#### REST
* `POST /login` 
* `POST /signup` 

#### Graphql
Queries 
* `getTweet`
* `getTweets`

Mutations
* `createTweet`
* `editTweet`
* `deleteTweet`

## Trade offs

#### Auth
I separated the auth routes from the `graphql` endpoints. 

Pros: 
* one middleware locks down the `authentication` to the entire graph, reducing adding `authentication` checks on every query or mutation.
* easy to move from the current implementation to a microservice or auth provider like Auth0 in the future

Cons: 
* The entire graph is private. This isn't a problem for the current implementation but if the goal was to create a complete twitter clone you would want users to be able to see tweets without being logged in.

#### Graphql
Pros:
* clients can fetch the exact data that they need versus everything returned to the api

#### Database (mongodb)
For the basic requirements of this challenge mongodb worked fine but SQL would be a better fit with other features like following other users or comments/threads.


## License
[MIT](https://choosealicense.com/licenses/mit/)
