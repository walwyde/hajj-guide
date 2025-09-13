
// "use client"
// import { useState, useEffect } from "react"
// import { HAJJ_STEPS } from "@/lib/steps"
// import { getStepImage } from "@/lib/step-images"
// import { AnimatedCanvasText } from "@/components/ui/animated-canvas-text"
// import { ReadingProgress } from "@/components/ui/reading-progress"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { CheckCircle, ArrowLeft, BookOpen, Clock, Sparkles, ImageIcon } from "lucide-react"
// import { toast } from "sonner"
// import { useRouter, useParams } from "next/navigation"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"
// import Image from "next/image"

// export default function StepDetail() {
  // const navigate = useRouter()
  // const { stepId } = useParams()

  // const [sectionProgress, setSectionProgress] = useState<Record<string, boolean>>({})
  // const [isCompleted, setIsCompleted] = useState(false)
  // const [allSectionsComplete, setAllSectionComplete] = useState(false)
  // const [quizPassed, setQuizPassed] = useState(false)
  // const [showQuizModal, setShowQuizModal] = useState(false)
  // const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  // const [quizScore, setQuizScore] = useState(0)
  // const [isLoading, setIsLoading] = useState(false)

  // const step = HAJJ_STEPS.find((s) => s.id === String(stepId))

  // useEffect(() => {
  //   if (!step) return

  //   const loadProgress = async () => {
  //     try {
  //       let thisStep;
  //       const response = await fetch("/api/steps");
  //       if (response.ok) {
  //         const data = await response.json();
  //         if (step?.id) {
  //           thisStep = data?.progress?.map((pg : any ) => pg.stepId === step?.id)
  //           setIsCompleted(!!thisStep.progress?.[step.id].completed);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Failed to load progress:", error)
  //       const savedProgress = localStorage.getItem("hajj-progress")
  //       if (savedProgress && step?.id) {
  //         const progress = JSON.parse(savedProgress)
  //         setIsCompleted(!!progress[step.id])
  //         setQuizPassed(!!progress[`${step.id}-quiz`])
  //       }
  //     }
  //   }

  //   loadProgress()
  // }, [step])

  // if (!step) {
  //   return (
  //     <div className="container mx-auto px-4 py-8">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold text-foreground mb-4">Step Not Found</h1>
  //         <p className="text-muted-foreground mb-4">The step with ID "{stepId}" could not be found.</p>
  //         <Button onClick={() => navigate.push("/dashboard")} variant="outline">
  //           <ArrowLeft className="w-4 h-4 mr-2" />
  //           Return to Dashboard
  //         </Button>
  //       </div>
  //     </div>
  //   )
  // }

  // const handleSectionComplete = (section: string) => {
  //   setSectionProgress((prev) => {
  //     const updated = { ...prev, [section]: true }
  //     const completed = Object.keys(updated).length >= 5 && Object.values(updated).every(Boolean)

  //     if (completed) setAllSectionComplete(true)
  //     return updated
  //   })
  // }

  // const handleQuizSubmit = async () => {
  //   if (!step) return

  //   setIsLoading(true)
  //   const quiz = step.content.quiz
  //   let score = 0

  //   quiz.questions.forEach((q, index) => {
  //     const selectedAnswer = Number.parseInt(quizAnswers[index])
  //     if (selectedAnswer === q.correct) {
  //       score++
  //     }
  //   })

  //   const percentage = (score / quiz.questions.length) * 100
  //   setQuizScore(percentage)

  //   if (percentage >= 70) {
  //     try {
  //       const response = await fetch("/api/steps", {
  //         method: "PATCH",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ stepId: `${step.id}-quiz`, quizPassed: true, completed: true }),
  //       })

  //       if (response.ok) {
  //           setQuizPassed(!!`${step.id}-quiz`)
  //         setQuizPassed(true)
  //         toast.success(`Quiz passed! Score: ${percentage.toFixed(0)}%`)
  //         setShowQuizModal(false)
  //         handleMarkCompleted()
  //       } else {
  //         throw new Error("Failed to save quiz progress")
  //       }
  //     } catch (error) {
  //       console.error("Failed to save quiz progress:", error)
  //       toast.error("Failed to save quiz progress")
  //       const savedProgress = localStorage.getItem("hajj-progress")
  //       const progress = savedProgress ? JSON.parse(savedProgress) : {}
  //       progress[`${step.id}-quiz`] = true
  //       localStorage.setItem("hajj-progress", JSON.stringify(progress))
  //       setQuizPassed(true)
  //       toast.success(`Quiz passed! Score: ${percentage.toFixed(0)}%`)
  //       setShowQuizModal(false)
  //       handleMarkCompleted()
  //     }
  //   } else {
  //     toast.error(`Quiz failed. Score: ${percentage.toFixed(0)}%. You need at least 70% to complete this step.`)
  //     setShowQuizModal(false)
  //     setQuizAnswers({})
  //   }

  //   setIsLoading(false)
  // }

  // const handleMarkCompleted = async () => {
  //   if (isLoading || !step) return

  //   setIsLoading(true)
  //   try {
  //     const response = await fetch("/api/steps", {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ stepId: step.id, completed: true }),
  //     })

  //     if (response.ok) {
  //       setIsCompleted(true)
  //       toast.success(`${step.title} marked as completed!`)
  //       navigate.push("/dashboard")
  //     } else {
  //       throw new Error("Failed to save progress")
  //     }
  //   } catch (error) {
  //     console.error("Failed to save progress:", error)
  //     toast.error("Failed to mark step as completed")

  //     const savedProgress = localStorage.getItem("hajj-progress")
  //     const progress = savedProgress ? JSON.parse(savedProgress) : {}
  //     progress[step.id] = true
  //     localStorage.setItem("hajj-progress", JSON.stringify(progress))
  //     setIsCompleted(true)
  //     toast.success(`${step.title} marked as completed! (Saved locally)`)
  //     navigate.push("/dashboard")
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const handleButtonClick = () => {
  //   if (!allSectionsComplete) {
  //     toast.error("Please complete all reading sections first.")
  //     return
  //   }
  //   if (isCompleted || isLoading) {
  //     return
  //   }
  //   if (quizPassed) {
  //     handleMarkCompleted()
  //   } else {
  //     setShowQuizModal(true)
  //   }
  // }

//   const limitedQuizQuestions = step?.content?.quiz?.questions?.slice(0, 5) || []

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
//       <ReadingProgress />

//       <div className="container mx-auto px-4 py-8 pt-20">
//         {/* Header */}
//         <div className="mb-8">
//           <Button onClick={() => navigate.push("/dashboard")} variant="ghost" className="mb-4 hover:bg-accent/50">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Steps
//           </Button>

//           {/* Hero Image */}
//           <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl">
//             <Image
//             width={200}
//             height={200}
//               src={getStepImage(step.id) || "/placeholder.svg"}
//               alt={`Illustration of ${step.title}`}
//               className="w-full h-64 md:h-80 object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//             <div className="absolute bottom-0 left-0 right-0 p-6">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
//                   <Sparkles className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-4xl font-bold text-white mb-2">{step.title}</h1>
//                   <div className="flex items-center gap-4">
//                     <Badge
//                       variant="secondary"
//                       className="text-sm bg-white/20 backdrop-blur-sm text-white border-white/30"
//                     >
//                       <Clock className="w-3 h-3 mr-1" />
//                       {step.day}
//                     </Badge>
//                     {step.mandatory && (
//                       <Badge className="bg-accent/90 text-accent-foreground backdrop-blur-sm">Mandatory</Badge>
//                     )}
//                     {isCompleted && (
//                       <Badge className="bg-green-600/90 text-white backdrop-blur-sm">
//                         <CheckCircle className="w-3 h-3 mr-1" />
//                         Completed
//                       </Badge>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid gap-8 lg:grid-cols-3">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Overview */}
//             <Card className="border-card-border hover:border-accent/30 transition-colors">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-xl">
//                   <BookOpen className="w-5 h-5 text-accent" />
//                   Overview
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="relative rounded-lg overflow-hidden">
//                   <Image
//                   width={200}
//                   height={200}
//                     src={getStepImage(step.id) || "/placeholder.svg"}
//                     alt={`${step.title} illustration`}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="absolute top-2 right-2">
//                     <Badge className="bg-white/90 text-primary backdrop-blur-sm">
//                       <ImageIcon className="w-3 h-3 mr-1" />
//                       Illustration
//                     </Badge>
//                   </div>
//                 </div>
//                 <AnimatedCanvasText
//                   text={step.content.overview}
//                   speed={25}
//                   onComplete={() => {
//                     handleSectionComplete("overview")
//                   }}
//                 />
//               </CardContent>
//             </Card>
//              <div>       
//               <h3 className="text-lg font-semibold mb-2">Audio Narration</h3>
//                  <audio
//                  controls
//                 className="w-full max-w-md"
//                 aria-label={`Narration for ${step.title}`}
//               >
//                 <source src={step.content.audio} type="audio/mpeg" />
//                 Your browser does not support the audio element.
//               </audio>
//             </div>

//             {/* Procedure */}
//             <Card className="border-card-border hover:border-accent/30 transition-colors">
//               <CardHeader>
//                 <CardTitle className="text-xl">Step-by-Step Procedure</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <AnimatedCanvasText
//                   text={step.content.procedure.map((proc, idx) => `${idx + 1}. ${proc}`).join("\n\n")}
//                   speed={40}
//                   onComplete={() => {
//                     handleSectionComplete("procedure")
//                   }}
//                 />
//               </CardContent>
//             </Card>

//             {/* History */}
//             <Card className="border-card-border hover:border-accent/30 transition-colors">
//               <CardHeader>
//                 <CardTitle className="text-xl">Historical Context</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <AnimatedCanvasText
//                   text={step.content.history}
//                   speed={35}
//                   onComplete={() => {
//                     handleSectionComplete("history")
//                   }}
//                 />
//               </CardContent>
//             </Card>

//             {/* Quranic Evidence */}
//             <Card className="border-card-border hover:border-accent/30 transition-colors bg-gradient-to-br from-card to-accent/5">
//               <CardHeader>
//                 <CardTitle className="text-xl text-accent">Evidence from the Quran</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="text-right text-2xl font-arabic leading-relaxed mb-4 p-4 bg-background/50 rounded-lg">
//                   {step.content.quranEvidence.verse}
//                 </div>
//                 <AnimatedCanvasText
//                   text={`Translation: "${step.content.quranEvidence.translation}"\n\nReference: ${step.content.quranEvidence.reference}`}
//                   speed={45}
//                   onComplete={() => handleSectionComplete("quran")}
//                 />
//               </CardContent>
//             </Card>

//             {/* Hadith Evidence */}
//             <Card className="border-card-border hover:border-accent/30 transition-colors bg-gradient-to-br from-card to-secondary/5">
//               <CardHeader>
//                 <CardTitle className="text-xl text-primary">Evidence from Hadith</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <AnimatedCanvasText
//                   text={`"${step.content.hadithEvidence.text}"\n\nNarrated by: ${step.content.hadithEvidence.narrator}\nReference: ${step.content.hadithEvidence.reference}`}
//                   speed={45}
//                   onComplete={() => handleSectionComplete("hadith")}
//                 />
//               </CardContent>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Progress Card */}
//             <Card className="sticky top-24 border-card-border">
//               <CardHeader>
//                 <CardTitle className="text-lg">Your Progress</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   {[
//                     { key: "overview", label: "Overview" },
//                     { key: "procedure", label: "Procedure" },
//                     { key: "history", label: "History" },
//                     { key: "quran", label: "Quranic Evidence" },
//                     { key: "hadith", label: "Hadith Evidence" },
//                   ].map((section) => (
//                     <div key={section.key} className="flex items-center gap-2">
//                       <CheckCircle
//                         className={`w-4 h-4 ${
//                           sectionProgress[section.key] ? "text-green-600" : "text-muted-foreground"
//                         }`}
//                       />
//                       <span
//                         className={`text-sm ${
//                           sectionProgress[section.key] ? "text-green-600 font-medium" : "text-muted-foreground"
//                         }`}
//                       >
//                         {section.label}
//                       </span>
//                     </div>
//                   ))}
//                   <div className="flex items-center gap-2 pt-2 border-t">
//                     <CheckCircle className={`w-4 h-4 ${quizPassed ? "text-green-600" : "text-muted-foreground"}`} />
//                     <span className={`text-sm ${quizPassed ? "text-green-600 font-medium" : "text-muted-foreground"}`}>
//                       Quiz Passed
//                     </span>
//                   </div>
//                 </div>

//                 <Button
//                   onClick={handleButtonClick}
//                   disabled={!allSectionsComplete || isCompleted || isLoading}
//                   className="w-full"
//                   variant={isCompleted ? "secondary" : "default"}
//                 >
//                   {isLoading ? (
//                     "Saving..."
//                   ) : isCompleted ? (
//                     <>
//                       <CheckCircle className="w-4 h-4 mr-2" />
//                       Completed
//                     </>
//                   ) : allSectionsComplete ? (
//                     <>
//                       <CheckCircle className="w-4 h-4 mr-2" />
//                       {quizPassed ? "Mark as Completed" : "Take Quiz to Complete"}
//                     </>
//                   ) : (
//                     "Finish Reading to Complete"
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Quick Info */}
//             <Card className="border-card-border">
//               <CardHeader>
//                 <CardTitle className="text-lg">Quick Info</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Day:</span>
//                   <span className="font-medium">{step.day}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Type:</span>
//                   <span className={`font-medium ${step.mandatory ? "text-accent" : "text-secondary"}`}>
//                     {step.mandatory ? "Mandatory" : "Sunnah"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Reading Time:</span>
//                   <span className="font-medium">~5-7 minutes</span>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Visual Guide */}
//             <Card className="border-card-border">
//               <CardHeader>
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <ImageIcon className="w-4 h-4" />
//                   Visual Guide
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="relative rounded-lg overflow-hidden">
//                   <Image
//                   width={200}
//                   height={200}
//                     src={getStepImage(step.id) || "/placeholder.svg"}
//                     alt={`Visual guide for ${step.title}`}
//                     className="w-full h-32 object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//                   <div className="absolute bottom-2 left-2 right-2">
//                     <p className="text-white text-xs font-medium">Educational illustration of {step.title}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Quiz Modal */}
//       <Dialog open={showQuizModal} onOpenChange={setShowQuizModal}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Quiz: {step?.title}</DialogTitle>
//             <DialogDescription>
//               Answer the following questions to complete this step. You need at least 70% to pass.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 max-h-[60vh]">
//             {limitedQuizQuestions.map((question, index) => (
//               <div key={index} className="space-y-3">
//                 <Label className="text-base font-medium block">
//                   Q{index + 1}: {question.question}
//                 </Label>
//                 <RadioGroup
//                   value={quizAnswers[index] || ""}
//                   onValueChange={(value) => {
//                     setQuizAnswers((prev) => ({ ...prev, [index]: value }))
//                   }}
//                   className="ml-4"
//                 >
//                   {question.options.map((option, optIndex) => (
//                     <RadioGroupItem key={optIndex} value={optIndex.toString()} id={`q${index}-o${optIndex}`}>
//                       <Label htmlFor={`q${index}-o${optIndex}`} className="text-sm cursor-pointer">
//                         {option}
//                       </Label>
//                     </RadioGroupItem>
//                   ))}
//                 </RadioGroup>
//               </div>
//             ))}
//           </div>

