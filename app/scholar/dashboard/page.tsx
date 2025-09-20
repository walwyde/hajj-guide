"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HajjStep } from "@/lib/steps";
import { toast } from "@/components/ui/sonner";

export default function ScholarDashboard() {
  const router = useRouter();
  const [steps, setSteps] = useState<HajjStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStep, setSelectedStep] = useState<HajjStep | null>(null);
  const [editedStep, setEditedStep] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [scholarId, setScholarId] = useState<string | null>(null);

  useEffect(() => {
    // Check if scholar is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/scholars/auth");
        if (!response.ok) {
          router.push("/scholar/login");
        } else {
          const data = await response.json();
          setScholarId(data.scholarId);
          fetchSteps();
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/scholar/login");
      }
    };

    checkAuth();
  }, [router]);

  const fetchSteps = async () => {
    try {
      const response = await fetch("/api/scholars/steps");
      if (response.ok) {
        const data = await response.json();
        setSteps(data.steps);
      } else {
        toast.error("Failed to fetch steps");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching steps:", error);
      toast.error("Failed to fetch steps");
      setLoading(false);
    }
  };

  const handleStepSelect = (step: HajjStep) => {
    setSelectedStep(step);
    setEditedStep({
      title: step.title,
      content: {
        ...step.content
      }
    });
    setActiveTab("overview");
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedStep((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContentChange = (field: string, value: string) => {
    setEditedStep((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      }
    }));
  };

  const handleSaveChanges = async () => {
    if (!selectedStep || !editedStep) return;
    if (!scholarId) {
      toast.error("Authentication error. Please log in again.");
      router.push("/scholar/login");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/scholars/steps", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stepId: selectedStep.id,
          updates: editedStep,
          scholarId: scholarId // Using the actual scholar ID from session
        }),
      });

      if (response.ok) {
        toast.success("Step updated successfully");
        fetchSteps(); // Refresh steps
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to update step");
      }
    } catch (error) {
      console.error("Error updating step:", error);
      toast.error("Failed to update step");
    } finally {
      setLoading(false);
    }
  };

  if (loading && steps.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Scholar Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Steps List */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Hajj Steps</CardTitle>
              <CardDescription>Select a step to review and edit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {steps.map((step) => (
                  <Button
                    key={step.id}
                    variant={selectedStep?.id === step.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleStepSelect(step)}
                  >
                    {step.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step Editor */}
        <div className="md:col-span-2">
          {selectedStep && editedStep ? (
            <Card>
              <CardHeader>
                <CardTitle>Editing: {selectedStep.title}</CardTitle>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <Input
                        value={editedStep.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Overview</label>
                      <Textarea
                        value={editedStep.content.overview}
                        onChange={(e) => handleContentChange("overview", e.target.value)}
                        rows={5}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Procedure</label>
                      <Textarea
                        value={editedStep.content.procedure}
                        onChange={(e) => handleContentChange("procedure", e.target.value)}
                        rows={8}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">History</label>
                      <Textarea
                        value={editedStep.content.history}
                        onChange={(e) => handleContentChange("history", e.target.value)}
                        rows={5}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Audio URL</label>
                      <Input
                        value={editedStep.content.audio}
                        onChange={(e) => handleContentChange("audio", e.target.value)}
                        placeholder="Audio file URL"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="mt-6">
                  <Button 
                    onClick={handleSaveChanges} 
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-[60vh]">
                <p className="text-muted-foreground">Select a step to edit</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}