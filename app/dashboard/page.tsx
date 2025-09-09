
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { HAJJ_STEPS } from '@/lib/steps';
// import { getStepImage } from '@/lib/step-images';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { CheckCircle, Clock, ArrowRight, BookOpen } from 'lucide-react';
// import Image from 'next/image';
// import { toast } from 'sonner';

// const Dashboard = () => {
//   const navigate = useRouter();
//   const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

//    const loadProgress = async () => {
//       try {
//         let steps;
//         const response = await fetch("/api/steps")
//         if (response.ok) {
//           const data = await response.json()
//          steps = data.progress;
//          steps.forEach((element : any) => {
//           setCompletedSteps(arr => ({...arr, [element.stepId]: element.completed}))
//          });
//          localStorage.setItem("completed", JSON.stringify(completedSteps))
//         }
//       } catch (error) {
//         console.error("Failed to load progress:", error)
//      toast.error("failed to load user progress");
//       }
//     }

//   useEffect(() => {
//     // Load progress from localStorage
//     const savedProgress = localStorage.getItem('hajj-progress');
//     if (savedProgress) {
//       setCompletedSteps(JSON.parse(savedProgress));
//     }
//     loadProgress()
//   }, []);

//   const completedCount = Object.values(completedSteps).filter(Boolean).length;
//   const progressPercentage = (completedCount / HAJJ_STEPS.length) * 100;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-foreground mb-4">Hajj Journey</h1>
//           <p className="text-xl text-muted-foreground mb-6">
//             Learn and track your progress through the sacred pilgrimage
//           </p>
          
