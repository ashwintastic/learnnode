import mongoose, { Schema } from 'mongoose';

const VehicleSchema = new Schema({
    name: { type: String, required: true },
    vNumber: {type: String, required: true, unique: true},
    maxCapacity: {type: Number, required:true},
    vehicleDocs: [{type: String, required: true}],
    vehicleBelongsTo: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

export default Vehicle;
