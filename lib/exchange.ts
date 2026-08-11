interface ExchangeRates {
  result: string;
  base_code: string;
  rates: Record<string, number>;
  time_last_update_utc: string;
}

export async function getExchangeRates(): Promise<ExchangeRates | null> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return null;
    }

    const data: ExchangeRates = await res.json();

    if (data.result !== "success" || !data.rates) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}