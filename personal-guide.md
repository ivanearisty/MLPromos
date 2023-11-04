# Backend
## Setup
Basic Setup with Fast API, just needs a run on the local machine at the moment.
Click run python and then it will run on localhost.
The initial screen is not configured to anything so if you just go there it wont tell you anything special you have to do something like:
- http://localhost:8000/test
- http://localhost:8000/docs (this is to see the fastapi visualization of all the methods)

## Websocket
To access websocket: ws://localhost:8000/websocket
- ws specifies it is a websocket
- localhost is the ip
- 8000 is the port
- websocket is just the name of the api endpoint

For the websocket to work you need MongoDB to be running

## MongoDB
We use docker to set up mongoDB and mongo-express, a light visualizer for the app

- The setup for mongodb is in mongo-init.js
- We setup mongo in docker-compose 
- The image attribute tells docker-compose which image to use.

Connection: mongodb://admin:e4yX8152tnKg@localhost:27017/
- mongodb://: This is the scheme or protocol of the URI, indicating that it's a connection string for MongoDB.
- admin: This is the username used to authenticate to the MongoDB server. In this case, the username is "admin."
- e4yX8152tnKg: This is the password associated with the username "admin." It's used for authentication. Note that this is a placeholder; in a real-world scenario, you should use a strong and secure password.
- @: The "@" symbol separates the username and password from the rest of the connection string.
- localhost: This is the hostname or IP address of the MongoDB server.
- :27017: This is the port number on which the MongoDB server is listening for incoming connections. By default, MongoDB uses port 27017 for client connections.
- /: The forward slash ("/") represents the database name or the path to the specific database you want to connect to. In this case, it appears as though you want to connect to the default database.

## Connecting python to mongodb

Similar to above, [parameters.py](backend/src/modules/parameters.py) holds the info for the user and access to the database:

- mongodb_user = "main-user"
- mongodb_password = "e4yX8152tnKg"
- mongodb_host = "localhost"
- mongodb_port = 27017
- mongodb_database = "mydatabase"

We create this user in mongo-init.js:

```javascript
db = db.getSiblingDB('mydatabase'); 
##This is making the database ommitted in general connection

db.createUser({ ##creates the user that is going to access the database above
  user: 'main-user',
  pwd: 'e4yX8152tnKg',
  roles: [
    {
      role: 'dbOwner',
      db: 'mydatabase',
    },
  ],
});
```


Finally, [database.py](backend/src/database/database.py) created db as a AgnosticDatabase instance with the information from parameters.



## To Reset Docker:
- docker-compose rm -f
- docker-compose pull
- docker-compose up --build -d

# Frontend

## Basics

Module Definition: A module is a place where you can group the components, directives, pipes, and services, which are related to the application. The root `NgModule` for an application is so named because it can include child NgModules in a hierarchy of any depth.

The following is a breakdown of that main module and it's files:

1. `app.routing.module.ts`:
   - Responsible for setting up the routing configuration. Defines the routes and their associated components. Angular's Router module uses this file to navigate between different views or components in your application.

2. `app.component.html`:
   - This file contains the HTML template for the root component. It defines the structure of the component's view and how it should be rendered in the browser.

3. `app.component.sass` (or `app.component.scss`):
   - This is a style sheet for the root component of the app.

4. `app.component.spec.ts`:
   - This file is a unit test specification file for the root component.

5. `app.component.ts`:
   - This TypeScript file is the component class file. It contains the logic and data for the root component. It defines the behavior of the component and interacts with the template (defined in `app.component.html`) and styles (defined in `app.component.sass`).

6. `app.module.ts`:
   - This file is the main module file. It contains all components, directives, pipe, services related to that module. It defines the application's main module, which serves as the entry point for the application. It typically imports and declares all the components, services, and modules used in the application and configures them.


## Components

Components usually have 4 files:
- ts file which is the main class with any properties and methods
- html file which is just a template
- ccs file for styling
- spec file for testing

Basic components will have a declaration
```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
```

Selector is whatever the HTML tag that we will use to embedd the component. For example, the root component gets indexed in `index.html` 

```html
<body>
  <app-root></app-root>
</body>
```

All components we create in a simple app will be embedded to app.component.html
Template is then the html and style is the css file.

**2 Files:** Sometimes, we can find components without all 4 files by embedding the html or/and css files into the ts file.

**Export Class:** contains any properties of the components and custom methods

## How Tweet and Tweet List were set up:

### Tweet Interface in Tweet
Tweet is a component that defines how tweets will look.

It includes the `Tweet` interface. In Angular, an interface is a way to define the structure of an object. In this case, Tweet is an interface with two properties: text (a string) and date (a Date object). This interface helps to enforce a specific structure when dealing with tweet data.

