// memanggil dependensi mongoose
const mongoose = require("mongoose")
// Data produk yang akan di simpan di server mongoose
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    Stock: {
        type: Number,
        required: [true, "Total Product is required"],
    },
    Description: {
        type: String,
        required: [true, "Desciption Product is required"],
    },
    Category: {
        type: String,
        enum: [
                "Makanan & Minuman",
                "Elektronik",
                "Tekstil",
                "Alat Tulis Kantor",
                "Obat",
                "Gundam",
                "Perabotan",
                "Bahan Bangunan & Peralatan",
                "Otomotif",
                "Komputer",
                "Bahan Kimia",
                "Lainnya" 
            ],
        required: [true, "Category Product is required"]
    },
    thumbnail: {
        type: String,
        required: true,
    },
    cloudinaryId: {
        type: String
    }
});

module.exports = mongoose.model("Products", userSchema)