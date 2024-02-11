const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Plz enter a product name'],
        maxLength: [100, 'Cannot exceed 100 characters'],
        trim: true 
    },
    price: {
        type: Number,
        required: [true, 'Plz enter a product price'],
        maxLength: [5, 'Cannot exceed 5 characters'],
        default: 0.0 
    },
    description: {
        type: String,
        required: [true, 'Plz enter a product description']
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            publicId: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }             
        }
    ],
    category: {
        type: String,
        required: [true, 'Plz select category for this product'],
        enum : {
            values: ['Electronics', 'Camera', 'Laptop', 'Food', 'Books', 'Sports', 'Outdoor', 'Home']
        },
        message: 'Plz select correct category for this product'
    },
    seller: {
        type: String,
        required: [true, 'Plz enter a product seller']
    },
    stock: {
        type: Number,
        default: 0,
        required: [true, 'Plz enter a product stock'],
        maxLength: [5, 'Cannot exceed 5 characters']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            } 
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },    
});

module.exports = mongoose.model('Product', productSchema);