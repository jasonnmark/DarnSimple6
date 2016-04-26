// On Client and Server
Players = new Mongo.Collection('players'),
  PlayersIndex = new EasySearch.Index({
    collection: Players,
    fields: ['name'],
    engine: new EasySearch.Minimongo()
  });