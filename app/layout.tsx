import { Geist, Geist_Mono } from "next/font/google"
import AppHeader from "@/components/app-header"
import "@/components/css/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import NextTopLoader from "nextjs-toploader"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/toast"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>
          <Toaster />
          <TooltipProvider>
            <NextTopLoader
              crawlSpeed={50}
              crawl={false}
              initialPosition={0.99}
              easing="ease-in"
              height={2.3}
              color="#990000"
              speed={50}
            />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
