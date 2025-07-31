"use client";

import { useEffect, useCallback } from 'react';
import type { Post } from '@/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Scissors, Recycle, X } from 'lucide-react';
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

export default function PostViewer({ post, onClose, onUpdateGrowth, onEdit, onCompost }: PostViewerProps) {
  
  useEffect(() => {
    if (post && post.growth < 1) {
      const timer = setInterval(() => {
        onUpdateGrowth(post.id, post.growth + 0.05);
      }, 2000); // Grow every 2 seconds

      return () => clearInterval(timer);
    }
  }, [post, onUpdateGrowth]);

  if (!post) {
    return null;
  }

  return (
    <Sheet open={!!post} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="flex flex-col sm:max-w-xl bg-card">
        <SheetHeader className="pr-12">
          <SheetTitle className="text-3xl font-headline">{post.title}</SheetTitle>
          <SheetDescription>
            A {post.type} in your garden. Reading this helps it grow.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <ScrollArea className="flex-grow my-4">
          <div className="prose prose-lg dark:prose-invert whitespace-pre-wrap p-1 font-body text-base leading-relaxed">
            {post.content}
          </div>
        </ScrollArea>
        <Separator />
        <SheetFooter className="mt-4 flex flex-row justify-between sm:justify-between items-center w-full">
           <div className="flex gap-2">
             <Button variant="outline" onClick={() => onEdit(post)}>
              <Scissors className="mr-2 h-4 w-4" /> Prune
            </Button>
             <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
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
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
