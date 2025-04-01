"use client"

import React, { useEffect, useRef, useState } from "react"
import { Bold, Italic, Underline, List, ListOrdered, Lightbulb, Heading1, Heading2, Heading3, Undo, Redo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export interface WritingEditorProps {
  content: string
  setContent: (content: string) => void
  isSubmitted?: boolean
  onAiAssist?: () => void
}

export const WritingEditor = ({
  content,
  setContent,
  isSubmitted = false,
  onAiAssist,
}: WritingEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [history, setHistory] = useState<string[]>([content])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)

  // Focus textarea when component mounts
  useEffect(() => {
    if (textareaRef.current && !isSubmitted) {
      textareaRef.current.focus()
    }
  }, [isSubmitted])

  // Track text selection
  const handleSelect = () => {
    if (textareaRef.current) {
      setSelectionStart(textareaRef.current.selectionStart)
      setSelectionEnd(textareaRef.current.selectionEnd)
    }
  }

  // Record history for undo/redo
  useEffect(() => {
    if (history[historyIndex] !== content) {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(content)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }, [content])

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setContent(history[historyIndex - 1])
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setContent(history[historyIndex + 1])
    }
  }

  // Apply formatting based on selection
  const applyFormatting = (formatter: (text: string) => string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart
      const end = textareaRef.current.selectionEnd
      const selectedText = content.substring(start, end)
      const formattedText = formatter(selectedText)
      
      const newContent = 
        content.substring(0, start) + 
        formattedText + 
        content.substring(end)
      
      setContent(newContent)
      
      // Focus back to textarea after formatting
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
          textareaRef.current.setSelectionRange(
            start, 
            start + formattedText.length
          )
        }
      }, 0)
    }
  }

  // Formatting functions
  const formatBold = (text: string) => `**${text}**`
  const formatItalic = (text: string) => `*${text}*`
  const formatUnderline = (text: string) => `__${text}__`
  const formatH1 = (text: string) => `# ${text}`
  const formatH2 = (text: string) => `## ${text}`
  const formatH3 = (text: string) => `### ${text}`
  const formatBulletList = (text: string) => 
    text.split('\n').map(line => `- ${line}`).join('\n')
  const formatNumberedList = (text: string) => 
    text.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n')

  // Handle AI assistance
  const handleAiAssist = () => {
    if (onAiAssist) {
      onAiAssist()
    }
  }

  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center space-x-1">
          <ToggleGroup type="multiple">
            <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => applyFormatting(formatBold)}>
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={() => applyFormatting(formatItalic)}>
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline" onClick={() => applyFormatting(formatUnderline)}>
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <Select onValueChange={(value) => {
            switch (value) {
              case "h1": applyFormatting(formatH1); break;
              case "h2": applyFormatting(formatH2); break;
              case "h3": applyFormatting(formatH3); break;
            }
          }}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Heading" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="h1">Heading 1</SelectItem>
              <SelectItem value="h2">Heading 2</SelectItem>
              <SelectItem value="h3">Heading 3</SelectItem>
            </SelectContent>
          </Select>
          
          <ToggleGroup type="multiple">
            <ToggleGroupItem value="bullet-list" aria-label="Toggle bullet list" onClick={() => applyFormatting(formatBulletList)}>
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="numbered-list" aria-label="Toggle numbered list" onClick={() => applyFormatting(formatNumberedList)}>
              <ListOrdered className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost"
            size="sm"
            disabled={historyIndex <= 0}
            onClick={handleUndo}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            disabled={historyIndex >= history.length - 1}
            onClick={handleRedo}
          >
            <Redo className="h-4 w-4" />
          </Button>
          
          {onAiAssist && (
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={handleAiAssist}
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              AI Assist
            </Button>
          )}
        </div>
      </div>
      
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onSelect={handleSelect}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isSubmitted}
        className="min-h-[300px] font-mono leading-relaxed resize-y"
        placeholder="Write your content here..."
      />
    </div>
  )
}