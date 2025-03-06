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
      setIsGenerating(true);
      setConfidence(0);
      
      try {
        const result = await generatePrompt(activeCategory, userInput);
        const optimizedPrompt = ensurePlatformOptimization(result, activeCategory, selectedPlatform);
        setGeneratedPrompt(optimizedPrompt);
        
        // Add to history
        setPromptHistory(prev => [optimizedPrompt, ...prev.slice(0, 9)]);
        
        toast.success("Prompt ready to use!", {
          description: "Optimized for " + selectedPlatform
        });
      } catch (error) {
        console.error("Error generating prompt:", error);
        
        // Use fallback prompt generation
        const fallbackPrompt = generateOptimizedPrompt(activeCategory, userInput, selectedPlatform);
        setGeneratedPrompt(fallbackPrompt);
        
        // Add to history
        setPromptHistory(prev => [fallbackPrompt, ...prev.slice(0, 9)]);
        
        toast.success("Prompt created using fallback method", {
          description: "Optimized for " + selectedPlatform
        });
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
                <div className="overflow-x-auto scrollbar-hide">
                  <TabsList className="h-auto flex rounded-none bg-transparent p-0 justify-start md:justify-center w-max min-w-full">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <TabsTrigger
                          key={category.id}
                          value={category.id}
                          className="flex flex-col py-2 sm:py-3 px-4 sm:px-6 md:px-8 rounded-none data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 data-[state=active]:border-b-2 data-[state=active]:border-violet-600 dark:data-[state=active]:border-violet-500 data-[state=active]:bg-white/50 dark:data-[state=active]:bg-gray-800/50 data-[state=active]:shadow-none transition-all duration-200 ease-in-out flex-shrink-0"
                        >
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{category.name}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>
              </div>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="p-5 sm:p-7">
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                          {category.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      
                      {/* Platform Selector */}
                      <div className="flex-shrink-0 w-full md:w-auto">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">Optimize for:</span>
                          <Select
                            value={selectedPlatform}
                            onValueChange={setSelectedPlatform}
                          >
                            <SelectTrigger className="w-full sm:w-[180px] h-9 bg-white/50 dark:bg-black/30 border-purple-200/50">
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
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <label htmlFor="userInput" className="text-sm font-medium flex items-center">
                          <span className="bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-md text-xs mr-2">STEP 1</span>
                          Describe what you want to create:
                        </label>
                        
                        {/* Templates Dropdown */}
                        <DropdownMenu open={showExamples} onOpenChange={setShowExamples}>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 border-purple-200/50">
                              <Lightbulb className="w-3.5 h-3.5 mr-1" />
                              <span className="hidden sm:inline">Examples</span>
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
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
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
                          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-700 dark:to-fuchsia-700 hover:opacity-90 transition-opacity shadow-md hover:shadow-lg w-full sm:w-auto"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          {isGenerating ? "Creating..." : "Generate Prompt"}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Generated Prompt Section with Actions */}
                    <div className="space-y-3 animate-fadeIn">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <label htmlFor="generatedPrompt" className="text-sm font-medium flex items-center">
                          <span className="bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-md text-xs mr-2">STEP 2</span>
                          Copy this <span className="font-bold mx-1">{selectedPlatform}</span> prompt:
                        </label>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {/* Confidence score */}
                          {generatedPrompt && (
                            <div className="flex items-center mr-2">
                              <div className="w-16 sm:w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
                          
                          <div className="flex flex-wrap gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={copyToClipboard}
                              disabled={!generatedPrompt.trim()}
                              className="h-8 border-purple-200/50 hover:bg-purple-100/50 hover:text-purple-700 transition-all duration-200"
                            >
                              <Copy className="w-3.5 h-3.5 mr-1" />
                              <span className="hidden sm:inline">Copy</span>
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={savePrompt}
                              disabled={!generatedPrompt.trim()}
                              className="h-8 border-purple-200/50 hover:bg-purple-100/50 hover:text-purple-700 transition-all duration-200"
                            >
                              <BookmarkPlus className="w-3.5 h-3.5 mr-1" />
                              <span className="hidden sm:inline">Save</span>
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={sharePrompt}
                              disabled={!generatedPrompt.trim()}
                              className="h-8 border-purple-200/50 hover:bg-purple-100/50 hover:text-purple-700 transition-all duration-200"
                            >
                              <Share2 className="w-3.5 h-3.5 mr-1" />
                              <span className="hidden sm:inline">Share</span>
                            </Button>
                          </div>
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
          
          <div className="text-center text-sm text-muted-foreground pt-2">
            <div className="flex justify-center items-center gap-1.5">
              <Crown className="h-4 w-4 text-yellow-500" />
              <p className="font-medium">Premium AI Prompt Engineering</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative mt-16 pt-10 pb-8 overflow-hidden">
        {/* Decorative divider */}
        <div className="absolute top-0 inset-x-0 h-[1px]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"></div>
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-[2px] bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-[1px]"></div>
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-[1px] bg-white dark:bg-white/30"></div>
        </div>

        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto relative">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-sm opacity-50 rounded-full"></div>
                  <Sparkles className="h-7 w-7 text-white relative" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  PromptCraft
                </span>
              </div>
            </div>
            
            {/* Simple social links and copyright */}
            <div className="flex flex-col items-center">
              <div className="flex space-x-6 mb-4">
                <a href="#" className="text-muted-foreground hover:text-purple-500 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-purple-500 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-purple-500 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-purple-500 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
              
              <div className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} PromptCraft. All rights reserved.
              </div>
            </div>
            
            {/* Subtle decorative elements */}
            <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-gradient-to-tr from-violet-600/5 to-fuchsia-600/5 blur-2xl"></div>
            <div className="absolute -bottom-20 right-10 w-36 h-36 rounded-full bg-gradient-to-bl from-blue-600/5 to-purple-600/5 blur-2xl"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}