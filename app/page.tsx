"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Copy, Sparkles, Save, MessageSquare, Paintbrush, Code, LineChart,
  Share2, BookmarkPlus, History, Lightbulb, Zap, CheckCircle, Info,
  Dices, ChevronDown, Plus, Crown
} from "lucide-react";
import { toast } from "sonner";
import { generatePrompt } from "@/lib/gemini";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const categories = [
  { id: "chatgpt", name: "Chat Assistant", description: "Conversational AI prompts", icon: MessageSquare },
  { id: "art", name: "Image Creation", description: "Image generation prompts", icon: Paintbrush },
  { id: "coding", name: "Code Assistant", description: "Technical solution prompts", icon: Code },
  { id: "marketing", name: "Content Creator", description: "Marketing & content prompts", icon: LineChart },
];

const aiPlatforms = {
  chatgpt: ["ChatGPT", "Claude", "Gemini", "Bard", "Llama", "Replit AI", "Bolt.new", "V0", "Lovable"],
  art: ["Midjourney", "DALL-E", "Stable Diffusion", "Firefly", "Runway", "Leonardo"],
  coding: ["GitHub Copilot", "Replit AI", "Bolt.new", "Tabnine", "CodeWhisperer", "V0 Code", "Cursor AI"],
  marketing: ["Jasper", "Copy.ai", "ChatGPT", "Claude", "Bolt.new", "Writer"]
};

