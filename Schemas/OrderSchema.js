const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    orderId:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        ref:'Product',
        required:true
    },    
    quantity:{
        type:Number,
        required:true
    },
    block:{
        type:String,
        required:true
    },
    room:{
        type:Number,
        required:true
    },
    paymentType:{
        type:String,
        required:true
    },
    paymentId:{
        type:String,        
    },
    orderDelivered:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model('Order', OrderSchema);