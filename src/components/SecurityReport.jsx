import {
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Cookie,
  Code,
  Lock,
} from "lucide-react";

const mockData = {
  url: "https://nextjs.org/docs/pages/getting-started/deploying",
  isHttps: true,
  mixedContent: false,
  privacyPolicyLink: "https://vercel.com/legal/privacy-policy",
  cookies: [
    "next-docs-version=canary",
    "ko_id=e0a90150-4c76-423e-bb36-3d9977a177c2",
    "next-docs-search-router-type=app",
    "_hp2_id.3987253934=%7B%22userId%22%3A%224445498400…y%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D",
    "_hp2_ses_props.3987253934=%7B%22r%22%3A%22https%3A…Fdocs%2Fpages%2Fgetting-started%2Fdeploying%22%7D",
    "ko_sid={%22id%22:%221752667724534%22%2C%22lastTouched%22:1752668413427}",
  ],
  scripts: [
    "https://nextjs.org/_stream/external/cdn.heapanalytics.com/js/heap-3987253934.js",
    "https://nextjs.org/_next/static/chunks/53ab72e4-79…7b8716e2e.js",
    "https://nextjs.org/_next/static/chunks/8108-fc994f6693d79e6a.js",
    "https://nextjs.org/_next/static/chunks/main-app-48…938bc7510.js",
    "https://nextjs.org/_vercel/insights/script.js",
    "https://nextjs.org/_vercel/speed-insights/script.js",
    // ... truncated for display
  ],
  securityHeaders: {
    csp: null,
    hsts: "max-age=63072000",
    xfo: null,
    xcto: null,
  },
  type: "SECURITY_SCAN_RESULT",
};

function getSecurityScore(data) {
  let score = 0;

  // HTTPS check (25 points)
  if (data.isHttps) score += 25;

  // Mixed content check (15 points)
  if (!data.mixedContent) score += 15;

  // Security headers (40 points total)
  if (data.securityHeaders.hsts) score += 15;
  if (data.securityHeaders.csp) score += 15;
  if (data.securityHeaders.xfo) score += 5;
  if (data.securityHeaders.xcto) score += 5;

  // Privacy policy (10 points)
  if (data.privacyPolicyLink) score += 10;

  // Cookie count penalty
  if (data.cookies.length > 5) score -= 5;

  let grade = "F";
  let color = "red";

  if (score >= 90) {
    grade = "A+";
    color = "green";
  } else if (score >= 80) {
    grade = "A";
    color = "green";
  } else if (score >= 70) {
    grade = "B";
    color = "yellow";
  } else if (score >= 60) {
    grade = "C";
    color = "orange";
  } else {
    grade = "D";
    color = "red";
  }

  return { score, grade, color };
}