// Example templates that users can start with
const promptTemplates = {
  chatgpt: [
    "Create a detailed guide about [topic]",
    "Explain [concept] as if I'm 5 years old",
    "Compare and contrast [A] and [B]",
    "Write a short story about [theme/character]"
  ],
  art: [
    "A photorealistic portrait of [subject]",
    "[scene] in the style of [artist/style]",
    "[subject] with [lighting] and [mood]",
    "A futuristic cityscape with [elements]"
  ],
  coding: [
    "Create a [language] function to [functionality]",
    "Build a [framework] component for [purpose]",
    "Optimize this code: [paste code]",
    "Debug this error: [paste error]"
  ],
  marketing: [
    "Write an email campaign for [product] targeting [audience]",
    "Create social media posts for [brand/product]",
    "Craft a landing page headline for [service]",
    "Write SEO-optimized product descriptions for [product]"
  ]
};

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeCategory, setActiveCategory] = useState("chatgpt");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [confidence, setConfidence] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showExamples, setShowExamples] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Set initial platform when category changes
  useEffect(() => {
    setUserInput("");
    setGeneratedPrompt("");
    setSelectedPlatform(aiPlatforms[activeCategory as keyof typeof aiPlatforms][0]);
    setShowExamples(false);
    setConfidence(0);
  }, [activeCategory]);

  // Update character count
  useEffect(() => {
    setCharCount(userInput.length);
  }, [userInput]);

  // Simulate confidence score calculation
  useEffect(() => {
    if (generatedPrompt) {
      const timer = setTimeout(() => {
        setConfidence(Math.floor(Math.random() * 30) + 70); // Random between 70-99
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [generatedPrompt]);

  const handleGeneratePrompt = async () => {
    if (!userInput.trim()) {
      toast.error("Please describe your task or project first");
      return;
    }

    if (!isGenerating) {
      try {
        setIsGenerating(true);
        setConfidence(0);
        
        try {
          // Pass only the required arguments to the generatePrompt function
          const result = await generatePrompt(activeCategory, userInput);
          
          // Make sure the prompt is optimized for the selected platform
          const optimizedPrompt = ensurePlatformOptimization(result, activeCategory, selectedPlatform);
          setGeneratedPrompt(optimizedPrompt);
          
          // Add to history
          setPromptHistory(prev => [optimizedPrompt, ...prev.slice(0, 9)]);
          
          toast.success("Prompt ready to use!", {
            description: "Optimized for " + selectedPlatform
          });
        } catch (apiError) {
          console.error("API Error:", apiError);
          
          // Fallback with the same parameters
          const fallbackPrompt = generateOptimizedPrompt(activeCategory, userInput, selectedPlatform);
          setGeneratedPrompt(fallbackPrompt);
          
          // Add to history
          setPromptHistory(prev => [fallbackPrompt, ...prev.slice(0, 9)]);
          
          toast.success("Prompt created successfully", {
            description: "Optimized for " + selectedPlatform
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    }
  };

  // Simplified, more structured prompt generator
  const generateOptimizedPrompt = (category: string, input: string, platform: string) => {
    const projectDetails = input.trim();
    
    switch (category) {
      case "chatgpt": {
        // More structured prompts with less fluff
        if (platform === "Replit AI") {
          return `${projectDetails}`;
        } else if (platform === "Bolt.new") {
          return `${projectDetails}`;
        } else if (platform === "V0") {
          return `${projectDetails}`;
        } else if (platform === "Claude") {
          return `<request>\n${projectDetails}\n</request>`;
        } else if (platform === "Lovable") {
          return `${projectDetails}`;
        } else {
          return `${projectDetails}`;
        }
      }
        
      case "art": {
        const style = getRandomStyle();
        const lighting = getRandomLighting();
        const mood = getRandomMood();
        
        // More direct art prompts
        if (platform === "Midjourney") {
          return `${projectDetails}, ${style}, ${lighting}, ${mood}, 8k --ar 16:9 --v 5`;
        } else if (platform === "DALL-E") {
          return `${projectDetails}. ${style}. ${lighting}. ${mood}.`;
        } else {
          return `${projectDetails}, ${style}, ${lighting}, ${mood}`;
        }
      }
        
      case "coding": {
        if (platform === "GitHub Copilot") {
          return `// Task: ${projectDetails}`;
        } else if (platform === "Replit AI") {
          return `# ${projectDetails}`;
        } else if (platform === "Bolt.new") {
          return `// ${projectDetails}`;
        } else if (platform === "V0 Code") {
          return `// ${projectDetails}`;
        } else {
          return `/* ${projectDetails} */`;
        }
      }
        
      case "marketing": {
        if (platform === "Jasper" || platform === "Copy.ai") {
          return `Create marketing copy for: ${projectDetails}
Target audience: [ideal customer]
Key message: [value proposition]
Tone: professional
Call to action: [desired action]`;
        } else if (platform === "Bolt.new") {
          return `// ${projectDetails}`;
        } else {
          return `${projectDetails}
Target audience: professionals
Tone: persuasive
Call to action: subscribe/buy/contact`;
        }
      }
        
      default:
        return projectDetails;
    }
  };

  // Simplified platform optimization function
  const ensurePlatformOptimization = (prompt: string, category: string, platform: string) => {
    // If the prompt already contains platform-specific formatting, return it as is
    if (prompt.includes(platform) || 
        (platform === "Midjourney" && prompt.includes("--ar")) ||
        (platform === "DALL-E" && prompt.includes("Highly detailed")) ||
        (platform === "Bolt.new" && prompt.includes("concise"))) {
      return prompt;
    }
    
    // Otherwise, add minimal platform-specific optimization
    switch (category) {
      case "chatgpt":
        if (platform === "Bolt.new" || platform === "V0" || platform === "Replit AI") {
          return prompt.trim();
        } else if (platform === "Claude") {
          return `<request>\n${prompt.trim()}\n</request>`;
        } else if (platform === "Lovable") {
          return prompt.trim();
        } else {
          return prompt;
        }
        
      case "coding":
        if (platform === "Bolt.new") {
          return `// ${prompt.trim()}`;
        } else if (platform === "GitHub Copilot" || platform === "Replit AI") {
          return `/* ${prompt.trim()} */`;
        } else if (platform === "V0 Code") {
          return `// ${prompt.trim()}`;
        } else {
          return prompt;
        }
        
      default:
        return prompt;
    }
  };

  const handleUseTemplate = (template: string) => {
    setUserInput(template);
    setShowExamples(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Helper functions for art prompts
  const getRandomStyle = () => {
    const styles = ["digital art", "photorealistic", "cinematic", "concept art", "illustration", "oil painting", "watercolor", "3D render"];
    return styles[Math.floor(Math.random() * styles.length)];
  };
  
  const getRandomLighting = () => {
    const lighting = ["volumetric lighting", "soft lighting", "dramatic lighting", "golden hour", "studio lighting", "neon lighting", "ambient occlusion"];
    return lighting[Math.floor(Math.random() * lighting.length)];
  };
  
  const getRandomMood = () => {
    const moods = ["vibrant colors", "atmospheric", "sharp focus", "detailed", "highly detailed", "intricate details", "award-winning photography"];
    return moods[Math.floor(Math.random() * moods.length)];
  };

  const copyToClipboard = async () => {
    if (generatedPrompt.trim()) {
      try {
        await navigator.clipboard.writeText(generatedPrompt);
        toast.success("Copied to clipboard!", {
          icon: <CheckCircle className="h-4 w-4" />,
        });
      } catch (error) {
        toast.error("Failed to copy to clipboard");
      }
    } else {
      toast.error("Nothing to copy yet");
    }
  };

  const savePrompt = async () => {
    if (generatedPrompt.trim()) {
      setFavorites(prev => [...prev, generatedPrompt]);
      toast.success("Prompt saved to favorites!", {
        icon: <BookmarkPlus className="h-4 w-4" />,
      });
    } else {
      toast.error("Nothing to save yet");
    }
  };

  const sharePrompt = async () => {
    if (generatedPrompt.trim()) {
      try {
        await navigator.share({
          title: "AI Prompt",
          text: generatedPrompt,
        });
        toast.success("Prompt shared successfully");
      } catch (error) {
        // Fallback if Web Share API is not supported
        toast.error("Sharing not supported on this browser");
        try {
          await navigator.clipboard.writeText(generatedPrompt);
          toast.success("Copied to clipboard instead");
        } catch (clipboardError) {
          toast.error("Could not copy to clipboard");
        }
      }
    } else {
      toast.error("Nothing to share yet");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-200/40 via-background to-background dark:from-violet-950/20 dark:via-gray-950 dark:to-gray-950 pt-10 sm:pt-16 overflow-hidden relative">
      {/* Spotlight effect for dark mode */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Blurred shapes */}
        <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-purple-300/20 to-fuchsia-300/20 dark:from-purple-900/10 dark:to-fuchsia-900/10 blur-3xl" />
        <div className="absolute top-[20%] -left-[5%] w-[30%] h-[30%] rounded-full bg-gradient-to-br from-blue-300/20 to-indigo-300/20 dark:from-blue-900/10 dark:to-indigo-900/10 blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-[25%] h-[25%] rounded-full bg-gradient-to-br from-pink-300/20 to-rose-300/20 dark:from-pink-900/10 dark:to-rose-900/10 blur-3xl" />
        
        {/* Animated spotlight effect - only visible in dark mode */}
        <div className="hidden dark:block absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-600/5 via-fuchsia-600/2 to-transparent blur-3xl animate-spotlight opacity-60"></div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-4 sm:py-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100/80 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 text-xs font-medium mb-2 backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5" />
              <span>AI-Powered Prompt Engineering</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 bg-clip-text text-transparent">
              PromptCraft
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg dark:text-gray-300">
              Create perfectly optimized prompts for any AI platform
            </p>
          </div>

          <Card className="backdrop-blur-lg bg-card/90 dark:bg-gray-900/60 shadow-xl border border-purple-500/10 dark:border-purple-700/20 rounded-xl overflow-hidden">
            <Tabs 
              defaultValue="chatgpt" 
              className="w-full"
              onValueChange={(value) => setActiveCategory(value)}
            >
              {/* Enhanced Category Navigation */}
              <div className="bg-muted/50 border-b border-purple-500/10 dark:border-purple-700/20">
                <TabsList className="h-auto flex rounded-none bg-transparent p-0 justify-center overflow-x-auto">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="flex flex-col py-3 px-6 sm:px-8 rounded-none data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 data-[state=active]:border-b-2 data-[state=active]:border-violet-600 dark:data-[state=active]:border-violet-500 data-[state=active]:bg-white/50 dark:data-[state=active]:bg-gray-800/50 data-[state=active]:shadow-none transition-all duration-200 ease-in-out"
                      >
                        <Icon className="w-5 h-5 mb-1" />
                        <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="p-5 sm:p-7">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                          {category.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      
                      {/* Platform Selector */}
                      <div className="flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">Optimize for:</span>
                          <Select
                            value={selectedPlatform}
                            onValueChange={setSelectedPlatform}
                          >
                            <SelectTrigger className="w-[180px] h-9 bg-white/50 dark:bg-black/30 border-purple-200/50">
                              <SelectValue placeholder="Select AI platform" />
                            </SelectTrigger>
                            <SelectContent align="center" sideOffset={5} className="max-h-[300px]">
                              {aiPlatforms[category.id as keyof typeof aiPlatforms].map(platform => (
                                <SelectItem key={platform} value={platform}>
                                  {platform}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    {/* User Input Section with Templates */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label htmlFor="userInput" className="text-sm font-medium flex items-center">
                          <span className="bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-md text-xs mr-2">STEP 1</span>
                          Describe what you want to create:
                        </label>
                        
                        {/* Templates Dropdown */}
                        <DropdownMenu open={showExamples} onOpenChange={setShowExamples}>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 border-purple-200/50">
                              <Lightbulb className="w-3.5 h-3.5 mr-1" />
                              Examples
                              <ChevronDown className="ml-1 h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" side="bottom" sideOffset={8} className="w-72">
                            {promptTemplates[activeCategory as keyof typeof promptTemplates].map((template, index) => (
                              <DropdownMenuItem 
                                key={index} 
                                onClick={() => handleUseTemplate(template)}
                                className="py-2.5 cursor-pointer"
                              >
                                {template}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="relative">
                        <Textarea
                          id="userInput"
                          ref={textareaRef}
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          placeholder={
                            category.id === "chatgpt" ? `Example: Create a step-by-step guide for beginners learning to play guitar`
                            : category.id === "art" ? `Example: A cyberpunk city street at night with neon signs and rain`
                            : category.id === "coding" ? `Example: Create a React hook that fetches and caches API data with error handling`
                            : `Example: Write persuasive product descriptions for our premium coffee subscription service`
                          }
                          className="min-h-[120px] resize-none bg-white/70 dark:bg-gray-900/60 p-4 text-base rounded-lg border-purple-200/50 dark:border-purple-700/30 focus:border-violet-500 dark:focus:border-violet-500/70 focus:ring-violet-500/20 dark:focus:ring-violet-500/10 transition-all"
                        />
                        
                        {/* Character counter */}
                        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-white/80 dark:bg-black/50 px-2 py-0.5 rounded-md">
                          {charCount} chars
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        {/* Optimal length guide */}
                        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-3.5 w-3.5" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Suggested length for optimal results</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <span>Optimal length: 50-200 characters</span>
                        </div>
                      
                        <Button
                          variant="default"
                          onClick={handleGeneratePrompt}
                          disabled={isGenerating}
                          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-700 dark:to-fuchsia-700 hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          {isGenerating ? "Creating..." : "Generate Prompt"}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Generated Prompt Section with Actions */}
                    <div className="space-y-3 animate-fadeIn">
                      <div className="flex justify-between items-center">
                        <label htmlFor="generatedPrompt" className="text-sm font-medium flex items-center">
                          <span className="bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-md text-xs mr-2">STEP 2</span>
                          Copy this <span className="font-bold mx-1">{selectedPlatform}</span> prompt:
                        </label>
                        
                        <div className="flex gap-1.5">
                          {/* Confidence score */}
                          {generatedPrompt && (
                            <div className="flex items-center mr-2">
                              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${confidence >= 90 ? 'bg-green-500' : confidence >= 80 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                                  style={{ width: `${confidence}%` }}
                                ></div>
                              </div>
                              <span className={`ml-2 text-xs font-medium 
                                ${confidence >= 90 ? 'text-green-600 dark:text-green-400' : 
                                  confidence >= 80 ? 'text-blue-600 dark:text-blue-400' : 
                                  'text-yellow-600 dark:text-yellow-400'}`}
                              >
                                {confidence}%
                              </span>
                            </div>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={copyToClipboard}
                            disabled={!generatedPrompt.trim()}
                            className="h-8 border-purple-200/50 hover:bg-purple-100/50 hover:text-purple-700 transition-all duration-200"
                          >
                            <Copy className="w-3.5 h-3.5 mr-1" />
                            Copy
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={savePrompt}
                            disabled={!generatedPrompt.trim()}
                            className="h-8 border-purple-200/50 hover:bg-purple-100/50 hover:text-purple-700 transition-all duration-200"
                          >
                            <BookmarkPlus className="w-3.5 h-3.5 mr-1" />
                            Save
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={sharePrompt}
                            disabled={!generatedPrompt.trim()}
                            className="h-8 border-purple-200/50 hover:bg-purple-100/50 hover:text-purple-700 transition-all duration-200"
                          >
                            <Share2 className="w-3.5 h-3.5 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <Textarea
                          id="generatedPrompt"
                          value={generatedPrompt}
                          onChange={(e) => setGeneratedPrompt(e.target.value)}
                          placeholder={`Your optimized ${selectedPlatform} prompt will appear here...`}
                          className={`min-h-[160px] resize-none bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-black/40 p-4 text-base rounded-lg border-purple-200/50 ${generatedPrompt ? 'text-foreground' : 'text-muted-foreground'} transition-all`}
                        />
                        
                        {generatedPrompt && selectedPlatform && (
                          <Badge variant="outline" className="absolute top-3 right-3 bg-purple-100/50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                            {selectedPlatform}
                          </Badge>
                        )}
                        
                        {!generatedPrompt && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-muted-foreground">
                            <Sparkles className="w-6 h-6 mx-auto mb-2 opacity-20" />
                            <p className="text-sm opacity-50">Your AI-optimized prompt will appear here</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* History & Favorites Section */}
                    {(promptHistory.length > 0 || favorites.length > 0) && (
                      <div className="border-t border-purple-200/30 dark:border-purple-800/30 pt-4 mt-6">
                        <Tabs defaultValue="history" className="w-full">
                          <TabsList className="bg-purple-100/50 dark:bg-purple-900/20 p-0.5">
                            <TabsTrigger value="history" className="data-[state=active]:bg-white dark:data-[state=active]:bg-black/40 text-xs py-1.5">
                              <History className="w-3.5 h-3.5 mr-1.5" />
                              Recent Prompts
                            </TabsTrigger>
                            <TabsTrigger value="favorites" className="data-[state=active]:bg-white dark:data-[state=active]:bg-black/40 text-xs py-1.5">
                              <BookmarkPlus className="w-3.5 h-3.5 mr-1.5" />
                              Favorites
                            </TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="history" className="mt-3">
                            <div className="max-h-[150px] overflow-y-auto space-y-2 pr-1">
                              {promptHistory.length > 0 ? (
                                promptHistory.map((prompt, index) => (
                                  <div 
                                    key={index} 
                                    className="text-xs border border-purple-100 dark:border-purple-900/50 rounded-md p-2 bg-white/70 dark:bg-black/30 cursor-pointer hover:border-purple-300 truncate"
                                    onClick={() => setGeneratedPrompt(prompt)}
                                  >
                                    {prompt.substring(0, 80)}...
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-muted-foreground text-center py-3">No prompt history yet</p>
                              )}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="favorites" className="mt-3">
                            <div className="max-h-[150px] overflow-y-auto space-y-2 pr-1">
                              {favorites.length > 0 ? (
                                favorites.map((prompt, index) => (
                                  <div 
                                    key={index} 
                                    className="text-xs border border-purple-100 dark:border-purple-900/50 rounded-md p-2 bg-white/70 dark:bg-black/30 cursor-pointer hover:border-purple-300 truncate flex justify-between items-center group"
                                    onClick={() => setGeneratedPrompt(prompt)}
                                  >
                                    <span>{prompt.substring(0, 70)}...</span>
                                    <Button
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setFavorites(prev => prev.filter((_, i) => i !== index));
                                      }}
                                    >
                                      <span className="sr-only">Remove</span>
                                      <span className="text-xs text-red-500">×</span>
                                    </Button>
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-muted-foreground text-center py-3">No saved favorites yet</p>
                              )}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Card>
          
          <div className="text-center text-sm text-muted-foreground pt-2 space-y-2">
            <div className="flex justify-center items-center gap-1.5">
              <Crown className="h-4 w-4 text-yellow-500" />
              <p className="font-medium">Premium AI Prompt Engineering</p>
            </div>
            <p className="text-xs">Optimized for ChatGPT, Claude, Midjourney, DALL-E, Gemini, Replit, Bolt.new, V0, Lovable & more</p>
            <div className="text-xs pt-1 opacity-70">Create better results with perfectly crafted prompts for any AI platform</div>
          </div>
        </div>
      </main>
    </div>
  );
}