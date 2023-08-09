
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  gstNumber: {
    type: String,
  },
  createdDate:{
    type: Date,
  },

  Items: [
    {
      productId: {
        type: String,
        required: true
      },
      itemName: {
        type: String,

      },
      pricePerItem: {
        type: Number,

      },
      quantity: {
        type: String,

      },
      totalPrice: {
        type: Number,
      },
      amountWithoutGST: {
        type: Number,
      },
      cgstapplied: {
        type: Number,
      },
      sgstapplied: {
        type: Number,
      },
      pricePerItem: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
