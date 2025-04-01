"use client"

import { useEffect, useState } from "react"
import { WritingFeedbackView } from "../../components/WritingFeedback"
import { useParams } from "next/navigation"

export default function FeedbackPage() {
  const params = useParams()
  const [submission, setSubmission] = useState("")
  
  // In a real app, this would fetch the actual submission from an API
  useEffect(() => {
    // Simulate loading the submission
    const mockSubmission = `The topic of artificial intelligence has been a subject of much debate in recent years. As technology continues to advance at a rapid pace, the impact of AI on society has become increasingly apparent.

First, AI has transformed the way we work. Many jobs that were once done by humans are now automated, leading to increased efficiency but also raising concerns about unemployment. However, new jobs have also been created in the tech sector, requiring different skills and expertise.

Furthermore, AI has changed how we access information and interact with technology. Voice assistants, recommendation algorithms, and personalized content have become commonplace, making our lives more convenient but also raising questions about privacy and data security.

Additionally, the development of autonomous vehicles and advanced medical diagnostic tools demonstrates the potential benefits of AI in saving lives and improving public health. These technologies can reduce human error and provide services in areas where human experts are scarce.

On the other hand, there are legitimate concerns about the ethical implications of AI. Bias in algorithms, the potential for surveillance, and questions about accountability when AI systems make mistakes are all important issues that need to be addressed.

In conclusion, while artificial intelligence offers tremendous potential benefits for society, it also presents significant challenges that require careful consideration and thoughtful regulation. Balancing innovation with ethical concerns will be crucial as we continue to develop and deploy AI technologies.`
    
    setSubmission(mockSubmission)
  }, [params.id])
  
  if (!submission) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading submission...</p>
      </div>
    )
  }
  
  return (
    <WritingFeedbackView 
      promptId={params.id as string}
      submission={submission}
    />
  )
} 