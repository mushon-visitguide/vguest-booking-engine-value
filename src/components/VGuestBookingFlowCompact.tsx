import {
  ArrowRight,
  Bot,
  Calendar,
  DollarSign,
  MessageCircle,
  Phone,
  TrendingUp,
  Users,
} from "lucide-react";

export default function VGuestBookingFlowCompact() {
  return (
    <div
      className="h-screen w-full relative overflow-hidden flex flex-col"
      style={{ backgroundColor: "#0d0817", fontFamily: "Cairo, sans-serif" }}
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Abstract Gradient Blobs - smaller and repositioned */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-30"
          style={{
            background: "rgba(168, 85, 247, 0.65)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-30"
          style={{
            background: "rgba(236, 72, 153, 0.55)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full opacity-30"
          style={{
            background: "rgba(59, 130, 246, 0.55)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-56 h-56 rounded-full opacity-30"
          style={{
            background: "rgba(251, 146, 60, 0.45)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex-1 flex flex-col px-6 py-6 max-w-6xl mx-auto w-full">
        {/* Header - Compact */}
        <div className="text-center mb-6">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: "#f79627" }}
          >
            AI-Powered Revenue Solution
          </p>
          <h1
            className="text-3xl font-black mb-1"
            style={{
              background: "linear-gradient(to right, #edecee, #9181ab)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Increase Direct Bookings with{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f79627, #ef5626)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              vGuest
            </span>
          </h1>
          <p className="text-sm" style={{ color: "#9ca3af" }}>
            Transform incoming calls into direct revenue with WhatsApp AI
          </p>
        </div>

        {/* Main Flow - Horizontal Compact */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {/* Step 1: Phone Calls */}
          <div
            className="relative rounded-xl p-4 w-56 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(55, 65, 81, 0.5)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)",
                }}
              >
                <Phone className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold" style={{ color: "#edecee" }}>
                Incoming Calls
              </h3>
            </div>
            <p className="text-xs mb-2" style={{ color: "#9ca3af" }}>
              Guest calls for inquiries or reservations
            </p>
            <div
              className="flex items-center gap-1 text-xs"
              style={{ color: "#fca5a5" }}
            >
              <Users className="w-3 h-3" />
              <span>High volume, often missed</span>
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="flex items-center">
            <div
              className="w-8 h-0.5 rounded"
              style={{
                background: "linear-gradient(to right, #ef4444, #f79627)",
              }}
            />
            <ArrowRight
              className="w-5 h-5 -ml-1"
              style={{ color: "#f79627" }}
            />
          </div>

          {/* Step 2: WhatsApp AI */}
          <div
            className="relative rounded-xl p-4 w-56 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(247, 150, 39, 0.3)",
              boxShadow: "0 0 25px rgba(247, 150, 39, 0.1)",
            }}
          >
            <div
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold px-3 py-0.5 rounded-full"
              style={{
                background: "linear-gradient(to right, #f79627, #ef5626)",
                color: "#000",
                fontSize: "10px",
              }}
            >
              vGuest AI
            </div>
            <div className="flex items-center gap-3 mb-2 mt-1">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
                }}
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold" style={{ color: "#edecee" }}>
                WhatsApp AI
              </h3>
            </div>
            <p className="text-xs mb-2" style={{ color: "#9ca3af" }}>
              24/7 instant AI conversations
            </p>
            <div className="flex gap-2">
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  color: "#86efac",
                }}
              >
                <Bot className="w-3 h-3 inline mr-1" />
                Instant
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  color: "#86efac",
                }}
              >
                Multi-lang
              </span>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="flex items-center">
            <div
              className="w-8 h-0.5 rounded"
              style={{
                background: "linear-gradient(to right, #22c55e, #3b82f6)",
              }}
            />
            <ArrowRight
              className="w-5 h-5 -ml-1"
              style={{ color: "#3b82f6" }}
            />
          </div>

          {/* Step 3: Booking Engine */}
          <div
            className="relative rounded-xl p-4 w-56 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(55, 65, 81, 0.5)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                }}
              >
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold" style={{ color: "#edecee" }}>
                Booking Engine
              </h3>
            </div>
            <p className="text-xs mb-2" style={{ color: "#9ca3af" }}>
              Direct reservations, zero commission
            </p>
            <div
              className="flex items-center gap-1 text-xs"
              style={{ color: "#93c5fd" }}
            >
              <DollarSign className="w-3 h-3" />
              <span>Direct revenue, no OTA fees</span>
            </div>
          </div>
        </div>

        {/* Revenue Impact - Compact Horizontal */}
        <div
          className="relative rounded-xl p-5 mb-5 overflow-hidden"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(247, 150, 39, 0.2)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background: "linear-gradient(to right, #f79627, #ef5626)",
            }}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" style={{ color: "#f79627" }} />
              <h2 className="text-lg font-bold" style={{ color: "#edecee" }}>
                Revenue Impact
              </h2>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <div
                  className="text-2xl font-black"
                  style={{
                    background: "linear-gradient(to right, #f79627, #ef5626)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  100%
                </div>
                <p className="text-xs" style={{ color: "#9ca3af" }}>
                  Call Capture
                </p>
              </div>
              <div className="text-center">
                <div
                  className="text-2xl font-black"
                  style={{
                    background: "linear-gradient(to right, #f79627, #ef5626)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  15-20%
                </div>
                <p className="text-xs" style={{ color: "#9ca3af" }}>
                  OTA Savings
                </p>
              </div>
              <div className="text-center">
                <div
                  className="text-2xl font-black"
                  style={{
                    background: "linear-gradient(to right, #f79627, #ef5626)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  24/7
                </div>
                <p className="text-xs" style={{ color: "#9ca3af" }}>
                  Availability
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits - Single Row */}
        <div className="flex justify-center gap-2 mb-5">
          {[
            "Capture missed calls",
            "Reduce staff workload",
            "Increase direct bookings",
            "Eliminate OTA fees",
            "Personalized experience",
          ].map((benefit, i) => (
            <div
              key={i}
              className="rounded-full px-3 py-1 text-xs"
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(55, 65, 81, 0.4)",
                color: "#d1d5db",
              }}
            >
              <span style={{ color: "#f79627" }}>&#10003;</span> {benefit}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            className="px-8 py-2.5 rounded-lg font-semibold text-sm"
            style={{
              background: "linear-gradient(to right, #f79627, #ef5626)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(247, 150, 39, 0.3)",
            }}
          >
            Get Started with vGuest
          </button>
        </div>
      </div>
    </div>
  );
}
