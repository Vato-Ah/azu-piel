//el cliente de autenticación es este 
//tengo dos clientes con propósitos distintos. lib/supabase.ts es el cliente de datos (lecturas de productos en el servidor)
//y lib/supabase/client.ts es el cliente de sesión (registro, login, logout en el navegador)
import { createBrowserClient } from "@supabase/ssr";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
  }
  return browserClient;
}