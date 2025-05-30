import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 w-full bg-brand-dark text-white">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">ProjectFlow</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/features" className="transition-colors hover:text-brand-yellow">
                Features
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-brand-yellow">
                Pricing
              </Link>
              <Link href="/about" className="transition-colors hover:text-brand-yellow">
                About
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center">
              <Link href="/login" className="px-4">
                <Button variant="ghost" size="sm" className="text-white hover:text-brand-yellow hover:bg-transparent">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-brand-yellow text-brand-dark hover:bg-brand-yellow/90">
                  Sign up
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-brand-dark sm:text-5xl xl:text-6xl/none">
                    Streamline Your Project Management
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Track progress, manage feedback, and deliver projects on time with our comprehensive project
                    management solution.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/client">
                    <Button className="bg-brand-yellow text-brand-dark hover:bg-brand-yellow/90">
                      Client Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/admin">
                    <Button
                      variant="outline"
                      className="border-brand-blue text-brand-blue hover:bg-brand-blue/10 hover:text-brand-blue"
                    >
                      Admin Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mx-auto w-full max-w-[500px] overflow-hidden rounded-xl border bg-white shadow-xl">
                  <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-100">
                    <h3 className="font-semibold leading-none tracking-tight text-brand-dark">Project Progress</h3>
                    <p className="text-sm text-gray-500">Track your project from start to finish</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-brand-dark">First Meeting</div>
                          <div className="text-sm text-gray-500">Completed</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div className="h-full w-full rounded-full bg-brand-yellow"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-brand-dark">Quote Sent</div>
                          <div className="text-sm text-gray-500">Completed</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div className="h-full w-full rounded-full bg-brand-yellow"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-brand-dark">Signature</div>
                          <div className="text-sm text-gray-500">In Progress</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div className="h-full w-1/2 rounded-full bg-brand-yellow"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-brand-dark">File Upload</div>
                          <div className="text-sm text-gray-500">Locked</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div className="h-full w-0 rounded-full bg-brand-yellow"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0 bg-gray-50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2024 ProjectFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
