const express = require("express");
const { getAllsaleOrder, createSaleOrder,getAllBagSale,getBagSaleDateilsByDate,getAllSalesbydate, getSaleDateilsByDate,updateSaleOrder, createbagSaleOrder, getAllBagSaleHistory, updateBagSaleOrder, deleteSaleOrder, getBagSaleHistoryByDate, getSaleOrderDetail, getAllBagsaleOrder, deleteBagSaleOrder, getAllSaleHistory, getSaleHistoryByDate, getbagSaleOrderDetail } = require("../controllers/saleOrder");

const router = express.Router();


// Routes
router.route("/saleorders").get(getAllsaleOrder);

router.get("/salehistories", getAllSaleHistory);


router.get("/salebydate",getAllSalesbydate);

router.get("/salesbydate/:startDate/:endDate", getSaleDateilsByDate);
router.get("/salehistory/:startDate/:endDate", getSaleHistoryByDate);


router.get("/unitsalebydate",getAllBagSale);
router.get("/unitsalesbydate/:startDate/:endDate", getBagSaleDateilsByDate);




router.route("/saleorder/new").post(createSaleOrder);
// router.route("/order/status/:id").put(updateOrderStatus);
router.route("/saleorder/:id").put(updateSaleOrder).delete(deleteSaleOrder).get(getSaleOrderDetail);

router.route("/bagsaleorders").get(getAllBagsaleOrder);

router.get("/bagsalehistories", getAllBagSaleHistory);
router.get("/bagsalehistory/:startDate/:endDate", getBagSaleHistoryByDate);
router.route("/bagsaleorder/new").post(createbagSaleOrder);

router.route("/bagsaleorder/:id").delete(deleteBagSaleOrder).get(getbagSaleOrderDetail).put(updateBagSaleOrder)
module.exports = router;
