import mongoose from "mongoose";
import redis from "redis";
import util from "util";

// redis init
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);

// enable promise support for client.get redis function
client.get = util.promisify(client.get);

// save a reference to mongoose exec function
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function () {
  // make cache toggleable
  this._cache = true;

  // make cache chainable
  return this;
};

mongoose.Query.prototype.exec = async function () {
  // if cache is not enabled just return original exec
  if (!this._cache) {
    return exec.apply(this, arguments);
  }

  //create redis key
  // turn key into jaso cuz redis can not save objects
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  // check if key exists in redis memory
  const cacheValue = await client.get(key);

  if (cacheValue) {
    console.log("CACHE");

    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  // return original version of exec
  // use apply to apply arguments passed to exec
  const result = await exec.apply(this, arguments);
  console.log("normal exec return");

  client.set(key, JSON.stringify(result));

  return result;
};

// $ redis-cli
// > config set stop-writes-on-bgsave-error no

//console.log(this.getQuery()); //-> get the query object
// -> get the mongoose Collection name related to the query
//console.log(this.mongooseCollection.name);

// turn the Object returned from redis into the mongoose model instance
// which corresponds to the original query
//const doc = new this.model(JSON.parse(cacheValue));
// same ass ..
// new User({ id_: ..... })
