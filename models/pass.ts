import { Document, Schema, models } from "mongoose";

interface IPass extends Document {
  key: string;
}

const PassSchema = new Schema<IPass>({
  key: { type: String, required: [true, "Incorrect Key"] },
});

const PassKey = models.passkey;

export default PassKey;
