import mongoose, { Schema } from 'mongoose';
import Vehicle from "./VehicleModel";

const VehicleSchema = new Schema({
    name: { type: String, required: true },
    vNumber: {type: String, required: true, unique: true},
    maxCapacity: {type: Number, required:true},
    vehicleDocs: [{type: String, required: true}],
    vehicleBelongsTo: { type: Schema.Types.ObjectId, ref: 'User' }
});

const PassengerSchema = new Schema({
        firstName: { type: String, required: true },
        lastName: { type: String , required: true},
        password: { type: String, required: true},
        phone: {type: Number, required: true,  unique: true},
        profileImage: {type: String},
        hasSubscribedAvehicle: Schema.Types.Mixed
    },


    { minimize: false }

);

const Passenger = mongoose.model('Passenger', PassengerSchema);

export default Passenger;

