## Safari behavior

One caveat for iOS Safari: Apple's autoplay policy requires speech synthesis to be triggered within a direct user-gesture call stack. Since the voice fires ~3 seconds after the button tap (after the countdown Promise), it may be silently blocked on iOS. If that's an issue, the fix is to call speechSynthesis.speak(new SpeechSynthesisUtterance('')) immediately when the "Démarrer" button is tapped (to unlock the audio context), then the delayed calls will go through. Let me know if you need that.

## Sync

Why client-only: getSessions() and getAllPoints() call indexedDB.open() — a browser-only global. Next.js server components run in Node.js on the server, where indexedDB doesn't exist. If you tried to call those functions in a server component, you'd get ReferenceError: indexedDB is not defined at build/request time.

Does it have server data? Looking at the actual app: no, not yet — and here's why. Supabase in this codebase is used only for auth. The bat monitoring data (sessions, points, counts) is stored exclusively in IndexedDB on the user's device. The syncedAt: string | null field on SessionData is a hint that server sync is planned but not implemented — there are no Supabase writes for session or point data anywhere in the code.

So the data flow today is entirely:


Field work → IndexedDB (browser) → dashboard reads IndexedDB
What the architecture would look like once sync is implemented:


Field work → IndexedDB → sync job → Supabase
                                        ↓
                              server component reads Supabase
                              and passes it as props down to
                              the client component (which still
                              reads IndexedDB for unsynced data)
At that point, you'd have a hybrid: the page.tsx server component could fetch the synced/historical data from Supabase (fast, no JS needed, SEO-friendly), pass it as props to the dashboard, and the client component would only need IndexedDB for the current unsynced session. The two sources would be merged in the client.

But right now, there's nothing in Supabase to fetch — so forcing the whole thing client-side is the only option, and it's correct.