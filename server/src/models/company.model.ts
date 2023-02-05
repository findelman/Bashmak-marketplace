import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CompanySchema = new Schema({
  name: {
    type: String,
    required: 'Enter a company name'
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

export const Company = mongoose.model('Company', CompanySchema);