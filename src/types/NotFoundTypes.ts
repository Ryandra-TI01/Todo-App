import React from "react"

export interface GlitchTextProps {
    characters?: string[]
    interval?: number
    glitchDuration?: number
}

export interface HelpItemType {
    icon: React.ReactNode
    title: string
    description: string
    gradient: string
}