//           {/* Progress Overview */}
//           <Card className="max-w-md mx-auto">
//             <CardHeader>
//               <CardTitle className="text-lg">Your Progress</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-muted-foreground">Steps Completed</span>
//                 <span className="font-semibold">{completedCount} / {HAJJ_STEPS.length}</span>
//               </div>
//               <Progress value={progressPercentage} className="w-full" />
//               <p className="text-xs text-muted-foreground">
//                 {progressPercentage.toFixed(0)}% Complete
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Steps Grid */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {HAJJ_STEPS.map((step, index) => {
//             const isCompleted = completedSteps[step.id];
            
//             return (
//               <Card 
//                 key={step.id} 
//                 className={`border-card-border hover:scale-105 hover:border-accent/30 transition-all duration-300 cursor-pointer ${
//                   isCompleted ? 'ring-2 ring-green-500/20 bg-green-50/10' : ''
//                 }`}
//                 onClick={() => navigate.push(`/steps/${step.id}`)}
//               >
//                 <div className="relative">
//                   <Image 
//                     src={getStepImage(step.id)} 
//                     alt={step.title}
//                     className="w-full h-48 object-cover rounded-t-lg"
//                     width={400}
//                     height={200}
//                   />
//                   <div className="absolute top-2 left-2">
//                     <Badge variant="secondary" className="text-xs">
//                       Step {index + 1}
//                     </Badge>
//                   </div>
//                   <div className="absolute top-2 right-2">
//                     {isCompleted && (
//                       <Badge className="bg-green-600 text-white">
//                         <CheckCircle className="w-3 h-3 mr-1" />
//                         Done
//                       </Badge>
//                     )}
//                   </div>
//                 </div>
                
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-lg leading-tight">{step.title}</CardTitle>
//                 </CardHeader>
                
//                 <CardContent className="space-y-3">
//                   <p className="text-sm text-muted-foreground line-clamp-2">
//                     {step.description}
//                   </p>
                  
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-4 h-4 text-muted-foreground" />
//                       <span className="text-sm text-muted-foreground">{step.day}</span>
//                     </div>
//                     {step.mandatory && (
//                       <Badge className="bg-accent text-accent-foreground text-xs">
//                         Mandatory
//                       </Badge>
//                     )}
//                   </div>
                  
//                   <Button 
//                     className="w-full mt-4" 
//                     variant={isCompleted ? "secondary" : "default"}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       navigate.push(`/steps/${step.id}`);
//                     }}
//                   >
//                     {isCompleted ? (
//                       <>
//                         <BookOpen className="w-4 h-4 mr-2" />
//                         Review Step
//                       </>
//                     ) : (
//                       <>
//                         <ArrowRight className="w-4 h-4 mr-2" />
//                         Start Learning
//                       </>
//                     )}
//                   </Button>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Completion Message */}
//         {completedCount === HAJJ_STEPS.length && (
//           <Card className="mt-8 border-green-200 bg-green-50/10">
//             <CardContent className="text-center py-8">
//               <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-green-700 mb-2">
//                 Congratulations! 🎉
//               </h3>
//               <p className="text-green-600">
//                 You have completed learning about all the steps of Hajj. 
//                 May Allah accept your preparation and bless your pilgrimage.
//               </p>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HAJJ_STEPS } from '@/lib/steps';
import { getStepImage } from '@/lib/step-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, ArrowRight, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

const Dashboard = () => {
  const navigate = useRouter();
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [hajjType, setHajjType] = useState<'tamattu' | 'qiran' | 'ifrad' | null>(null);
  const [user, setUser] = useState<{ id: string; name?: string; email?: string } | null>(null);

  // Load user session
  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await fetch('/api/session');
        if (!response?.ok) {
          navigate.push('/login');
          return;
        }
        const session = await response.json();
        if (!session?.user) {
          navigate.push('/login');
          return;
        }
        setUser(session.user);
        // Update last seen
        await fetch('/api/heartbeat', { method: 'POST' });
      } catch (error) {
        console.error('Failed to load session:', error);
        navigate.push('/login');
      }
    };
    loadSession();
  }, [navigate]);

  // Heartbeat to mark user online
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/heartbeat', { method: 'POST' });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Load progress and Hajj type
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await fetch('/api/steps');
        if (response.ok) {
          const data = await response.json();
          const steps = data.progress || [];
          const progress: Record<string, boolean> = {};
          steps.forEach((element: any) => {
            progress[element.stepId] = element.completed;
          });
          setCompletedSteps(s => ({...s, ...progress}));
          console.log(progress)
        } else {
          toast.error('Failed to load user progress');
        }
      } catch (error) {
        console.error('Failed to load progress:', error);
        toast.error('Failed to load user progress');
      }
    };

    // Load saved progress and Hajj type
    const savedHajjType = localStorage.getItem('hajj-type') as 'tamattu' | 'qiran' | 'ifrad' | null;
    if (savedHajjType) {
      setHajjType(savedHajjType);
    }
    loadProgress();
  }, []);

  // Handle Hajj type change
  const handleHajjTypeChange = async (type: 'tamattu' | 'qiran' | 'ifrad') => {
    setHajjType(type);
    localStorage.setItem('hajj-type', type);
    try {
      await fetch('/api/user/hajj-type', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hajjType: type }),
      });
      toast.success(`Hajj type set to ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    } catch (error) {
      console.error('Failed to update Hajj type:', error);
      toast.error('Failed to update Hajj type');
    }
  };

  // Filter steps based on selected Hajj type
  const filteredSteps = hajjType
    ? HAJJ_STEPS.filter(step => step.hajjTypes.includes(hajjType))
    : HAJJ_STEPS;

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercentage = filteredSteps.length > 0 ? (completedCount / filteredSteps.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome, {user?.name || user?.email || 'Pilgrim'}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Learn and track your progress through the sacred pilgrimage
          </p>

          {/* Hajj Type Picker */}
          <Card className="max-w-md mx-auto mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Select Hajj Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="hajj-type" className="text-sm text-muted-foreground">
                Choose your Hajj type to view relevant steps:
              </Label>
              <select
                id="hajj-type"
                value={hajjType || ''}
                onChange={(e) => handleHajjTypeChange(e.target.value as 'tamattu' | 'qiran' | 'ifrad')}
                className="mt-2 w-full p-2 border rounded-md bg-background text-foreground focus:ring-2 focus:ring-accent"
              >
                <option value="" disabled>
                  Select Hajj Type
                </option>
                <option value="tamattu">Hajj al-Tamattu': حج التمتع‎.</option>
                <option value="qiran">Hajj al-Qiran: حج القران‎.</option>
                <option value="ifrad">Hajj al-Ifrad: حج الإفراد‎.</option>
              </select>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          {hajjType && (
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Steps Completed</span>
                  <span className="font-semibold">{completedCount} / {filteredSteps.length}</span>
                </div>
                <Progress value={progressPercentage} className="w-full" />
                <p className="text-xs text-muted-foreground">
                  {progressPercentage.toFixed(0)}% Complete
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Steps Grid */}
        {hajjType ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSteps.map((step, index) => {
              const isCompleted = completedSteps[step.id];
              const isMandatory = typeof step.mandatory === 'boolean' ? step.mandatory : step.mandatory[hajjType];

              return (
                <Card
                  key={step.id}
                  className={`border-card-border hover:scale-105 hover:border-accent/30 transition-all duration-300 cursor-pointer ${
                    isCompleted ? 'ring-2 ring-green-500/20 bg-green-50/10' : ''
                  }`}
                  onClick={() => navigate.push(`/steps/${step.id}`)}
                >
                  <div className="relative">
                    <Image
                      src={getStepImage(step.id)}
                      alt={step.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                      width={400}
                      height={200}
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        Step {index + 1}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      {isCompleted && (
                        <Badge className="bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Done
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg leading-tight">{step.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">{step.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{step.day}</span>
                      </div>
                      {isMandatory && (
                        <Badge className="bg-accent text-accent-foreground text-xs">
                          Mandatory
                        </Badge>
                      )}
                    </div>

                    <Button
                      className="w-full mt-4"
                      variant={isCompleted ? 'secondary' : 'default'}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate.push(`/steps/${step.id}`);
                      }}
                    >
                      {isCompleted ? (
                        <>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Review Step
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Start Learning
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-8">
            <CardContent>
              <p className="text-muted-foreground">
                Please select a Hajj type to view the relevant steps.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Completion Message */}
        {hajjType && completedCount === filteredSteps.length && (
          <Card className="mt-8 border-green-200 bg-green-50/10">
            <CardContent className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-700 mb-2">
                Congratulations! 🎉
              </h3>
              <p className="text-green-600">
                You have completed learning about all the steps of Hajj {hajjType.charAt(0).toUpperCase() + hajjType.slice(1)}. 
                May Allah accept your preparation and bless your pilgrimage.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;