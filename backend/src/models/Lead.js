import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Veuillez entrer un email valide'],
  },
  dateMariage: {
    type: String,
    default: '',
  },
  styleRecherche: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;