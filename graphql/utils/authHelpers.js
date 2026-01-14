/**
 * Auth helper functions for role-based access control
 */

export const requireAuth = (context) => {
  if (!context.user_id) {
    throw new Error('Authentication required. Please login first.');
  }
};

export const requireAdmin = (context) => {
  if (!context.user_id) {
    throw new Error('Authentication required. Please login first.');
  }
  
  if (context.user_role !== 'admin') {
    throw new Error('Access denied. Admin privileges required.');
  }
};

export const isOwnerOrAdmin = (resourceUserId, context) => {
  requireAuth(context);
  
  if (context.user_role === 'admin') {
    return true; // Admins can access everything
  }
  
  if (resourceUserId !== context.user_id) {
    throw new Error('Access denied. You can only modify your own resources.');
  }
  
  return true;
};
