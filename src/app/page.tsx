"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { Post, PlantType } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sprout } from 'lucide-react';
import PostViewer from '@/components/post-viewer';
import PostEditor from '@/components/post-editor';
import GardenControls from '@/components/garden-controls';
import { FlowerIcon, TreeIcon, VineIcon } from '@/components/plant-icons';
import { setGardenAmbiance } from '@/ai/flows/set-garden-ambiance';
import { useToast } from "@/hooks/use-toast";
import * as Tone from 'tone';

const initialPosts: Post[] = [
  { id: 1, title: "First Sprout", content: "This is the first entry in my digital garden. A small idea, a seed of thought, planted and waiting to grow. The journey begins with a single step, or in this case, a single word.", type: 'flower', position: { x: 20, y: 30 }, growth: 0.4 },
  { id: 2, title: "A Sturdy Thought", content: "Some ideas are like trees, they take time to root and develop. This is one such thought, a long-form piece on the nature of creativity and the slow, deliberate process of building something meaningful.", type: 'tree', position: { x: 70, y: 65 }, growth: 0.6 },
  { id: 3, title: "Winding Paths", content: "A short story, a narrative that twists and turns. It doesn't follow a straight line, but meanders through different perspectives, much like a vine finding its way.", type: 'vine', position: { x: 45, y: 50 }, growth: 0.8 },
];

const getThemeFromAmbiance = (description: string): string => {
  const lowerCaseDesc = description.toLowerCase();
  if (lowerCaseDesc.includes('misty') || lowerCaseDesc.includes('moonlit') || lowerCaseDesc.includes('somber')) {
    return 'theme-misty';
  }
  if (lowerCaseDesc.includes('sunlit') || lowerCaseDesc.includes('meadow') || lowerCaseDesc.includes('uplifting')) {
    return 'theme-sunlit';
  }
  return 'theme-sunlit'; // Default to sunlit
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [compostingPostId, setCompostingPostId] = useState<number | null>(null);

  const [ambiance, setAmbiance] = useState("A sunlit meadow, filled with the gentle hum of life. The air is warm and the sky is clear, inviting new ideas to blossom.");
  const [isSoundOn, setIsSoundOn] = useState(false);
  const { toast } = useToast();
  
  const synth = useRef<Tone.NoiseSynth | null>(null);
  const filter = useRef<Tone.AutoFilter | null>(null);
  const theme = useMemo(() => getThemeFromAmbiance(ambiance), [ambiance]);

  useEffect(() => {
    if (isSoundOn) {
      Tone.start();
      synth.current = new Tone.NoiseSynth({ noise: { type: 'pink' }, envelope: { attack: 0.5, decay: 0.1, sustain: 0.3, release: 0.5 } }).toDestination();
      filter.current = new Tone.AutoFilter("4n").toDestination().start();
      synth.current.connect(filter.current);

      if (theme === 'theme-misty') {
        filter.current.baseFrequency = 200;
        filter.current.depth.value = 0.3;
        synth.current.triggerAttack();
      } else { // sunlit
        filter.current.baseFrequency = 800;
        filter.current.depth.value = 0.6;
        synth.current.triggerAttack();
      }
    }

    return () => {
      if (synth.current) {
        synth.current.triggerRelease();
        setTimeout(() => {
          synth.current?.dispose();
          filter.current?.dispose();
        }, 500);
      }
    };
  }, [isSoundOn, theme]);

  const handleUpdateAmbiance = async (content: string) => {
    try {
      const result = await setGardenAmbiance({ latestPostContent: content });
      setAmbiance(result.ambianceDescription);
      toast({
        title: "Ambiance Updated",
        description: "The garden's mood has shifted.",
      });
    } catch (error) {
      console.error("Failed to set ambiance:", error);
       toast({
        title: "AI Error",
        description: "Could not update ambiance.",
        variant: "destructive"
      });
    }
  };

  const handleSavePost = (data: { title: string; content: string }) => {
    if (editingPost) {
      const updatedPosts = posts.map(p => p.id === editingPost.id ? { ...p, ...data } : p);
      setPosts(updatedPosts);
      handleUpdateAmbiance(data.content);
    } else {
      const plantTypes: PlantType[] = ['flower', 'tree', 'vine'];
      const newPost: Post = {
        id: Date.now(),
        ...data,
        type: plantTypes[Math.floor(Math.random() * plantTypes.length)],
        position: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
        growth: 0.2,
      };
      setPosts([...posts, newPost]);
      handleUpdateAmbiance(data.content);
    }
    setEditingPost(null);
    setIsCreatingNew(false);
  };

  const handleUpdateGrowth = useCallback((postId: number, newGrowth: number) => {
    setPosts(prevPosts =>
      prevPosts.map(p => p.id === postId ? { ...p, growth: Math.min(1, newGrowth) } : p)
    );
  }, []);

  const handleCompost = (postId: number) => {
    setCompostingPostId(postId);
    setSelectedPost(null);
    setTimeout(() => {
      setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
      setCompostingPostId(null);
    }, 1000); // Match animation duration
  };

  const renderPlant = (post: Post) => {
    const PlantComponent = {
      flower: FlowerIcon,
      tree: TreeIcon,
      vine: VineIcon,
    }[post.type];

    const isComposting = post.id === compostingPostId;

    return (
      <div
        key={post.id}
        className={`plant-icon-wrapper absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-300 ${isComposting ? 'plant-composting' : ''}`}
        style={{ left: `${post.position.x}%`, top: `${post.position.y}%` }}
        onClick={() => !isComposting && setSelectedPost(post)}
        onKeyDown={(e) => e.key === 'Enter' && !isComposting && setSelectedPost(post)}
        role="button"
        tabIndex={0}
        aria-label={`Open post: ${post.title}`}
      >
        <PlantComponent growth={post.growth} />
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-background/70 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {post.title}
        </span>
      </div>
    );
  };

  return (
    <div className={`garden-container min-h-screen w-full font-body ${theme}`}>
      <header className="absolute top-0 left-0 p-4 z-20">
        <h1 className="text-4xl font-headline font-bold">Verdant Scribe</h1>
      </header>
      
      <main className="relative w-full h-screen overflow-hidden group">
        {posts.map(renderPlant)}
      </main>

      <Card className="absolute bottom-4 right-4 z-20 bg-background/80 backdrop-blur-sm max-w-xs">
        <CardContent className="p-4">
          <p className="text-sm font-semibold mb-2">Current Ambiance</p>
          <p className="text-xs text-foreground/80">{ambiance}</p>
        </CardContent>
      </Card>

      <GardenControls
        onPlantNew={() => setIsCreatingNew(true)}
        isSoundOn={isSoundOn}
        onToggleSound={() => setIsSoundOn(!isSoundOn)}
      />

      <PostViewer
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onUpdateGrowth={handleUpdateGrowth}
        onEdit={(post) => {
          setSelectedPost(null);
          setEditingPost(post);
        }}
        onCompost={handleCompost}
      />

      <PostEditor
        isOpen={isCreatingNew || !!editingPost}
        onClose={() => {
          setIsCreatingNew(false);
          setEditingPost(null);
        }}
        onSave={handleSavePost}
        post={editingPost}
      />
    </div>
  );
}
