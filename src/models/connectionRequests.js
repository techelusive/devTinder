const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      // this is not an string -> it is an object id
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the user collection
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        messsage: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // check if fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot sand connection request to yourself");
  }
  next();
});

// Creating a mongoose model
const connectionRequestModel = new mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);
module.exports = connectionRequestModel;
