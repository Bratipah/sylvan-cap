"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Menu, X, Leaf } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">SylvanCap</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#tokenization" className="text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#technology" className="text-foreground hover:text-primary transition-colors">
              Technology
            </a>
            <a href="#impact" className="text-foreground hover:text-primary transition-colors">
              Impact
            </a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">
              FAQ
            </a>
            <div className="mr-2">
              <ConnectButton accountStatus={{ smallScreen: "avatar", largeScreen: "full" }} chainStatus="icon" showBalance={false} />
            </div>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <a href="#tokenization" className="block px-3 py-2 text-foreground hover:text-primary">
                How It Works
              </a>
              <a href="#technology" className="block px-3 py-2 text-foreground hover:text-primary">
                Technology
              </a>
              <a href="#impact" className="block px-3 py-2 text-foreground hover:text-primary">
                Impact
              </a>
              <a href="#faq" className="block px-3 py-2 text-foreground hover:text-primary">
                FAQ
              </a>
              <div className="px-3 py-2 space-y-2">
                <ConnectButton accountStatus={{ smallScreen: "avatar", largeScreen: "address" }} chainStatus="icon" showBalance={false} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
