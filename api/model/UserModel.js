import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String , required: true},
  email: { type: String },
  password: { type: String, required: true},
  phone: {type: Number, required: true,  unique: true},
  isDriver: {type: Boolean}
});

const User = mongoose.model('User', UserSchema);

export default User;
