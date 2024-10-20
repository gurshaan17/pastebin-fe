"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toast, ToastProvider, ToastViewport, ToastDescription, ToastTitle } from "@/components/ui/toast"
import { BriefcaseBusiness, Github, Mail } from "lucide-react"

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default function PastePage({ params }: { params: { id: string } }) {
  const id = params.id;
  const router = useRouter();
  const [pasteContent, setPasteContent] = useState("")
  const [showErrorToast, setShowErrorToast] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchPasteContent = async () => {
      const timeout = setTimeout(() => {
        setShowErrorToast(true)
        router.push("/") // Redirect to the main page
      }, 5000) // 5 seconds timeout

      try {
        const response = await axios.get(`${apiUrl}/get/${id}`)
        clearTimeout(timeout) // Clear the timeout if the request completes in time
        setPasteContent(response.data.data.content)
      } catch (error) {
        clearTimeout(timeout)
        console.error("Error fetching paste content:", error)
        setShowErrorToast(true)
        router.push("/") // Redirect to the main page
      }
    }

    fetchPasteContent()
  }, [id, router])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Quick Paste</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Paste Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pasteContent ? (
                <p className="whitespace-pre-wrap">{pasteContent}</p>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </CardContent>
          
        </Card>
        
      </main>

      

      <ToastProvider>
        {showErrorToast && (
          <Toast variant="destructive" onOpenChange={(open) => setShowErrorToast(open)}>
            <ToastTitle className="text-md">Error</ToastTitle>
            <ToastDescription>Paste doesn't exist or took too long to load</ToastDescription>
          </Toast>
        )}
        <ToastViewport />
      </ToastProvider>
    </div>
  )
}
