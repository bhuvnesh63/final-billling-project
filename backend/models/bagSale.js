
const mongoose = require("mongoose");

const BagOrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
  },
  mobileNumber: {
    type: Number,
  },
  createdDate:{
    type: Date,
  },

  // phoneNumber: {
  //   type: Number,
  // },
  Items: [
    {

      productId:{
        type: String,
        
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
      unitName: {
        type: String,

      },
      totalPrice: {
        type: Number,
      },
      grandTotal: {
        type: Number,
      },
      discountInPercentage: {
        type: Number,
      },
      discountInRupess: {
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
      pcsToSale:{
        type: Number,

      },
      pcswithQuantity:{
        type: Number,

      },
      unit:{
        type: String,
      },
      discountInPercentage:{
        type: Number,

      },
      discountInRupess:{
        type: Number,

      },
      price:{
        type: Number,

      },
      price:{
        type: Number,

      }
    },
  ],
});

module.exports = mongoose.model("BagSaleOrder", BagOrderSchema);
