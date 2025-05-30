"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  LockIcon,
  MessageSquare,
  UnlockIcon,
  Upload,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Mock project data
const projectData = {
  id: "proj-123",
  name: "Website Redesign",
  client: "Acme Corp",
  startDate: "2024-04-01",
  currentStage: 3,
  stages: [
    { id: 1, name: "First Meeting", status: "completed", date: "2024-04-01" },
    { id: 2, name: "Quote Sent", status: "completed", date: "2024-04-03" },
    { id: 3, name: "Signature", status: "in-progress", date: "2024-04-05" },
    { id: 4, name: "File Upload", status: "locked", date: null },
    {
      id: 5,
      name: "Logo/Branding",
      status: "locked",
      date: null,
      feedbackRounds: 0,
      maxFeedbackRounds: 3,
      feedbackDeadline: "2024-04-20",
    },
    { id: 6, name: "Figma Preview", status: "locked", date: null },
    { id: 7, name: "Final Validation", status: "locked", date: null },
    { id: 8, name: "Development", status: "locked", date: null },
    { id: 9, name: "Bug Report", status: "locked", date: null },
    { id: 10, name: "Final Payment", status: "locked", date: null },
    { id: 11, name: "Site Deployment", status: "locked", date: null },
  ],
}

export default function ClientDashboard() {
  const [project, setProject] = useState(projectData)

  // Calculate overall progress
  const completedStages = project.stages.filter((stage) => stage.status === "completed").length
  const totalStages = project.stages.length
  const progressPercentage = Math.round((completedStages / totalStages) * 100)

  // Get current stage
  const currentStage = project.stages.find((stage) => stage.id === project.currentStage)

  // Check for upcoming deadlines
  const upcomingDeadlines = project.stages
    .filter((stage) => stage.feedbackDeadline && new Date(stage.feedbackDeadline) > new Date())
    .sort((a, b) => new Date(a.feedbackDeadline).getTime() - new Date(b.feedbackDeadline).getTime())

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 w-full bg-brand-dark text-white">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center text-white hover:text-brand-yellow">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:text-brand-yellow hover:bg-transparent">
              Help
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-brand-yellow hover:bg-transparent">
              Settings
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-brand-dark">{project.name}</h1>
              <p className="text-gray-500">
                Project for {project.client} • Started on {new Date(project.startDate).toLocaleDateString()}
              </p>
            </div>

            {/* Overall Progress */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-brand-dark">Overall Progress</CardTitle>
                <CardDescription>
                  {completedStages} of {totalStages} stages completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-brand-yellow" />
                <div className="mt-2 text-sm text-gray-500">{progressPercentage}% complete</div>
              </CardContent>
            </Card>

            {/* Alerts for upcoming deadlines */}
            {upcomingDeadlines.length > 0 && (
              <Alert className="border-brand-pink bg-brand-pink/10">
                <AlertCircle className="h-4 w-4 text-brand-pink" />
                <AlertTitle className="text-brand-dark">Upcoming Deadline</AlertTitle>
                <AlertDescription className="text-gray-600">
                  You have {upcomingDeadlines.length} upcoming deadline(s). The next one is for{" "}
                  {upcomingDeadlines[0].name} on {new Date(upcomingDeadlines[0].feedbackDeadline).toLocaleDateString()}.
                </AlertDescription>
              </Alert>
            )}

            {/* Project Stages */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold tracking-tight text-brand-dark">Project Stages</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {project.stages.map((stage) => (
                  <Card
                    key={stage.id}
                    className={`border border-gray-200 shadow-sm transition-all duration-200 ${
                      stage.status === "locked" ? "opacity-70" : ""
                    } ${stage.status === "in-progress" ? "ring-2 ring-brand-yellow/50" : ""}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-brand-dark">{stage.name}</CardTitle>
                        {stage.status === "locked" ? (
                          <LockIcon className="h-4 w-4 text-gray-400" />
                        ) : stage.status === "completed" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <UnlockIcon className="h-4 w-4 text-brand-blue" />
                        )}
                      </div>
                      <CardDescription>
                        {stage.status === "completed" ? (
                          <>Completed on {new Date(stage.date).toLocaleDateString()}</>
                        ) : stage.status === "in-progress" ? (
                          <>In progress since {new Date(stage.date).toLocaleDateString()}</>
                        ) : (
                          <>Locked</>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {stage.id === 4 && stage.status === "in-progress" && (
                        <div className="rounded-md border border-dashed border-gray-300 p-6 text-center">
                          <Upload className="mx-auto h-6 w-6 text-gray-400" />
                          <p className="mt-2 text-sm font-medium text-brand-dark">Drop files here or click to upload</p>
                          <p className="mt-1 text-xs text-gray-500">PDF, DOC, JPG, PNG up to 10MB</p>
                        </div>
                      )}

                      {stage.id === 5 && stage.status === "in-progress" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-brand-dark">Feedback Rounds</span>
                            <span className="text-sm font-medium text-brand-dark">
                              {stage.feedbackRounds} / {stage.maxFeedbackRounds}
                            </span>
                          </div>
                          <Progress
                            value={(stage.feedbackRounds / stage.maxFeedbackRounds) * 100}
                            className="h-2 bg-gray-100"
                            indicatorClassName="bg-brand-yellow"
                          />
                          <p className="text-xs text-gray-500">
                            <Calendar className="mr-1 inline h-3 w-3" />
                            Deadline: {new Date(stage.feedbackDeadline).toLocaleDateString()}
                          </p>
                        </div>
                      )}

                      {stage.id === 6 && stage.status === "in-progress" && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            <FileText className="mr-1 inline h-4 w-4 text-brand-blue" />
                            Figma preview link will be sent to your email automatically
                          </p>
                        </div>
                      )}

                      {stage.id === 8 && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            <Clock className="mr-1 inline h-4 w-4 text-brand-blue" />
                            Development in progress (read-only)
                          </p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      {stage.status === "in-progress" && stage.id !== 8 && (
                        <Button
                          className="w-full bg-brand-yellow text-brand-dark hover:bg-brand-yellow/90"
                          disabled={stage.id === 8}
                        >
                          {stage.id === 3
                            ? "Sign Document"
                            : stage.id === 4
                              ? "Upload Files"
                              : stage.id === 5
                                ? "Submit Feedback"
                                : stage.id === 6
                                  ? "Review Preview"
                                  : stage.id === 7
                                    ? "Schedule Call"
                                    : stage.id === 9
                                      ? "Report Bug"
                                      : stage.id === 10
                                        ? "Make Payment"
                                        : "Complete Stage"}
                        </Button>
                      )}
                      {stage.status === "completed" && (
                        <Button
                          variant="outline"
                          className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue/10"
                        >
                          View Details
                        </Button>
                      )}
                      {stage.status === "locked" && (
                        <Button disabled className="w-full opacity-50">
                          Locked
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 bg-gray-50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2024 ProjectFlow. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-brand-dark hover:text-brand-blue hover:bg-transparent">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
