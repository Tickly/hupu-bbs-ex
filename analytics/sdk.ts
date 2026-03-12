// src/analytics/sdk.ts
export type AnalyticsClientOptions = {
  endpoint: string; // e.g. https://hupu-bbs-ex-analytics.vercel.app/api/active
  appId: string;    // e.g. hupu-bbs-ex
  apiKey: string;   // will be extractable in extension
  version: string;  // e.g. chrome.runtime.getManifest().version
  storage?: Pick<typeof chrome.storage.local, "get" | "set">; // for testing
};

export type ReportActiveResult =
  | { ok: true; day: string; skipped: boolean }
  | { ok: false; day: string; status: number };

export function createAnalyticsClient(opts: AnalyticsClientOptions) {
  const endpoint = opts.endpoint;
  const appId = opts.appId;
  const apiKey = opts.apiKey;
  const version = opts.version;
  const storage = opts.storage ?? chrome.storage.local;

  if (!endpoint || !appId || !apiKey || !version) {
    throw new Error("endpoint/appId/apiKey/version required");
  }

  const KEY_CLIENT_ID = "analytics_client_id";
  const KEY_LAST_DAY = `analytics_last_report_day:${appId}`;

  function getShanghaiDay(ts = Date.now()) {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date(ts));

    const map: Record<string, string> = {};
    for (const p of parts) if (p.type !== "literal") map[p.type] = p.value;
    return `${map.year}${map.month}${map.day}`; // YYYYMMDD
  }

  async function getOne<T>(key: string): Promise<T | undefined> {
    const r = await storage.get(key);
    return (r as any)[key] as T | undefined;
  }

  async function setOne(key: string, value: unknown) {
    await storage.set({ [key]: value } as any);
  }

  async function getOrCreateClientId() {
    const existing = await getOne<string>(KEY_CLIENT_ID);
    if (existing) return existing;
    const uuid = crypto.randomUUID();
    await setOne(KEY_CLIENT_ID, uuid);
    return uuid;
  }

  async function reportActive(): Promise<
    ReportActiveResult
  > {
    const day = getShanghaiDay();
    const last = await getOne<string>(KEY_LAST_DAY);
    if (last === day) return { ok: true, day, skipped: true };

    const clientId = await getOrCreateClientId();

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        app_id: appId,
        client_id: clientId,
        version,
        ts: Date.now(),
      }),
    });

    if (!res.ok) return { ok: false, day, status: res.status };

    await setOne(KEY_LAST_DAY, day);
    return { ok: true, day, skipped: false };
  }

  return { reportActive };
}

export function createAnalyticsProxyClient() {
  async function reportActive(): Promise<ReportActiveResult | undefined> {
    try {
      const r = (await chrome.runtime.sendMessage({
        type: 'analytics/reportActive',
      })) as ReportActiveResult | undefined;
      return r;
    } catch {
      return undefined;
    }
  }

  return { reportActive };
}

export const analyticsProxyClient = createAnalyticsProxyClient();