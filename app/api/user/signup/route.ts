import User from "@/lib/models/User"
import connectDB from "@/lib/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import { z } from "zod"

// Validation schema
const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z.string().email("Please enter a valid email address").toLowerCase().trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
})

// Custom error class for better error handling
class APIError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code?: string,
  ) {
    super(message)
    this.name = "APIError"
  }
}

// Helper function to create error responses
function createErrorResponse(message: string, statusCode: number, code?: string) {
  return NextResponse.json(
    {
      success: false,
      message,
      code,
      timestamp: new Date().toISOString(),
    },
    { status: statusCode },
  )
}

// Helper function to create success responses
function createSuccessResponse(data: any, message: string, statusCode = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    },
    { status: statusCode },
  )
}

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    let body
    try {
      body = await request.json()
    } catch (error) {
      return createErrorResponse("Invalid JSON format", 400, "INVALID_JSON")
    }

    // Validate input data
    const validationResult = signupSchema.safeParse(body)
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }))

      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors,
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      )
    }

    const { name, email, password } = validationResult.data

    // Connect to database with error handling
    try {
      await connectDB()
    } catch (error) {
      console.error("Database connection error:", error)
      return createErrorResponse(
        "Database connection failed. Please try again later.",
        503,
        "DATABASE_CONNECTION_ERROR",
      )
    }

    // Check if user already exists
    let existingUser
    try {
      existingUser = await User.findOne({ email }).lean()
    } catch (error) {
      console.error("Database query error:", error)
      return createErrorResponse("Database query failed. Please try again later.", 500, "DATABASE_QUERY_ERROR")
    }

    if (existingUser) {
      return createErrorResponse(
        "An account with this email address already exists. Please use a different email or try signing in.",
        409,
        "USER_ALREADY_EXISTS",
      )
    }

    // Hash password
    let hashedPassword
    try {
      const saltRounds = 12 // Increased from 10 for better security
      hashedPassword = await bcrypt.hash(password, saltRounds)
    } catch (error) {
      console.error("Password hashing error:", error)
      return createErrorResponse("Password processing failed. Please try again.", 500, "PASSWORD_HASH_ERROR")
    }

    // Create new user
    let newUser
    try {
      newUser = new User({
        name: name.trim(),
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        isEmailVerified: false, // Add email verification status
        lastLogin: null,
      })

      await newUser.save()
    } catch (error: any) {
      console.error("User creation error:", error)

      // Handle specific MongoDB errors
      if (error.code === 11000) {
        // Duplicate key error
        const field = Object.keys(error.keyPattern)[0]
        return createErrorResponse(`An account with this ${field} already exists.`, 409, "DUPLICATE_KEY_ERROR")
      }

      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err: any) => ({
          field: err.path,
          message: err.message,
        }))

        return NextResponse.json(
          {
            success: false,
            message: "User data validation failed",
            errors,
            timestamp: new Date().toISOString(),
          },
          { status: 400 },
        )
      }

      return createErrorResponse("Failed to create user account. Please try again.", 500, "USER_CREATION_ERROR")
    }

    // Return success response (don't include sensitive data)
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      isEmailVerified: newUser.isEmailVerified,
    }

    return createSuccessResponse(
      userResponse,
      "Account created successfully! Please check your email to verify your account.",
      201,
    )
  } catch (error) {
    console.error("Unexpected signup error:", error)

    // Handle different types of unexpected errors
    if (error instanceof APIError) {
      return createErrorResponse(error.message, error.statusCode, error.code)
    }

    if (error instanceof z.ZodError) {
      return createErrorResponse("Invalid input data", 400, "VALIDATION_ERROR")
    }

    // Generic error for any other unexpected errors
    return createErrorResponse("An unexpected error occurred. Please try again later.", 500, "INTERNAL_SERVER_ERROR")
  }
}

// Optional: Add rate limiting (you can implement this with a middleware)
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
