// const mongoose = require('mongoose');

// const paymentAccountSchema = new mongoose.Schema({
//   restaurantId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Restaurant', // Reference to the Restaurant model
//     required: true,
//     unique: true, // Ensures one account per restaurant
//   },
//   paymentProcessor: {
//     type: String,
//     enum: ['Stripe', 'PayPal', 'BankTransfer', 'UPI', 'Other'], // Specify supported processors
//     required: true,
//   },
//   accountDetails: {
//     accountHolderName: {
//       type: String,
//       required: true,
//     },
//     accountNumber: {
//       type: String,
//       required: true,
//       minlength: 10,
//       maxlength: 18, // Adjust based on the standards for bank account numbers
//     },
//     bankName: {
//       type: String,
//       required: function () {
//         return this.paymentProcessor === 'BankTransfer';
//       }, // Required for bank transfers
//     },
//     ifscCode: {
//       type: String,
//       required: function () {
//         return this.paymentProcessor === 'BankTransfer';
//       },
//       match: /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/, // Regex for validating Indian IFSC codes
//     },
//     upiId: {
//       type: String,
//       required: function () {
//         return this.paymentProcessor === 'UPI';
//       },
//       match: /^[\w.-]+@[\w.-]+$/, // UPI ID regex
//     },
//     paypalEmail: {
//       type: String,
//       required: function () {
//         return this.paymentProcessor === 'PayPal';
//       },
//       match: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email validation
//     },
//   },
//   taxDetails: {
//     gstNumber: {
//       type: String,
//       match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, // GST validation (India)
//     },
//     panNumber: {
//       type: String,
//       match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // PAN validation (India)
//     },
//   },
//   payoutSchedule: {
//     frequency: {
//       type: String,
//       enum: ['Daily', 'Weekly', 'Monthly'], // Frequency of payouts
//       default: 'Weekly',
//     },
//     lastPayoutDate: {
//       type: Date,
//     },
//   },
//   isActive: {
//     type: Boolean,
//     default: true, // Whether the account is currently active
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now, // Auto-timestamp
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now, // Auto-timestamp for updates
//   },
// });

// // Add an index for fast lookups on restaurantId
// paymentAccountSchema.index({ restaurantId: 1 });

// module.exports = mongoose.model('PaymentAccount', paymentAccountSchema);
