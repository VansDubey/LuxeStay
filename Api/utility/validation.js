const Joi = require('joi');

// User Registration Schema
const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required'
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'string.empty': 'Password is required'
    }),
  role: Joi.string()
    .valid('user', 'admin')
    .default('user')
});

// User Login Schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required'
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required'
    })
});

// Place Creation/Update Schema
const placeSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Title must be at least 3 characters',
      'string.max': 'Title cannot exceed 100 characters',
      'string.empty': 'Title is required'
    }),
  address: Joi.string()
    .min(5)
    .max(200)
    .required()
    .messages({
      'string.min': 'Address must be at least 5 characters',
      'string.max': 'Address cannot exceed 200 characters',
      'string.empty': 'Address is required'
    }),
  description: Joi.string()
    .min(10)
    .max(5000)
    .required()
    .messages({
      'string.min': 'Description must be at least 10 characters',
      'string.max': 'Description cannot exceed 5000 characters',
      'string.empty': 'Description is required'
    }),
  price: Joi.number()
    .min(10)
    .max(100000)
    .required()
    .messages({
      'number.min': 'Price must be at least $10',
      'number.max': 'Price cannot exceed $100,000',
      'number.base': 'Price must be a number'
    }),
  checkIn: Joi.string()
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      'string.pattern.base': 'Check-in time must be in HH:MM format (24-hour)',
      'string.empty': 'Check-in time is required'
    }),
  checkOut: Joi.string()
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      'string.pattern.base': 'Check-out time must be in HH:MM format (24-hour)',
      'string.empty': 'Check-out time is required'
    }),
  perks: Joi.array()
    .items(Joi.string())
    .default([]),
  AddedPhotos: Joi.array()
    .items(Joi.string().uri())
    .min(1)
    .messages({
      'array.min': 'At least one photo is required'
    })
});

// Booking Creation Schema
const bookingSchema = Joi.object({
  place: Joi.string()
    .required()
    .messages({
      'string.empty': 'Place ID is required'
    }),
  checkin: Joi.date()
    .required()
    .messages({
      'date.base': 'Check-in must be a valid date',
      'any.required': 'Check-in date is required'
    }),
  checkout: Joi.date()
    .min(Joi.ref('checkin'))
    .required()
    .messages({
      'date.base': 'Check-out must be a valid date',
      'date.min': 'Check-out date must be after check-in date',
      'any.required': 'Check-out date is required'
    }),
  guests: Joi.number()
    .min(1)
    .max(20)
    .required()
    .messages({
      'number.min': 'At least 1 guest is required',
      'number.max': 'Maximum 20 guests allowed',
      'number.base': 'Guests must be a number'
    }),
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters',
      'string.empty': 'Name is required'
    }),
  mobile: Joi.string()
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Please provide a valid phone number',
      'string.empty': 'Phone number is required'
    }),
  price: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Price must be a valid number',
      'any.required': 'Price is required'
    })
});

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      const messages = error.details.map(detail => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    req.body = value; // Validated and sanitized data
    next();
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  placeSchema,
  bookingSchema,
  validate
};