In code it simply looks like this:

```typescript
export interface Tweet {
  text: string;
  date: Date;
}
```

The interface is exported so that it can be used in other parts of the app or potentially in other external modules. 

### Receiving input data
`@Input() myInputData: string` or `@Input() tweet!: Tweet;` is a class property that is marked with the @Input decorator. 

```typescript
export class TweetItemComponent {
  @Input() tweet!: Tweet;
}
```

It's marked with the `@Input` decorator, allowing data to be passed into the component from its parent component. In this case, it's expecting an object of type Tweet, which follows the structure defined by the Tweet interface. The `!` operator indicates that `tweet` will be initialized by Angular and doesn't need to be explicitly assigned in the constructor.

## Tweet List imports explanation

```typescript
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from '../tweet/tweet.component';
```

- `import { DatePipe } from '@angular/common';`: imports `DatePipe` from the `@angular/common` module, which allows us to format date objects in **templates**.

- `import { Component, Input, OnInit } from '@angular/core';`: imports the `Component`, `Input`, and `OnInit` decorators from the `@angular/core` module. These decorators are used for defining an Angular component and indicating that it implements the `OnInit` lifecycle hook.

- `import { Tweet } from '../tweet/tweet.component';`: imports the `Tweet` interface from the `'../tweet/tweet.component'` file. It means that this component uses the `Tweet` data structure that's defined in the `tweet.component.ts` file. We could have defined it here and just imported it in the other ts file too.

## Styling Tweet List

In the embedded template html file, we see `app-tweet-item` called in an ngFor loop which is just a simple for loop to iterate through tweet items:

```html
template: `
    <div class="tweet-list">
      <app-tweet-item
        *ngFor="let tweet of tweets"
        [tweet]="tweet"
      ></app-tweet-item>
    </div>
  `
  ```

Since the `<div>` tag defines a division or a section in an HTML document, we can use `class=` to assign a CSS class to the div element. This allows us to target this specific div with CSS styles defined elsewhere in your component.

That elsewhere is just below in `styles`:

```scss
styles: [`
    .tweet-list {
      border: 1px solid #ccc;
      padding: 10px;
    }
  `]
  ```

### Providers in Tweet List`

In `providers: [DatePipe]` we are providing the DatePipe as a service for this component. The DatePipe is used for date formatting in the template.

Angular provides these pipes globally, and they are readily available for use in templates without any extra configuration.

Therefore, it's removed from the code, but it was there.

## Basic Example of Websockets passing data

When receiving data updates, you typically have a parent component that manages the connection and receives data. The parent component can then pass this data to child components through input properties.

Here's a common scenario:

1. **Parent Component (WebSocket Manager)**: This component would handle WebSocket connections, subscribe to real-time data updates, and manage the incoming data.

2. **Child Components (e.g., `TweetItemComponent`)**: These components would be responsible for displaying the real-time data received from the WebSocket. The parent component would pass the WebSocket data to each child component using `@Input()` properties.

Here's a simplified example of how this might work:

Parent Component:

```typescript
import { Component } from "@angular/core";
import { WebSocketService } from "./web-socket.service"; // Import your WebSocket service

@Component({
  selector: 'app-parent',
  template: `
    <div *ngFor="let tweet of tweets">
      <app-tweet-item [tweet]="tweet"></app-tweet-item>
    </div>
  `
})
export class ParentComponent {
  tweets: Tweet[] = [];

  constructor(private webSocketService: WebSocketService) {
    // Subscribe to WebSocket updates and update 'tweets' when new data arrives.
    this.webSocketService.onMessage().subscribe((data: Tweet) => {
      this.tweets.push(data);
    });
  }
}
```

In this example, the `ParentComponent` subscribes to WebSocket updates and pushes new tweets into the `tweets` array. It then passes these tweets to child components by binding to the `tweet` input property.

Child Component (`TweetItemComponent`):

```typescript
import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-tweet-item',
  template: `
    <div class="tweet-item">
      <div class="tweet-content">{{ tweet.text }}</div>
      <div class="tweet-date">{{ tweet.date | date:'short' }}</div>
    </div>
  `,
  styles: [/* Styles here */]
})
export class TweetItemComponent {
  @Input() tweet!: Tweet;
}
```

In the `TweetItemComponent`, it receives the tweet data via the `@Input()` property and uses it to display individual tweet items.

This way, the WebSocket-connected parent component manages the real-time data updates and distributes the data to child components for rendering. The use of `@Input()` properties ensures that the child components always display the most up-to-date data received from the WebSocket.