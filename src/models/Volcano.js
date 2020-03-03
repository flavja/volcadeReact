import mongoose, {model, Schema} from 'mongoose';

const volcanoSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        min: -90,
        max: 90,
        required: true
    },
    longitude: {
        type: Number,
        min: -180,
        max: 180,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now()
    },
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Volcano = model('Volcano', volcanoSchema);
export default Volcano;
