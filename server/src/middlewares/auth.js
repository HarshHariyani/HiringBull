import { clerkMiddleware, requireAuth as clerkRequireAuth, getAuth } from '@clerk/express';
import prisma from '../prismaClient.js';

/**
 * Initialize Clerk middleware for the Express app
 * This should be applied globally before any routes
 */
export const initClerk = clerkMiddleware();

/**
 * Middleware to require authentication
 * Returns 401 if user is not authenticated
 * Bypassed if Clerk keys are missing
 */
export const requireAuth = (req, res, next) => {
    const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
    if (isDev && (!process.env.CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY)) {
        req.clerkUserId = 'mock_user_id';
        return next();
    }
    return clerkRequireAuth()(req, res, next);
};

/**
 * Middleware to optionally attach user info if authenticated
 * Does not block unauthenticated requests
 */
export const optionalAuth = (req, res, next) => {
    const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
    if (isDev && (!process.env.CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY)) {
        req.clerkUserId = 'mock_user_id';
        return next();
    }
    const auth = getAuth(req);
    if (auth && auth.userId) {
        req.clerkUserId = auth.userId;
    }
    next();
};

/**
 * Middleware to require admin access via API key
 * For internal/bulk ingestion routes
 * Bypassed if INTERNAL_API_KEY is missing
 */
export const requireApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const expectedKey = process.env.INTERNAL_API_KEY;

    if (!expectedKey) {
        console.warn('⚠️  INTERNAL_API_KEY not configured - bypassing API key check');
        return next();
    }

    if (!apiKey || apiKey !== expectedKey) {
        return res.status(401).json({ message: 'Invalid or missing API key' });
    }

    next();
};

export const getClerkUserId = (req) => {
    const auth = getAuth(req);
    return auth?.userId || req.clerkUserId || null;
};

/**
 * Middleware to require active payment/subscription
 * Must be used AFTER requireAuth or requireApiKey (if mixed)
 * Assuming requireAuth has already run and populated auth context
 */
export const requirePayment = async (req, res, next) => {
    try {
        const clerkId = getClerkUserId(req);

        if (!clerkId) {
            return res.status(401).json({ message: "Authentication required" });
        }

        // Check if user exists and is paid
        const user = await prisma.user.findUnique({
            where: { clerkId: clerkId }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const now = new Date();
        const isActive = user.isPaid && (!user.planExpiry || user.planExpiry > now);

        if (!isActive) {
            return res.status(403).json({
                message: "Active subscription required",
                code: "PAYMENT_REQUIRED"
            });
        }

        // Attach user object to req for convenience
        req.user = user;
        next();
    } catch (error) {
        console.error("Payment check error:", error);
        res.status(500).json({ message: "Internal server error during payment check" });
    }
};
