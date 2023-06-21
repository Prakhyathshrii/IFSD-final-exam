const mongoose = require('mongoose');

// Define Partya schema
const partyaSchema = new mongoose.Schema({
  politician: {
    type: String,
    required: true
  },
  maxVote: {
    type: Number,
    required: true
  },
  maxMoney: {
    type: Number,
    required: true
  }
});

// Create Partya model
const Partya = mongoose.model('Partya', partyaSchema);

class PartyaClass {
  constructor(politician, maxVote, maxMoney) {
    this.politician = politician;
    this.maxVote = maxVote;
    this.maxMoney = maxMoney;
  }

  async main() {
    try {
      await mongoose.connect("mongodb+srv://prakhyath2004:paki20@cluster0.7vndani.mongodb.net/;", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected to MongoDB');

      // CREATE operation
      const partya = new Partya({
        politician: this.politician,
        maxVote: this.maxVote,
        maxMoney: this.maxMoney
      });

      const createdPartya = await partya.save();
      console.log('New Partya data created:', createdPartya);

      // READ operation
      const foundPartya = await Partya.findOne({});
      console.log('Found Partya data:', foundPartya);

      // UPDATE operation
      foundPartya.politician = this.politician;
      foundPartya.maxVote = this.maxVote;
      foundPartya.maxMoney = this.maxMoney;
      const updatedPartya = await foundPartya.save();
      console.log('Partya data updated:', updatedPartya);

      // READ operation after update
      const foundPartyaAfterUpdate = await Partya.findOne({});
      console.log('Found Partya data after update:', foundPartyaAfterUpdate);

      // DELETE operation
      //const deleteResult = await Partya.deleteOne({});
      //console.log('Partya data deleted:', deleteResult);

      // READ operation after delete
      const foundPartyaAfterDelete = await Partya.findOne({});
      console.log('Found Partya data after delete:', foundPartyaAfterDelete);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  }
}

const myPartya = new PartyaClass('John Doe', 5000, 1000000);
myPartya.main().catch(console.error);
