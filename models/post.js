const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    summary: { type: String, required: true }
});
  
module.exports =  mongoose.model("Post", PostSchema)


// PostSchema.pre("save", function(next) {
//     // SET createdAt AND updatedAt
//     const now = new Date();
//     this.updatedAt = now;
  
//     if (!this.createdAt) {
//       this.createdAt = now;
//     }
  
//     next();
//   });
  
//   module.exports = mongoose.model("Post", PostSchema);