export default function SecurityReport({ report }) {
  const data = report;
  const { score, grade, color } = getSecurityScore(data);
  const timestamp = new Date();

  const getScriptDomains = (scripts) => {
    const domains = new Set();
    scripts.forEach((script) => {
      try {
        const url = new URL(script);
        domains.add(url.hostname);
      } catch (e) {
        // Invalid URL, skip
        console.warn(`Invalid script URL: ${script}`, e);
      }
    });
    return Array.from(domains);
  };

  const scriptDomains = getScriptDomains(data.scripts);

  if (!data || !data.url) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">No security report data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto space-y-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Security Analysis Report
              </h1>
              <p className="text-slate-300 text-sm break-all">{data.url}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-300 text-sm flex items-center gap-1 justify-end">
              <Clock className="w-4 h-4" />
              {timestamp.toLocaleString()}
            </p>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 mt-2">
              {data.type?.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* Security Score */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-slate-600/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-1">
                Overall Security Score
              </h3>
              <p className="text-slate-300 text-sm">
                Based on security best practices
              </p>
            </div>
            <div className="text-right">
              <div
                className={`text-4xl font-bold mb-1 ${
                  color === "green"
                    ? "text-green-400"
                    : color === "yellow"
                    ? "text-yellow-400"
                    : color === "orange"
                    ? "text-orange-400"
                    : "text-red-400"
                }`}
              >
                {grade}
              </div>
              <div className="text-slate-300 text-sm">{score}/100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Security */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-green-400" />
          <h2 className="text-xl font-semibold text-white">
            Connection Security
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">HTTPS Enabled</span>
              {data.isHttps ? (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Yes</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-400">
                  <XCircle className="w-4 h-4" />
                  <span className="font-medium">No</span>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Mixed Content</span>
              {!data.mixedContent ? (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">None</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">Detected</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Security Headers */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Security Headers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data.securityHeaders).map(([header, value]) => (
            <div key={header} className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 font-medium uppercase text-sm">
                  {header}
                </span>
                {value ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
              </div>
              {value ? (
                <p className="text-xs text-slate-400 font-mono break-all">
                  {value}
                </p>
              ) : (
                <p className="text-xs text-red-300">Not configured</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scripts Analysis */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-5 h-5 text-orange-400" />
          <h2 className="text-xl font-semibold text-white">Scripts Analysis</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">
                {data.scripts.length}
              </div>
              <div className="text-slate-300 text-sm">Total Scripts</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {scriptDomains.length}
              </div>
              <div className="text-slate-300 text-sm">Unique Domains</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {
                  scriptDomains.filter(
                    (d) => d.includes("nextjs.org") || d.includes("vercel.com")
                  ).length
                }
              </div>
              <div className="text-slate-300 text-sm">Trusted Sources</div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-white font-medium mb-3">Script Domains</h3>
            <div className="flex flex-wrap gap-2">
              {scriptDomains.map((domain, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    domain.includes("nextjs.org") ||
                    domain.includes("vercel.com")
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : domain.includes("heapanalytics.com") ||
                        domain.includes("koala.live")
                      ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                      : "bg-slate-500/20 text-slate-300 border border-slate-500/30"
                  }`}
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cookies */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Cookie className="w-5 h-5 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">Cookies Analysis</h2>
        </div>
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-300">Total Cookies</span>
              <span className="text-yellow-400 font-bold text-lg">
                {data.cookies.length}
              </span>
            </div>
            <div className="space-y-2">
              {data.cookies.slice(0, 3).map((cookie, index) => (
                <div key={index} className="bg-slate-800/50 rounded-lg p-2">
                  <p className="text-slate-300 text-xs font-mono break-all">
                    {cookie.length > 60
                      ? `${cookie.substring(0, 60)}...`
                      : cookie}
                  </p>
                </div>
              ))}
              {data.cookies.length > 3 && (
                <div className="text-center">
                  <span className="text-slate-400 text-sm">
                    +{data.cookies.length - 3} more cookies
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-yellow-300 text-sm font-medium mb-1">
                  Privacy Notice
                </p>
                <p className="text-yellow-200 text-xs">
                  Analytics cookies detected. Ensure proper consent mechanisms
                  are in place for GDPR compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Privacy Policy</h2>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Privacy Policy Link</span>
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <a
            href={data.privacyPolicyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm underline break-all mt-2 block"
          >
            {data.privacyPolicyLink}
          </a>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
          <h2 className="text-xl font-semibold text-white">
            Security Recommendations
          </h2>
        </div>
        <div className="space-y-3">
          {!data.securityHeaders.csp && (
            <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-300 font-medium text-sm">
                  Missing Content Security Policy
                </p>
                <p className="text-red-200 text-xs">
                  Implement CSP headers to prevent XSS attacks and unauthorized
                  script execution.
                </p>
              </div>
            </div>
          )}
          {!data.securityHeaders.xfo && (
            <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-yellow-300 font-medium text-sm">
                  Missing X-Frame-Options
                </p>
                <p className="text-yellow-200 text-xs">
                  Add X-Frame-Options header to prevent clickjacking attacks.
                </p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-green-300 font-medium text-sm">
                HTTPS Properly Configured
              </p>
              <p className="text-green-200 text-xs">
                Excellent! HTTPS is enabled with HSTS for enhanced security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
