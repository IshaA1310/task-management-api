import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is Required'] },
    email: { type: String, required: [true, 'Email is Required'], unique: true },
    password: { type: String, required: [true, 'Password is Required'], minlength: 8 }
}, { timestamps: true });

// pre-save hook
userSchema.pre('save', async function() {
    this.email = this.email.trim().toLowerCase();
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

// password comparison method
userSchema.methods.comparePassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}

const user = mongoose.model('User', userSchema);

export default user;
