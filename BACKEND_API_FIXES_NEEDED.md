# Backend API Fixes Needed

This document outlines the missing or broken endpoints that need to be implemented or fixed in the Go backend.

## 🔴 Critical Issues

### 1. Admin Middleware 403 Errors
**Problem**: Many admin endpoints return 403 even with valid authentication
**Affected Endpoints**:
- `PATCH /api/v1/matches/:id/score` - Returns 403
- Other admin-only endpoints may have the same issue

**Current Code** ([match/adapter.http.go:24-29](internal/domain/match/adapter.http.go#L24-29)):
```go
adminRouter := router.Group("", mid.AdminMiddleware)
adminRouter.Post("/", h.CreateMatch)
adminRouter.Patch("/:id/winner/:winner_id", h.UpdateMatchWinner)
adminRouter.Patch("/:id/score", h.UpdateMatchScore)
adminRouter.Patch("/:id/draw", h.UpdateMatchDraw)
adminRouter.Delete("/:id", h.DeleteMatch)
```

**Solution Needed**:
- Check `AdminMiddleware` implementation in `internal/domain/middleware`
- Ensure it properly checks for ADMIN role from JWT token
- Frontend is sending valid JWT token with user profile

---

## 🟡 Missing Endpoints

### 2. Sport Types Management
**Problem**: No CRUD endpoints for SportType management
**Missing Endpoints**:
- `GET /api/v1/sport-types` - List all sport types
- `POST /api/v1/sport-types` - Create sport type (optional)
- `PUT /api/v1/sport-types/:id` - Update sport type (optional)
- `DELETE /api/v1/sport-types/:id` - Delete sport type (optional)

**Current Workaround**: Frontend uses hardcoded sport types from migration script

**Implementation Needed**:
Create new domain `/internal/domain/sporttype/` with:
- `port.go` - Service and Repository interfaces
- `service.go` - Business logic
- `adapter.http.go` - HTTP handlers
- `adapter.db.go` - Database repository
- `utils.go` - DTO converters

**Migration Script Reference** ([migration_script.go:103-140](pkg/database/migration/migration_script.go#L103-140)):
```go
sportTypes := []model.SportType{
    {Id: constant.FOOTBALL_MALE_JR, Title: "ฟุตบอล ชาย ปี1"},
    {Id: constant.FOOTBALL_MALE_SR, Title: "ฟุตบอล ชาย ปี2-4"},
    // ... 7 more types
}
```

---

### 3. Match Update/Edit
**Problem**: No endpoint to update match details (teams, times, sport type)
**Missing Endpoint**:
- `PUT /api/v1/matches/:id` - Update match details

**Currently Available**:
- `PATCH /api/v1/matches/:id/score` - Update scores only
- `PATCH /api/v1/matches/:id/winner/:winner_id` - Update winner only
- `DELETE /api/v1/matches/:id` - Delete match

**Needed**: Full update endpoint for editing match before it starts

---

### 4. Daily Rewards Management
**Problem**: No endpoint to set daily rewards
**Missing Endpoint**:
- `POST /api/v1/daily-rewards` - Set reward for specific date
- `GET /api/v1/daily-rewards` - List all rewards (optional)
- `GET /api/v1/daily-rewards/:date` - Get reward for date (optional)

**Current**: Only redemption endpoint exists: `GET /api/v1/events/redeem/daily`

---

### 5. Bills/Betting Statistics
**Problem**: No endpoint to fetch betting data for statistics
**Missing Endpoints**:
- `GET /api/v1/bills` - List all bills/bets
- `GET /api/v1/bills/statistics` - Aggregate betting statistics

**Current**: Bills are created via match betting but no read endpoint

---

## 🟢 Working Endpoints

### Matches
- ✅ `GET /api/v1/matches` - List all matches
- ✅ `GET /api/v1/matches/:id` - Get match by ID
- ✅ `POST /api/v1/matches` - Create match
- ✅ `PATCH /api/v1/matches/:id/draw` - Mark as draw
- ✅ `DELETE /api/v1/matches/:id` - Delete match
- ⚠️ `PATCH /api/v1/matches/:id/score` - Update scores (403 error)
- ⚠️ `PATCH /api/v1/matches/:id/winner/:winner_id` - Update winner (403 error)

### Colors
- ✅ `GET /api/v1/colors/leaderboards` - Get colors with stats
- ✅ `GET /api/v1/colors/group-stage` - Get group stage table

### Users
- ✅ `GET /api/v1/users` - List all users
- ✅ `GET /api/v1/users/:id` - Get user by ID
- ✅ `PATCH /api/v1/users/:id` - Update user

### Auth
- ✅ `GET /api/v1/auth/me` - Get current user profile
- ✅ `GET /api/v1/auth/google/login` - OAuth login

### Events
- ✅ `GET /api/v1/events/redeem/daily` - Redeem daily reward
- ✅ `POST /api/v1/events/spin/slot?spendAmount=50` - Spin slot machine

---

## 📝 Recommended Fix Priority

### High Priority (Blocking admin functionality)
1. **Fix AdminMiddleware 403 errors** - Critical for all admin operations
2. **Add GET /sport-types endpoint** - Replace hardcoded frontend data
3. **Add PUT /matches/:id endpoint** - Enable match editing

### Medium Priority (Nice to have)
4. Add GET /bills endpoint - For statistics page
5. Add POST /daily-rewards endpoint - For settings page

### Low Priority (Optional enhancements)
6. Sport types CRUD operations (they're in migration, rarely change)
7. Daily rewards list endpoint

---

## 🔧 Quick Fixes

### Fix 403 Errors on Admin Endpoints

Check `internal/domain/middleware/middleware.go`:

```go
func (m *MiddlewareHttpHandler) AdminMiddleware(c *fiber.Ctx) error {
    // Get user from context (set by AuthMiddleware)
    profile := utils.GetUserProfileFromCtx(c)
    if profile == nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": "Unauthorized",
        })
    }

    // Check if user is admin
    if profile.RoleId != "ADMIN" {
        return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
            "error": "Admin access required",
        })
    }

    return c.Next()
}
```

Make sure:
1. `AuthMiddleware` is called first (it is, see line 18: `mid.AuthMiddleware`)
2. `GetUserProfileFromCtx` properly extracts user from JWT
3. User's `RoleId` field is correctly set in database

---

## 📊 Frontend Workarounds Currently in Place

1. **Sport Types**: Hardcoded list of 9 sport types from migration script
2. **Match Edit**: Delete button available but full edit limited
3. **Statistics**: Placeholder UI, waiting for `/bills` endpoint
4. **Daily Rewards**: UI ready, waiting for POST endpoint

All admin pages are functional with available endpoints, but some features are limited until backend is fixed.