//           <DialogFooter>
//             <Button variant="outline" onClick={() => setShowQuizModal(false)} disabled={isLoading}>
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               onClick={handleQuizSubmit}
//               disabled={Object.keys(quizAnswers).length < limitedQuizQuestions.length || isLoading}
//             >
//               {isLoading ? "Submitting..." : "Submit Quiz"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

"use client"
import { useState, useEffect } from "react"
import { HAJJ_STEPS } from "@/lib/steps"
import { getStepImage } from "@/lib/step-images"
import { AnimatedCanvasText } from "@/components/ui/animated-canvas-text"
import { ReadingProgress } from "@/components/ui/reading-progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowLeft, BookOpen, Clock, Sparkles, ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { useRouter, useParams } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function StepDetail() {
    const navigate = useRouter()
  const { stepId } = useParams()

  const [sectionProgress, setSectionProgress] = useState<Record<string, boolean>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [allSectionsComplete, setAllSectionComplete] = useState(false)
  const [quizPassed, setQuizPassed] = useState(false)
  const [showQuizModal, setShowQuizModal] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [quizScore, setQuizScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const step = HAJJ_STEPS.find((s) => s.id === String(stepId))

  useEffect(() => {
    if (!step) return

    const loadProgress = async () => {
      try {
        let thisStep;
        const response = await fetch("/api/steps");
        if (response.ok) {
          const data = await response.json();
          if (step?.id) {
            thisStep = data?.progress?.map((pg : any ) => pg.stepId === step?.id)
            setIsCompleted(!!thisStep.progress?.[step.id].completed);
          }
        }
      } catch (error) {
        console.error("Failed to load progress:", error)
        const savedProgress = localStorage.getItem("hajj-progress")
        if (savedProgress && step?.id) {
          const progress = JSON.parse(savedProgress)
          setIsCompleted(!!progress[step.id])
          setQuizPassed(!!progress[`${step.id}-quiz`])
        }
      }
    }

    loadProgress()
  }, [step])

  if (!step) {
    return (
      <div className="container mx-auto mt-4 px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Step Not Found</h1>
          <p className="text-muted-foreground mb-4">The step with ID "{stepId}" could not be found.</p>
          <Button onClick={() => navigate.push("/dashboard")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const handleSectionComplete = (section: string) => {
    setSectionProgress((prev) => {
      const updated = { ...prev, [section]: true }
      const completed = Object.keys(updated).length >= 5 && Object.values(updated).every(Boolean)

      if (completed) setAllSectionComplete(true)
      return updated
    })
  }

  const handleQuizSubmit = async () => {
    if (!step) return

    setIsLoading(true)
    const quiz = step.content.quiz
    let score = 0

    quiz.questions.forEach((q, index) => {
      const selectedAnswer = Number.parseInt(quizAnswers[index])
      if (selectedAnswer === q.correct) {
        score++
      }
    })

    const percentage = (score / quiz.questions.length) * 100
    setQuizScore(percentage)

    if (percentage >= 70) {
      try {
        const response = await fetch("/api/steps", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stepId: `${step.id}`, quizPassed: true, completed: true }),
        })

        if (response.ok) {
            setQuizPassed(!!`${step.id}-quiz`)
          setQuizPassed(true)
          toast.success(`Quiz passed! Score: ${percentage.toFixed(0)}%`)
          setShowQuizModal(false)
          handleMarkCompleted()
        } else {
          throw new Error("Failed to save quiz progress")
        }
      } catch (error) {
        console.error("Failed to save quiz progress:", error)
        toast.error("Failed to save quiz progress")
        setQuizPassed(true)
        toast.success(`Quiz passed! Score: ${percentage.toFixed(0)}%`)
        setShowQuizModal(false)
        handleMarkCompleted()
      }
    } else {
      toast.error(`Quiz failed. Score: ${percentage.toFixed(0)}%. You need at least 70% to complete this step.`)
      setShowQuizModal(false)
      setQuizAnswers({})
    }

    setIsLoading(false)
  }

  const handleMarkCompleted = async () => {
    if (isLoading || !step) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/steps", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: step.id, completed: true }),
      })

      if (response.ok) {
        setIsCompleted(true)
        toast.success(`${step.title} marked as completed!`)
        navigate.push("/dashboard")
      } else {
        throw new Error("Failed to save progress")
      }
    } catch (error) {
      console.error("Failed to save progress:", error)
      toast.error("Failed to mark step as completed")

      const res = await fetch("/api/steps");
      const progress = res.ok ? await res.json() : {}
      setIsCompleted(true)
      toast.success(`${step.title} marked as completed! (Saved locally)`)
      navigate.push("/dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  const handleButtonClick = () => {
    if (!allSectionsComplete) {
      toast.error("Please complete all reading sections first.")
      return
    }
    if (isCompleted || isLoading) {
      return
    }
    if (quizPassed) {
      handleMarkCompleted()
    } else {
      setShowQuizModal(true)
    }
  }

  const limitedQuizQuestions = step?.content?.quiz?.questions?.slice(0, 5) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ReadingProgress />

      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="mb-8">
          <Button onClick={() => navigate.push("/dashboard")} variant="ghost" className="mb-4 hover:bg-accent/50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Steps
          </Button>

          {/* Hero Image */}
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={getStepImage(step.id) || "/placeholder.svg"}
              alt={`Illustration of ${step.title}`}
              className="w-full h-64 md:h-80 object-cover"
              // style={{"width": "auto", "height": "auto"}}
              width={700}
              height={50}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{step.title}</h1>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="secondary"
                      className="text-sm bg-white/20 backdrop-blur-sm text-white border-white/30"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {step.day}
                    </Badge>
                    {step.mandatory && (
                      <Badge className="bg-accent/90 text-accent-foreground backdrop-blur-sm">Mandatory</Badge>
                    )}
                    {isCompleted && (
                      <Badge className="bg-green-600/90 text-white backdrop-blur-sm">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="border-card-border hover:border-accent/30 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BookOpen className="w-5 h-5 text-accent" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={getStepImage(step.id) || "/placeholder.svg"}
                    alt={`${step.title} illustration`}
                    className="w-full h-48 object-cover"
                    width={600}
                    height={192}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white/90 text-primary backdrop-blur-sm">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      Illustration
                    </Badge>
                  </div>
                </div>
                <AnimatedCanvasText
                  text={step.content.overview}
                  speed={25}
                  onComplete={() => {
                    handleSectionComplete("overview")
                  }}
                />
              </CardContent>
            </Card>

            {/* Video Narration */}
            <Card className="border-card-border hover:border-accent/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">Video Narration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full max-w-md aspect-video">
                 <iframe 
                 width="560" 
                 height="315" 
                 src={`https://www.youtube.com/embed/${step.content.audio}`} 
                 title="YouTube video player" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                 referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen>
                 </iframe>
                </div>
              </CardContent>
            </Card>

            {/* Procedure */}
            <Card className="border-card-border hover:border-accent/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">Step-by-Step Procedure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="sr-only">
                  <ol className="list-decimal list-inside">
                    {step.content.procedure.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                </div>
                <AnimatedCanvasText
                  text={step.content.procedure.map((proc, idx) => `${idx + 1}. ${proc}`).join("\n\n")}
                  speed={40}
                  onComplete={() => {
                    handleSectionComplete("procedure")
                  }}
                />
              </CardContent>
            </Card>

            {/* History */}
            <Card className="border-card-border hover:border-accent/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">Historical Context</CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatedCanvasText
                  text={step.content.history}
                  speed={35}
                  onComplete={() => {
                    handleSectionComplete("history")
                  }}
                />
              </CardContent>
            </Card>

            {/* Quranic Evidence */}
            <Card className="border-card-border hover:border-accent/30 transition-colors bg-gradient-to-br from-card to-accent/5">
              <CardHeader>
                <CardTitle className="text-xl text-accent">Evidence from the Quran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-right text-2xl font-arabic leading-relaxed mb-4 p-4 bg-background/50 rounded-lg">
                  {step.content.quranEvidence.verse}
                </div>
                <AnimatedCanvasText
                  text={`Translation: "${step.content.quranEvidence.translation}"\n\nReference: ${step.content.quranEvidence.reference}`}
                  speed={45}
                  onComplete={() => handleSectionComplete("quran")}
                />
              </CardContent>
            </Card>

            {/* Hadith Evidence */}
            <Card className="border-card-border hover:border-accent/30 transition-colors bg-gradient-to-br from-card to-secondary/5">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Evidence from Hadith</CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatedCanvasText
                  text={`"${step.content.hadithEvidence.text}"\n\nNarrated by: ${step.content.hadithEvidence.narrator}\nReference: ${step.content.hadithEvidence.reference}`}
                  speed={45}
                  onComplete={() => handleSectionComplete("hadith")}
                />
              </CardContent>
                {step.title.toLowerCase().includes("tawaf") && (<Button onClick={() => navigate.push("/tawaf-counter")} className="bg-purple-400">Use Tawaf Counter</Button>)}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="sticky top-24 border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {[
                    { key: "overview", label: "Overview" },
                    { key: "procedure", label: "Procedure" },
                    { key: "history", label: "History" },
                    { key: "quran", label: "Quranic Evidence" },
                    { key: "hadith", label: "Hadith Evidence" },
                  ].map((section) => (
                    <div key={section.key} className="flex items-center gap-2">
                      <CheckCircle
                        className={`w-4 h-4 ${
                          sectionProgress[section.key] ? "text-green-600" : "text-muted-foreground"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          sectionProgress[section.key] ? "text-green-600 font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {section.label}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <CheckCircle className={`w-4 h-4 ${quizPassed ? "text-green-600" : "text-muted-foreground"}`} />
                    <span className={`text-sm ${quizPassed ? "text-green-600 font-medium" : "text-muted-foreground"}`}>
                      Quiz Passed
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleButtonClick}
                  disabled={!allSectionsComplete || isCompleted || isLoading}
                  className="w-full"
                  variant={isCompleted ? "secondary" : "default"}
                >
                  {isLoading ? (
                    "Saving..."
                  ) : isCompleted ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completed
                    </>
                  ) : allSectionsComplete ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {quizPassed ? "Mark as Completed" : "Take Quiz to Complete"}
                    </>
                  ) : (
                    "Finish Reading to Complete"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Day:</span>
                  <span className="font-medium">{step.day}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span className={`font-medium ${step.mandatory ? "text-accent" : "text-secondary"}`}>
                    {step.mandatory ? "Mandatory" : "Sunnah"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reading Time:</span>
                  <span className="font-medium">~5-7 minutes</span>
                </div>
              </CardContent>
            </Card>

            {/* Visual Guide */}
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Visual Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={getStepImage(step.id) || "/placeholder.svg"}
                    alt={`Visual guide for ${step.title}`}
                    className="w-full h-32 object-cover"
                    width={300}
                    height={128}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium">Educational illustration of {step.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

     {/* Quiz Modal */}
       <Dialog open={showQuizModal} onOpenChange={setShowQuizModal}>
         <DialogContent>
           <DialogHeader>
           <DialogTitle>Quiz: {step?.title}</DialogTitle>
             <DialogDescription>
               Answer the following questions to complete this step. You need at least 70% to pass.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 max-h-[60vh]">
            {limitedQuizQuestions.map((question, index) => (
              <div key={index} className="space-y-3">
                <Label className="text-base font-medium block">
                  Q{index + 1}: {question.question}
                </Label>
                <RadioGroup                  value={quizAnswers[index] || ""}
                  onValueChange={(value) => {
                    setQuizAnswers((prev) => ({ ...prev, [index]: value }))
                  }}
                  className="ml-4"
                >
                  {question.options.map((option, optIndex) => (
                    <RadioGroupItem key={optIndex} value={optIndex.toString()} id={`q${index}-o${optIndex}`}>
                      <Label htmlFor={`q${index}-o${optIndex}`} className="text-sm cursor-pointer">
                        {option}
                      </Label>
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>

          <DialogFooter>
             <Button variant="outline" onClick={() => setShowQuizModal(false)} disabled={isLoading}>
               Cancel
             </Button>
             <Button
               type="submit"
               onClick={handleQuizSubmit}
               disabled={Object.keys(quizAnswers).length < limitedQuizQuestions.length || isLoading}
             >
               {isLoading ? "Submitting..." : "Submit Quiz"}
             </Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>
    </div>
  )
}