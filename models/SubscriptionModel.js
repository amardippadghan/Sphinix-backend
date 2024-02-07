const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
    default: 100,
  },
  startDate: {
    type: String,
    required: true,
    default: new Date(),
  },
  endDate: {
    type: Date,
    required: true,
    default: function () {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);
      return endDate;
    },
  },
  renewOn: {
    type: Date,
    required: true,
    default: function () {
      const renewOn = new Date(this.endDate);
      renewOn.setDate(renewOn.getDate() + 1);
      return renewOn;
    },
  },
  license: {
    type: String,
    required: true,
  },
});

const subscription = mongoose.model("subscription", SubscriptionSchema);

module.exports = subscription;
