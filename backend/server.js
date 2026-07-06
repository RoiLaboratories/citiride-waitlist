require("./env");

const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { getNewsletterTable, getSupabaseClient, getWaitlistTable } = require("./supabase");
const { newsletterSubscriptionSchema, waitlistEntrySchema } = require("./validation");

const app = express();
const port = Number(process.env.API_PORT || 4000);
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const waitlistLimiter = rateLimit({
  legacyHeaders: false,
  limit: 20,
  standardHeaders: true,
  windowMs: 60 * 1000,
});

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin is not allowed by CORS."));
    },
  }),
);
app.use(express.json({ limit: "20kb" }));

app.get("/health", (_request, response) => {
  response.json({
    ok: true,
    service: "citiride-waitlist-api",
  });
});

app.post("/api/waitlist", waitlistLimiter, async (request, response) => {
  const parsed = waitlistEntrySchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({
      error: "Please check the form fields and try again.",
      fields: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    response.status(503).json({
      error:
        "Waitlist storage is not configured yet. Add your Supabase environment variables.",
    });
    return;
  }

  const record = {
    category: parsed.data.category,
    email: parsed.data.email,
    full_name: parsed.data.fullName,
    state_city: parsed.data.stateCity,
  };

  const { data, error } = await supabase
    .from(getWaitlistTable())
    .insert(record)
    .select("id, category, created_at")
    .single();

  if (error) {
    if (error.code === "23505") {
      response.status(409).json({
        error: `This email is already on the ${parsed.data.category.toLowerCase()} waitlist.`,
      });
      return;
    }

    console.error("Supabase insert failed", error);
    response.status(500).json({
      error: "We could not save your waitlist registration. Please try again.",
    });
    return;
  }

  response.status(201).json({
    entry: data,
    message: `You're on the ${parsed.data.category.toLowerCase()} waitlist. We'll keep you posted.`,
  });
});


app.post("/api/newsletter", waitlistLimiter, async (request, response) => {
  const parsed = newsletterSubscriptionSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({
      error: "Please enter a valid email address.",
      fields: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    response.status(503).json({
      error:
        "Newsletter storage is not configured yet. Add your Supabase environment variables.",
    });
    return;
  }

  const record = {
    email: parsed.data.email,
  };

  const { data, error } = await supabase
    .from(getNewsletterTable())
    .insert(record)
    .select("id, email, created_at")
    .single();

  if (error) {
    if (error.code === "23505") {
      response.status(409).json({
        error: "This email is already subscribed to CitiRide updates.",
      });
      return;
    }

    console.error("Supabase newsletter insert failed", error);
    response.status(500).json({
      error: "We could not save your subscription. Please try again.",
    });
    return;
  }

  response.status(201).json({
    entry: data,
    message: "You're subscribed to CitiRide updates.",
  });
});
app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({
    error: "Something went wrong. Please try again.",
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`CitiRide waitlist API listening on http://localhost:${port}`);
  });
}

module.exports = app;
