const expressAsyncHandler = require("express-async-handler");
const { trusted } = require("mongoose");
const createBid = require("../models/create-bidmodel");
const buyerSchrma = require('../models/buyer-bid');
const { findOne } = require("../models/kyc.model");
const User = require("../models/auth.model");
const Buyer = require("../models/buyer-bid");
const payment = require('../models/paymentSummary')
const waitlist = require('../models/whislested')
function genrateLotId(crop) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  let name = month[d.getMonth()].substring(0, 3);
  const id = name + "/" + crop.substring(0, 3) + "/";

  return id;
}
module.exports.createBid = expressAsyncHandler(async (req, res) => {
  try {
    const { user_id, location, crop, grade, variety, quantity, rate, totalBags, expectedRate, moisture, colour, extraneous, foriegnMatter, otherCrop, status, } = req.body;
    if (!(user_id && location && crop && grade && variety && quantity && totalBags && expectedRate)) {
      return res.status(401).send({ msg: "Required all fields" });
    }
    const random = Math.floor(Math.random() * 9000 + 1000);
    const ID = genrateLotId(crop) + random;
    const data = new createBid({ user_id: user_id, location: location, crop: crop, grade: grade, variety: variety, quantity: quantity, totalBags: totalBags, expectedRate: expectedRate, lotId: ID, moisture: moisture, colour: colour, extraneous: extraneous, foriegnMatter: foriegnMatter, otherCrop: otherCrop, status: status, });
    const result = await data.save();
    res.status(200).send({ msg: "bid successfully", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});
module.exports.updateBid = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { location, crop, grade, variety, quantity, rate, totalBags, expectedRate, moisture, colour, extraneous, foriegnMatter, otherCrop, lotId, status, } = req.body;
    if (crop) {
      const random = Math.floor(Math.random() * 9000 + 1000);
      var ID = genrateLotId(crop) + random;
    }
    const data = await createBid.findByIdAndUpdate(id, { location, crop, grade, variety, quantity, rate, totalBags, expectedRate, moisture, colour, extraneous, foriegnMatter, otherCrop, lotId: ID });
    res.status(200).send({ msg: "bid updated successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});
module.exports.RecreateBid = async (req, res) => {
  try {
    const result = await createBid.updateOne({ _id: req.params.id }, { expectedRate: req.body.highestBid, quantity: req.body.qty }, { new: true });
    console.log(result)
    if (!result) {
      return res.status(400).json({ message: "Bid Id not Found in DB" })
    }
    res.status(200).json({ message: "ok" })
  } catch (err) {
    console.log(err);
    res.status(200).json({
      message: err.message
    })
  }
};
module.exports.verifiedBidByAdmin = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body.expiretime)
    console.log(id)
    await createBid.updateOne({ _id: id }, { expiretime: req.body.expiretime, activetime: new Date().toLocaleTimeString(), status: "active" }, { new: true });
    res.status(200).send({ msg: "bid verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});
module.exports.deleteBid = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const data = await createBid.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ msg: "Id not found" });
    }
    res.status(200).send({ msg: "bid deleted successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});
module.exports.getBidDetails = expressAsyncHandler(async (req, res) => {
  try {
    const data = await createBid.find();
    if (!data) {
      return res.status(404).json({ msg: "data not found" });
    }
    res.status(200).send({ msg: "bid get successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});
exports.getBidDetailsById = expressAsyncHandler(async (req, res) => {
  try {
    const data = await createBid.find({ user_id: req.params.id }).populate(['user_id', 'crop'])
    console.log(data)
    if (!data) {
      return res.status(404).json({ msg: "Id not found" });
    }
    return res.status(200).send({ msg: "bid get successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});
module.exports.allUsers = async (req, res) => {
  const keyword = req.query.search ? { $or: [{ crop: { $regex: req.query.search, $options: "i" } }] } : {};
  const users = await createBid.find(keyword);
  res.send(users);
};
exports.getBidByBidId = async (req, res) => {
  try {
    if (!req.body.user) {
      return res.status(400).json({ message: "User ID required " })
    }
    const findData = await filterHightestBidlist(req.params.id, req.body.user)
    if (findData) {
      const data = await waitlist.find({ bid: req.params.id, user: req.body.user }).populate(['user', 'bid']).populate({ path: 'top.user', model: 'User' })
      if (!data) {
        return res.status(500).json({ message: "No Data Found this Bid ID " })
      }
      res.status(200).json({ message: data })
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message
    })
  }
}
const filterHightestBidlist = async (ID, user) => {
  try {
    const data = await buyerSchrma.find({ createbid: ID, }).sort({ highestBid: -1 }).limit(10)
    const waitlistData = await waitlist.findOne({ user: user, bid: ID })
    if (!waitlistData) {
      return await waitlist.create({ user: user, top: data, bid: ID });
    } else {
      var saveData = await waitlist.findByIdAndUpdate({ _id: waitlistData._id }, { $set: { user: user, top: data, bid: ID } }, { new: true })
      return saveData;
    }
  } catch (err) {
    console.log(err)
  }
}
module.exports.AcceptBid = async (req, res) => {
  try {
    const waitlistData = await waitlist.findOne({ user: req.params.user, bid: req.params.bid, });
    let top = [];
    for (let i = 0; i < waitlistData.top.length; i++) {
      if (waitlistData.top[i]._id.toString() === req.params.id.toString()) {
        let obj = {
          _id: waitlistData.top[i]._id,
          product: waitlistData.top[i].product,
          highestBid: waitlistData.top[i].highestBid,
          bidDetail: waitlistData.top[i].bidDetail,
          quantity: waitlistData.top[i].quantity,
          crop: waitlistData.top[i].crop,
          user: waitlistData.top[i].user,
          status: "winner",
          createbid: waitlistData.top[i].createbid,
          inspection: waitlistData.top[i].inspection,
          accept_status: true
        }
        top.push(obj)
        await buyerSchrma.updateOne({ _id: waitlistData.top[i]._id }, { status: "winner", accept_status: true, }, { new: true });

      } else {
        let obj = {
          _id: waitlistData.top[i]._id,
          product: waitlistData.top[i].product,
          highestBid: waitlistData.top[i].highestBid,
          bidDetail: waitlistData.top[i].bidDetail,
          quantity: waitlistData.top[i].quantity,
          crop: waitlistData.top[i].crop,
          user: waitlistData.top[i].user,
          status: "Onhold",
          createbid: waitlistData.top[i].createbid,
          inspection: waitlistData.top[i].inspection,
          accept_status: true
        }
        top.push(obj)
        await buyerSchrma.findByIdAndUpdate({ _id: waitlistData.top[i]._id }, { status: "Onhold", }, { new: true });
      }
    }
    let update = await await waitlist.findByIdAndUpdate({ _id: waitlistData._id }, { $set: { top: top } }, { new: true })
    if (update) {
      res.status(200).json({ message: "Bid is Accepted", });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message, });
  }
};
module.exports.RejectBid = async (req, res) => {
  try {
    const data = await buyerSchrma.findById({ _id: req.params.id })
    const waitlistData = await waitlist.findOne({ user: req.params.user, bid: req.params.bid, })
    const idToDelete = req.params.id;
    console.log(idToDelete)
    //   console.log(waitlistData)
    // Filter out the object with the matching ID value
    const updatedTopArray = waitlistData.top.filter((obj) => obj._id.toString() !== req.params.id.toString()
    );
    console.log(updatedTopArray.length)
    // Update the "top" property in the original object
    waitlistData.top = updatedTopArray;
    waitlistData.save()
    //console.log(waitlistData)


    // Alternatively, you could create a new object with the updated "top" array
    await buyerSchrma.findByIdAndUpdate({ _id: req.params.id }, {
      status: "Decline",
    })
    res.status(200).json({
      message: "Bid is Decline"
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}
module.exports.RemaingData = async (req, res) => {
  try {
    const result = await waitlist.findOne({ user: req.params.id });
    res.status(200).json({ message: "ok", result: result })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
exports.GetAllBids = async (req, res) => {
  try {
    const data = await createBid.find();
    res.status(200).json({ data: data })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
module.exports.createpaymentSummary = async (req, res) => {
  try {
    const bidData = await buyerSchrma.findById({ _id: req.body.placeBidId })
    const pending = parseInt(bidData.highestBid) - parseInt(req.body.amount)
    const paymentData = {
      buyerId: req.body.buyerId,
      supplierId: req.body.supplierId,
      BidId: req.body.BidId,
      pending: parseInt(pending),
      amount: req.body.amount,
      placeBidId: req.body.placeBidId,
      mode: req.body.mode,
      status: req.body.status
    }
    const Data = await payment.create(paymentData);
    res.status(200).json(Data);
  } catch (err) {
    res.status(400).json({ err: err.message })
  }
}
module.exports.getPaymentByLotId = expressAsyncHandler(async (req, res) => {
  try {
    const data = await payment.find().populate(['supplierId', 'buyerId', 'BidId', 'placeBidId'])
    res.status(200).json({ summary: data });
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
})
exports.changeStatusByTimer = async (req, res) => {
  try {
    const time = req.body.time;
    if (time === "00:00:00") {
      const result = await createBid.findById({ _id: req.params.id })
      if (!result) {
        return res.status(201).json({
          message: "Bid is not Found "
        })
      }
      console.log(result)
      if (result.count >= 1) {
        result.status = "PositiveBid",
          result.expiretime = time
        result.save()
        return res.status(200).json({
          message: "Bid Not Expired it already placed a BID "
        })
      }
      result.status = "Expired";
      result.expiretime = time;
      result.save()
      res.status(200).json({ message: "Bid is Expire" })
    } else {
      res.status(401).json({ message: " you have time or time will be 00:00:00" })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: err.message
    })
  }
}
exports.DeleteAll = async (req, res) => {
  try {
    await waitlist.deleteMany();
    res.status(200).json({ message: "Delete All" })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: err.message
    })
  }
}
exports.PaymntStatus = async (req, res) => {
  try {
    await createBid.findByIdAndUpdate({ _id: req.params.id }, { payment_status: req.body.status });
    const waitlistData = await waitlist.findOne({ bid: req.params.id });
    if (req.body.status === "decline" || req.body.status === "Decline" || req.body.status === "deny") {
      const updatedTopArray = waitlistData.top.filter((obj) => obj._id.toString() !== req.params.id.toString()
      );
      console.log(updatedTopArray.length)
      if (waitlistData.top.length === 0) {
        await waitlist.deleteOne({ _id: req.params.length })
      }
      // Update the "top" property in the original object
      waitlistData.top = updatedTopArray;
      waitlistData.save()
    } else {
      await waitlist.deleteOne({ bid: req.params.id })
    }
    res.status(200).json({ message: "Updated" })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: err.message
    })
  }
}
exports.paymentByBidId = async (req, res) => {
  try {
    const data = await payment.find({ BidId: req.params.id }).populate(['supplierId', 'buyerId', "BidId", 'placeBidId'])
    res.status(200).json({ message: "ok", result: data })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message })
  }
}
exports.paymentByPlacBidd = async (req, res) => {
  try {
    const data = await payment.find({ placeBidId: req.params.id }).populate(['supplierId', 'buyerId', "BidId", 'placeBidId'])
    res.status(200).json({ message: "ok", result: data })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: err.message
    })
  }
}
exports.getBidByLotId = async (req, res) => {
  try {
    console.log(req.body.lotId)
    const result = await createBid.find({ lotId: req.body.lotId }).populate('crop')
    if (result.length === 0) {
      return res.status(200).json({ message: "No LotId Found" })
    }
    res.status(200).json({ message: "ok", result: result })
  } catch (err) {
    console.log(err);
    res.status(200).json({
      message: err.message
    })
  }
}
module.exports.getPaymentByuserId = expressAsyncHandler(async (req, res) => {
  try {
    const data = await payment.find({ $or: [{ buyerId: req.params.userId }, { supplierId: req.params.userId }] }).populate(['supplierId', 'buyerId', 'BidId', 'placeBidId'])
    res.status(200).json({ summary: data });
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
})