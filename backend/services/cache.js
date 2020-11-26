import mongoose from "mongoose";
import redis from "redis";
import util from "util";

// redis init
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);

// enable promise support for client.get redis function
client.hget = util.promisify(client.hget);

// save a reference to mongoose exec function
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  // make cache toggleable
  this._cache = true;
  this._hashkey = JSON.stringify(options.key || "");

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
  const cacheValue = await client.hget(this._hashkey, key);

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

  client.hset(this._hashkey, key, JSON.stringify(result), "EX", 10);

  return result;
};

const clearCache = async (h) => {
  await client.del(JSON.stringify(h));
};

export default clearCache;

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
