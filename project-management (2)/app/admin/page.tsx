"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  Edit,
  FileText,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Send,
  User,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Mock project data
const projectsData = [
  {
    id: "proj-123",
    name: "Website Redesign",
    client: "Acme Corp",
    clientEmail: "contact@acmecorp.com",
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
    comments: [
      { id: 1, user: "John Doe", text: "Client requested additional revisions for the homepage", date: "2024-04-04" },
      { id: 2, user: "Jane Smith", text: "Waiting for signature on the contract", date: "2024-04-05" },
    ],
    isLate: false,
  },
  {
    id: "proj-456",
    name: "Mobile App Development",
    client: "TechStart Inc",
    clientEmail: "info@techstart.com",
    startDate: "2024-03-15",
    currentStage: 5,
    stages: [
      { id: 1, name: "First Meeting", status: "completed", date: "2024-03-15" },
      { id: 2, name: "Quote Sent", status: "completed", date: "2024-03-17" },
      { id: 3, name: "Signature", status: "completed", date: "2024-03-20" },
      { id: 4, name: "File Upload", status: "completed", date: "2024-03-25" },
      {
        id: 5,
        name: "Logo/Branding",
        status: "in-progress",
        date: "2024-03-28",
        feedbackRounds: 2,
        maxFeedbackRounds: 3,
        feedbackDeadline: "2024-04-10",
      },
      { id: 6, name: "Figma Preview", status: "locked", date: null },
      { id: 7, name: "Final Validation", status: "locked", date: null },
      { id: 8, name: "Development", status: "locked", date: null },
      { id: 9, name: "Bug Report", status: "locked", date: null },
      { id: 10, name: "Final Payment", status: "locked", date: null },
      { id: 11, name: "Site Deployment", status: "locked", date: null },
    ],
    comments: [
      { id: 1, user: "Alex Johnson", text: "Client has provided all necessary assets", date: "2024-03-26" },
      { id: 2, user: "Sarah Williams", text: "Second round of feedback received for logo designs", date: "2024-04-02" },
    ],
    isLate: true,
    lateReason: "Client feedback deadline approaching",
  },
  {
    id: "proj-789",
    name: "E-commerce Platform",
    client: "Fashion Boutique",
    clientEmail: "hello@fashionboutique.com",
    startDate: "2024-02-20",
    currentStage: 8,
    stages: [
      { id: 1, name: "First Meeting", status: "completed", date: "2024-02-20" },
      { id: 2, name: "Quote Sent", status: "completed", date: "2024-02-22" },
      { id: 3, name: "Signature", status: "completed", date: "2024-02-25" },
      { id: 4, name: "File Upload", status: "completed", date: "2024-03-01" },
      {
        id: 5,
        name: "Logo/Branding",
        status: "completed",
        date: "2024-03-10",
        feedbackRounds: 3,
        maxFeedbackRounds: 3,
        feedbackDeadline: "2024-03-15",
      },
      { id: 6, name: "Figma Preview", status: "completed", date: "2024-03-20" },
      { id: 7, name: "Final Validation", status: "completed", date: "2024-03-25" },
      { id: 8, name: "Development", status: "in-progress", date: "2024-03-28" },
      { id: 9, name: "Bug Report", status: "locked", date: null },
      { id: 10, name: "Final Payment", status: "locked", date: null },
      { id: 11, name: "Site Deployment", status: "locked", date: null },
    ],
    comments: [
      {
        id: 1,
        user: "Michael Brown",
        text: "Development started, estimated completion in 2 weeks",
        date: "2024-03-28",
      },
      {
        id: 2,
        user: "Emily Davis",
        text: "Client has requested additional product category pages",
        date: "2024-04-01",
      },
    ],
    isLate: false,
  },
]

