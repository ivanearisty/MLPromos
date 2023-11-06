db = db.getSiblingDB('mydatabase');

db.createUser({
  user: 'main-user',
  pwd: 'e4yX8152tnKg',
  roles: [
    {
      role: 'dbOwner',
      db: 'mydatabase',
    },
  ],
});

db.createCollection("tweets", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["date", "text"],
        properties: {
          date: {
            bsonType: "date",
            description: "The date of the tweet."
          },
          text: {
            bsonType: "string",
            description: "The text of the tweet."
          }
        }
      }
    }
  });  

  db.createCollection("modelTweets", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["date", "text"],
        properties: {
          date: {
            bsonType: "date",
            description: "The date of the tweet."
          },
          text: {
            bsonType: "string",
            description: "The text of the tweet."
          }
        }
      }
    }
  });  
