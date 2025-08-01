"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Leaf } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 inline-block">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">Get in Touch</CardTitle>
          <CardDescription className="text-muted-foreground">
            Have a question or a thought to share? We'd love to hear from you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === "sent" ? (
            <div className="text-center p-8 bg-card rounded-lg flex flex-col items-center gap-4">
               <div className="mx-auto bg-primary/10 p-4 rounded-full inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold font-headline text-primary">Thank You!</h3>
              <p className="text-card-foreground/80 mt-2 max-w-sm">Your message has been sent. We’ll get back to you soon and appreciate you reaching out.</p>
               <Button onClick={() => setStatus("idle")} variant="outline">Send another message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required placeholder="Your name" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="you@email.com" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" rows={5} required placeholder="Let your thoughts sprout..." />
              </div>
              {status === "error" && (
                <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
              )}
              <Button type="submit" disabled={status === "sending"} className="w-full">
                {status === "sending" ? "Sending…" : "Send Message"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
