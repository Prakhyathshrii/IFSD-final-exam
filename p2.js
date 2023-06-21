const { MongoClient } = require("mongodb");

class Partya {
  constructor(politician, maxVote, maxMoney) {
    this.politician = politician;
    this.maxVote = maxVote;
    this.maxMoney = maxMoney;
  }

  async main() {
    const uri = "mongodb+srv://prakhyath2004:paki20@cluster0.7vndani.mongodb.net/";
    const client = new MongoClient(uri);

    try {
      await client.connect();

      const database = client.db("mydatabase");
      const collection = database.collection("partya");

      // CREATE operation
      const partyaData = {
        politician: this.politician,
        maxVote: this.maxVote,
        maxMoney: this.maxMoney
      };

      const insertResult = await collection.insertOne(partyaData);
      console.log("New Partya data created:", insertResult.insertedId);

      // READ operation
      const findResult = await collection.findOne({});
      console.log("Found Partya data:", findResult);

      // UPDATE operation
      const filter = {};
      const update = {
        $set: {
          politician: this.politician,
          maxVote: this.maxVote,
          maxMoney: this.maxMoney
        }
      };
      const updateResult = await collection.updateOne(filter, update);
      console.log("Partya data updated:", updateResult.modifiedCount);

      // READ operation after update
      const findResultAfterUpdate = await collection.findOne({});
      console.log("Found Partya data after update:", findResultAfterUpdate);

      // DELETE operation
     // const deleteResult = await collection.deleteOne({});
      //console.log("Partya data deleted:", deleteResult.deletedCount);

      // READ operation after delete
      const findResultAfterDelete = await collection.findOne({});
      console.log("Found Partya data after delete:", findResultAfterDelete);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await client.close();
    }
  }
}

const myPartya = new Partya("John Doe", 5000, 1000000);
myPartya.main().catch(console.error);
