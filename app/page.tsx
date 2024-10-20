"use client"

import axios from "axios"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Toast, ToastProvider, ToastViewport, ToastDescription, ToastTitle } from "@/components/ui/toast"
const apiUrl = process.env.NEXT_PUBLIC_API_URL 
const feUrl = process.env.NEXT_PUBLIC_FE_URL

export default function QuickPaste() {
  const [pasteContent, setPasteContent] = useState("")
  const [pasteUrl, setPasteUrl] = useState("")
  const [showErrorToast, setShowErrorToast] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [showCopyToast, setShowCopyToast] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (pasteContent.trim() === "") {
      setShowErrorToast(true)
      return
    }


    try {
      const response = await axios.post(`${apiUrl}/new`,{
        content: pasteContent
      })
      setPasteUrl(`${feUrl}/${response.data.data.id}`)
      setShowSuccessToast(true)
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pasteUrl)
    setShowCopyToast(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">QuickPaste</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Create a new paste</CardTitle>
            <CardDescription>
              Enter your text below and click 'Create Paste' to get a shareable link.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paste-content">Paste Content</Label>
                  <Textarea
                    id="paste-content"
                    placeholder="Enter your text here..."
                    value={pasteContent}
                    onChange={(e) => setPasteContent(e.target.value)}
                    rows={10}
                  />
                </div>
                {pasteUrl && (
                  <div className="space-y-2">
                    <Label htmlFor="paste-url">Paste URL</Label>
                    <div className="flex space-x-2">
                      <Input id="paste-url" value={pasteUrl} readOnly />
                      <Button type="button" onClick={copyToClipboard}>
                        Copy
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Create Paste</Button>
            </CardFooter>
          </form>
        </Card>
      </main>

      <footer className="bg-white shadow-sm mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2023 QuickPaste. All rights reserved.
          </p>
        </div>
      </footer>

      <ToastProvider>
        {showErrorToast && (
          <Toast variant="destructive" onOpenChange={(open) => setShowErrorToast(open)}>
            <ToastTitle className="text-md">Error</ToastTitle>
            <ToastDescription>Paste content can't be empty</ToastDescription>
          </Toast>
        )}

        {showSuccessToast && (
          <Toast variant="default" onOpenChange={(open) => setShowSuccessToast(open)}>
            <ToastTitle className="text-md">Success</ToastTitle>
            <ToastDescription>Your paste has been created!</ToastDescription>
          </Toast>
        )}

        {showCopyToast && (
          <Toast variant="default" onOpenChange={(open) => setShowCopyToast(open)}>
            <ToastTitle className="text-md">Copied</ToastTitle>
            <ToastDescription>URL copied to clipboard</ToastDescription>
          </Toast>
        )}

        <ToastViewport />
      </ToastProvider>
    </div>
  )
}