"use client";

import { useEffect, useCallback, useState, useRef } from 'react';
import type { Post } from '@/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Scissors, Recycle, X, Clock } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface PostViewerProps {
  post: Post | null;
  onClose: () => void;
  onUpdateGrowth: (postId: number, newGrowth: number) => void;
  onEdit: (post: Post) => void;
  onCompost: (postId: number) => void;
}

const getReadingTime = (content: string) => {
  const wordsPerMinute = 225;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
};


export default function PostViewer({ post, onClose, onUpdateGrowth, onEdit, onCompost }: PostViewerProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (post && post.growth < 1) {
      const timer = setInterval(() => {
        onUpdateGrowth(post.id, post.growth + 0.05);
      }, 2000); // Grow every 2 seconds

      return () => clearInterval(timer);
    }
  }, [post, onUpdateGrowth]);
  
  const handleScroll = useCallback(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        setReadingProgress((scrollTop / totalScroll) * 100);
      } else {
        setReadingProgress(100);
      }
    }
  }, []);

  useEffect(() => {
    setReadingProgress(0);
    const scrollContainer = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
    if(scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [post, handleScroll]);


  if (!post) {
    return null;
  }

  const readingTime = getReadingTime(post.content);

  return (
    <Sheet open={!!post} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="flex flex-col sm:max-w-xl bg-card">
        <SheetHeader className="pr-12">
          <SheetTitle className="text-3xl font-headline">{post.title}</SheetTitle>
          <SheetDescription className="flex items-center gap-4 text-sm">
             <span>A {post.type} in your garden. Reading this helps it grow.</span>
            <Badge variant="secondary" className="gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} min read
            </Badge>
          </SheetDescription>
        </SheetHeader>
        <div className="relative">
          <Progress value={readingProgress} className="absolute -top-1 left-0 w-full h-1" />
          <Separator />
        </div>
        <ScrollArea className="flex-grow my-4" ref={scrollAreaRef}>
          <div className="prose dark:prose-invert prose-base lg:prose-lg whitespace-pre-wrap p-1 font-body leading-relaxed">
            {post.content}
          </div>
        </ScrollArea>
        <Separator />
        <SheetFooter className="mt-4 flex flex-row justify-between sm:justify-between items-center w-full">
           <div className="flex gap-2">
             <Button variant="outline" onClick={() => onEdit(post)} aria-label="Edit post">
              <Scissors className="mr-2 h-4 w-4" /> Prune
            </Button>
             <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" aria-label="Compost post">
                  <Recycle className="mr-2 h-4 w-4" /> Compost
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently compost this post. It will gently fade away to enrich the soil for new ideas.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onCompost(post.id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
           </div>
           <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close post viewer">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
