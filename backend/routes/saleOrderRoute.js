const express = require("express");
const { getAllsaleOrder, createSaleOrder, updateSaleOrder, deleteSaleOrder, getSaleOrderDetail ,getAllSaleHistory,getSaleHistoryByDate} = require("../controllers/saleOrder");

const router = express.Router();


// Routes
router.route("/saleorders").get(getAllsaleOrder);

router.get("/salehistories", getAllSaleHistory);
router.get("/salehistory/:startDate/:endDate", getSaleHistoryByDate);
router.route("/saleorder/new").post(createSaleOrder);
// router.route("/order/status/:id").put(updateOrderStatus);
router.route("/saleorder/:id").put(updateSaleOrder).delete(deleteSaleOrder).get(getSaleOrderDetail);


module.exports = router;
