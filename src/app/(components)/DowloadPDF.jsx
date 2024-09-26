'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"


export const DowloadPDF = ({ url, fileName = "cv.pdf" }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleDownload = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(url)
            if (!response.ok) throw new Error('No se pudo descargar el archivo')

            const blob = await response.blob()
            const downloadUrl = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = fileName
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(downloadUrl)
        } catch (error) {
            console.error('Error al descargar el archivo:', error)
            alert('Hubo un error al descargar el archivo. Por favor, inténtalo de nuevo.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            onClick={handleDownload}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
            <FileDown className="w-4 h-4" />
            <span>{isLoading ? 'Descargando...' : 'Descargar PDF'}</span>
        </Button>
    )
}