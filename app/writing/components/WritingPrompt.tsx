import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
  } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { Clock, BarChart } from "lucide-react";
  import { WritingPrompt as WritingPromptType } from "../data/types";
  
  interface WritingPromptProps {
    prompt: WritingPromptType;
  }
  
  export default function WritingPrompt({ prompt }: WritingPromptProps) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{prompt.title}</CardTitle>
            <Badge variant="outline" className="capitalize">
              {prompt.type}
            </Badge>
          </div>
          <CardDescription className="text-md mt-2">
            {prompt.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{prompt.timeEstimate} minutes</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <span>Target: {prompt.wordLimit} words</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="secondary" className="capitalize">
                {prompt.difficulty}
              </Badge>
            </div>
          </div>
          
          {prompt.tips.length > 0 && (
            <div className="mt-2">
              <h4 className="text-sm font-medium mb-2">Tips:</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                {prompt.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }