import mongoose, {model, Schema} from 'mongoose';

const waterfallSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    height: {
        type: Number
    },
    date_added: {
        type: Date,
        default: Date.now()
    },
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String
    }
});

const Waterfall = model('Waterfall', waterfallSchema);
export default Waterfall;
