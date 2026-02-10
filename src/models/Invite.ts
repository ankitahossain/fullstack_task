import mongoose, {Schema,Document} from "mongoose";
import { email } from "zod";

export interface IInvite extends Document {
    email: string;
    role: "ADMIN" | "Manager" | "Staff";
    token: string;
    expiresAt: Date;
    AcceptedAt?: Date;



}

const InviteSchema: Schema = new Schema({
    email: { type: String, required: true},
    role : {
        type: String,
        enum: ["ADMIN", "MANAGER", "STAFF"],
        required: true,
    },
    token : { type: String, required: true, unique: true},
    expiresAt: { type: Date, required: true},
    AcceptedAt: { type: Date, default: null}
}, { timestamps: true});

const Invite = mongoose.model<IInvite>("Invite", InviteSchema);
export default Invite;