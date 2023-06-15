const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
      match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, // Hexadecimal renk kodu formatı için bir desen eşleşmesi kullanıyoruz.
    },
  },
  { collection: "Tag", timestamps: true }
);

const tag = mongoose.model("Tag", tagSchema);