export default function AdminDashboard() {
  const [projects, setProjects] = useState(projectsData)
  const [selectedProject, setSelectedProject] = useState(null)
  const [newComment, setNewComment] = useState("")

  // Group projects by stage
  const projectsByStage = {}

  projects.forEach((project) => {
    const currentStageObj = project.stages.find((stage) => stage.id === project.currentStage)
    const stageName = currentStageObj ? currentStageObj.name : "Unknown"

    if (!projectsByStage[stageName]) {
      projectsByStage[stageName] = []
    }

    projectsByStage[stageName].push(project)
  })

  const handleSelectProject = (project) => {
    setSelectedProject(project)
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedProject) return

    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          comments: [
            ...project.comments,
            {
              id: project.comments.length + 1,
              user: "Admin User",
              text: newComment,
              date: new Date().toISOString().split("T")[0],
            },
          ],
        }
      }
      return project
    })

    setProjects(updatedProjects)
    setSelectedProject(updatedProjects.find((p) => p.id === selectedProject.id))
    setNewComment("")
  }

  const handleCompleteStage = () => {
    if (!selectedProject) return

    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProject.id) {
        const nextStageId = project.currentStage + 1
        const updatedStages = project.stages.map((stage) => {
          if (stage.id === project.currentStage) {
            return { ...stage, status: "completed", date: new Date().toISOString().split("T")[0] }
          }
          if (stage.id === nextStageId) {
            return { ...stage, status: "in-progress", date: new Date().toISOString().split("T")[0] }
          }
          return stage
        })

        return {
          ...project,
          currentStage: nextStageId,
          stages: updatedStages,
        }
      }
      return project
    })

    setProjects(updatedProjects)
    setSelectedProject(updatedProjects.find((p) => p.id === selectedProject.id))
  }

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
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Admin" />
              <AvatarFallback className="bg-brand-blue text-white">AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-brand-dark">Admin Dashboard</h1>
                <p className="text-gray-500">Manage all client projects and track progress</p>
              </div>
              <Button className="bg-brand-yellow text-brand-dark hover:bg-brand-yellow/90">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>

            {/* Alerts for late projects */}
            {projects.some((p) => p.isLate) && (
              <Alert className="border-brand-pink bg-brand-pink/10">
                <AlertCircle className="h-4 w-4 text-brand-pink" />
                <AlertTitle className="text-brand-dark">Attention Required</AlertTitle>
                <AlertDescription className="text-gray-600">
                  {projects.filter((p) => p.isLate).length} project(s) require immediate attention due to approaching
                  deadlines.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Kanban Board */}
              <div className="lg:col-span-2">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-brand-dark">Project Kanban</CardTitle>
                      <Button size="sm" className="bg-brand-yellow text-brand-dark hover:bg-brand-yellow/90">
                        <Plus className="mr-2 h-3 w-3" />
                        Add Project
                      </Button>
                    </div>
                    <CardDescription>View all projects by their current stage</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {Object.keys(projectsByStage).map((stageName) => (
                        <div key={stageName} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-brand-dark">{stageName}</h3>
                            <Badge variant="outline" className="bg-gray-50 text-brand-dark border-gray-200">
                              {projectsByStage[stageName].length}
                            </Badge>
                          </div>
                          <div className="space-y-3">
                            {projectsByStage[stageName].map((project) => (
                              <div
                                key={project.id}
                                className={`cursor-pointer rounded-md border p-3 transition-all duration-200 hover:shadow-md ${
                                  selectedProject?.id === project.id
                                    ? "border-brand-blue bg-brand-blue/5"
                                    : "border-gray-200"
                                } ${project.isLate ? "border-brand-pink bg-brand-pink/5" : ""}`}
                                onClick={() => handleSelectProject(project)}
                              >
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-brand-dark">{project.name}</h4>
                                  {project.isLate && (
                                    <Badge className="ml-2 bg-brand-pink text-brand-dark">
                                      <Clock className="mr-1 h-3 w-3" />
                                      Late
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500">{project.client}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Project Details */}
              <div>
                {selectedProject ? (
                  <Card className="border border-gray-200 shadow-sm">
                    <CardHeader className="pb-2 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-brand-dark">{selectedProject.name}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand-dark">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="border-gray-200">
                            <DropdownMenuLabel className="text-brand-dark">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-100" />
                            <DropdownMenuItem className="text-gray-700 focus:text-brand-dark focus:bg-gray-50">
                              <Edit className="mr-2 h-4 w-4 text-brand-blue" />
                              Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-700 focus:text-brand-dark focus:bg-gray-50">
                              <Send className="mr-2 h-4 w-4 text-brand-blue" />
                              Email Client
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        Client: {selectedProject.client} • Started:{" "}
                        {new Date(selectedProject.startDate).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <Tabs defaultValue="details" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                          <TabsTrigger
                            value="details"
                            className="data-[state=active]:bg-white data-[state=active]:text-brand-dark data-[state=active]:shadow-sm"
                          >
                            Details
                          </TabsTrigger>
                          <TabsTrigger
                            value="stages"
                            className="data-[state=active]:bg-white data-[state=active]:text-brand-dark data-[state=active]:shadow-sm"
                          >
                            Stages
                          </TabsTrigger>
                          <TabsTrigger
                            value="comments"
                            className="data-[state=active]:bg-white data-[state=active]:text-brand-dark data-[state=active]:shadow-sm"
                          >
                            Comments
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-brand-dark">Client Information</h4>
                            <div className="rounded-md bg-gray-50 p-3">
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-brand-blue" />
                                <span className="text-sm text-gray-700">{selectedProject.client}</span>
                              </div>
                              <div className="mt-1 flex items-center space-x-2">
                                <MessageSquare className="h-4 w-4 text-brand-blue" />
                                <span className="text-sm text-gray-700">{selectedProject.clientEmail}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-brand-dark">Current Stage</h4>
                            <div className="rounded-md bg-gray-50 p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                  {selectedProject.stages.find((s) => s.id === selectedProject.currentStage)?.name}
                                </span>
                                <Badge
                                  className={
                                    selectedProject.stages.find((s) => s.id === selectedProject.currentStage)
                                      ?.status === "completed"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : selectedProject.stages.find((s) => s.id === selectedProject.currentStage)
                                            ?.status === "in-progress"
                                        ? "bg-brand-yellow/20 text-brand-dark hover:bg-brand-yellow/30"
                                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                  }
                                >
                                  {selectedProject.stages.find((s) => s.id === selectedProject.currentStage)?.status}
                                </Badge>
                              </div>
                              {selectedProject.stages.find((s) => s.id === selectedProject.currentStage)?.date && (
                                <p className="mt-1 text-xs text-gray-500">
                                  Since{" "}
                                  {new Date(
                                    selectedProject.stages.find((s) => s.id === selectedProject.currentStage)?.date,
                                  ).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-brand-dark">Actions</h4>
                            <div className="flex flex-col space-y-2">
                              <Button
                                onClick={handleCompleteStage}
                                className="bg-brand-yellow text-brand-dark hover:bg-brand-yellow/90"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Complete Current Stage
                              </Button>
                              <Button
                                variant="outline"
                                className="border-brand-blue text-brand-blue hover:bg-brand-blue/10"
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                Upload Documents
                              </Button>
                              <Button
                                variant="outline"
                                className="border-brand-blue text-brand-blue hover:bg-brand-blue/10"
                              >
                                <Send className="mr-2 h-4 w-4" />
                                Send Email to Client
                              </Button>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="stages" className="space-y-4 pt-4">
                          <div className="space-y-4">
                            {selectedProject.stages.map((stage) => (
                              <div key={stage.id} className="flex items-center space-x-4">
                                <div
                                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                    stage.status === "completed"
                                      ? "bg-green-100 text-green-600"
                                      : stage.status === "in-progress"
                                        ? "bg-brand-yellow/20 text-brand-dark"
                                        : "bg-gray-100 text-gray-400"
                                  }`}
                                >
                                  {stage.id}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium text-brand-dark">{stage.name}</h4>
                                    <Badge
                                      variant={
                                        stage.status === "completed"
                                          ? "default"
                                          : stage.status === "in-progress"
                                            ? "secondary"
                                            : "outline"
                                      }
                                      className={
                                        stage.status === "completed"
                                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                                          : stage.status === "in-progress"
                                            ? "bg-brand-yellow/20 text-brand-dark hover:bg-brand-yellow/30"
                                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                      }
                                    >
                                      {stage.status}
                                    </Badge>
                                  </div>
                                  {stage.date && (
                                    <p className="text-xs text-gray-500">
                                      {stage.status === "completed" ? "Completed on " : "Started on "}
                                      {new Date(stage.date).toLocaleDateString()}
                                    </p>
                                  )}
                                  {stage.feedbackRounds !== undefined && (
                                    <p className="text-xs text-gray-500">
                                      Feedback rounds: {stage.feedbackRounds}/{stage.maxFeedbackRounds}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="comments" className="space-y-4 pt-4">
                          <div className="space-y-4">
                            {selectedProject.comments.map((comment) => (
                              <div key={comment.id} className="rounded-md bg-gray-50 p-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium text-brand-dark">{comment.user}</h4>
                                  <span className="text-xs text-gray-500">
                                    {new Date(comment.date).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-700">{comment.text}</p>
                              </div>
                            ))}

                            <div className="flex items-center space-x-2">
                              <Textarea
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="min-h-[80px] border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20"
                              />
                            </div>
                            <Button
                              onClick={handleAddComment}
                              className="w-full bg-brand-yellow text-brand-dark hover:bg-brand-yellow/90"
                            >
                              Add Comment
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border border-gray-200 shadow-sm">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="text-brand-dark">Project Details</CardTitle>
                      <CardDescription>Select a project to view details</CardDescription>
                    </CardHeader>
                    <CardContent className="flex h-[400px] items-center justify-center">
                      <p className="text-center text-gray-500">No project selected</p>
                    </CardContent>
                  </Card>
                )}
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
        </div>
      </footer>
    </div>
  )
}
