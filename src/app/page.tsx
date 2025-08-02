"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { Post, PlantType } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import PostViewer from '@/components/post-viewer';
import PostEditor from '@/components/post-editor';
import GardenControls from '@/components/garden-controls';
import { FlowerIcon, TreeIcon, VineIcon, BonsaiIcon, WildflowerIcon, MushroomIcon } from '@/components/plant-icons';
import { setGardenAmbiance } from '@/ai/flows/set-garden-ambiance';
import { useToast } from "@/hooks/use-toast";
import * as Tone from 'tone';
import Header from '@/components/header';

const initialPosts: Post[] = [
  { id: 1, title: "First Sprout", content: "This is the first entry in my digital garden. A small idea, a seed of thought, planted and waiting to grow. The journey begins with a single step, or in this case, a single word.", type: 'flower', position: { x: 20, y: 30 }, growth: 0.4 },
  { id: 2, title: "A Sturdy Thought", content: "Some ideas are like trees, they take time to root and develop. This is one such thought, a long-form piece on the nature of creativity and the slow, deliberate process of building something meaningful. This can be a long text to check the reading time functionality. The average reading speed is about 200 to 250 words per minute. So a text of about 400 words should take about 2 minutes to read. I will keep writing to make sure the text is long enough for testing purposes. More words, more words, more words. The more words the better the test. This is getting a bit repetitive, but it's for a good cause. We are building a beautiful and mindful application here. And that requires some dedication and some long texts for testing. I think this should be enough now.", type: 'tree', position: { x: 70, y: 65 }, growth: 0.6 },
  { id: 3, title: "Winding Paths", content: "A short story, a narrative that twists and turns. It doesn't follow a straight line, but meanders through different perspectives, much like a vine finding its way.", type: 'vine', position: { x: 45, y: 50 }, growth: 0.8 },
  { id: 4, title: "Bonsai: Focus", content: "Clarity comes not from more, but from less. Pruning the unnecessary reveals the essential. This is the art of focus, a tiny essay on a single, powerful idea.", type: 'bonsai', position: { x: 80, y: 20 }, growth: 0.5 },
  { id: 5, title: "Wildflower: Link to an inspiring article", content: "I found this wonderful piece on regenerative design. A quick thought: it mirrors how we should cultivate our own ideas—sustainably and with care. [Link here]", type: 'wildflower', position: { x: 15, y: 70 }, growth: 0.3 },
  { id: 6, title: "Mushroom: A Moment to Breathe", content: "Let's take a pause. Inhale for four counts, hold for four, exhale for six. Repeat three times. Notice the stillness. This is a small exercise in mindfulness.", type: 'mushroom', position: { x: 55, y: 15 }, growth: 0.7 },
];

const getThemeFromAmbiance = (description: string): string => {
  const lowerCaseDesc = description.toLowerCase();
  if (lowerCaseDesc.includes('misty') || lowerCaseDesc.includes('moonlit') || lowerCaseDesc.includes('somber') || lowerCaseDesc.includes('rain')) {
    return 'theme-misty';
  }
  if (lowerCaseDesc.includes('sunlit') || lowerCaseDesc.includes('meadow') || lowerCaseDesc.includes('uplifting')) {
    return 'theme-sunlit';
  }
  return 'theme-sunlit'; // Default to sunlit
};

export type SoundType = 'wind' | 'rain' | 'pad';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [compostingPostId, setCompostingPostId] = useState<number | null>(null);
  const [soundType, setSoundType] = useState<SoundType>('wind');
  const [draggingPostId, setDraggingPostId] = useState<number | null>(null);
  const [hasDragged, setHasDragged] = useState(false);

  const gardenRef = useRef<HTMLElement>(null);

  const [ambiance, setAmbiance] = useState<string | null>(null);
  const [ambianceLoading, setAmbianceLoading] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const { toast } = useToast();
  
  const audioInitialized = useRef(false);
  const windSynth = useRef<Tone.NoiseSynth | null>(null);
  const windFilter = useRef<Tone.AutoFilter | null>(null);
  const rainSynth = useRef<Tone.NoiseSynth | null>(null);
  const padSynth = useRef<Tone.PolySynth | null>(null);
  const padSequence = useRef<Tone.Sequence | null>(null);

  const theme = useMemo(() => getThemeFromAmbiance(ambiance || ''), [ambiance]);

  const stopAllAudio = useCallback(() => {
    if (windSynth.current) {
        windSynth.current.triggerRelease();
        setTimeout(() => {
            windSynth.current?.dispose();
            windFilter.current?.dispose();
            windSynth.current = null;
            windFilter.current = null;
        }, 500);
    }
    if (rainSynth.current) {
      rainSynth.current.triggerRelease();
      setTimeout(() => {
        rainSynth.current?.dispose();
        rainSynth.current = null;
      }, 500);
    }
    if (padSynth.current) {
        padSynth.current.releaseAll();
        setTimeout(() => {
            padSynth.current?.dispose();
            padSynth.current = null;
        }, 500);
    }
    if (padSequence.current) {
        padSequence.current.stop(0);
        padSequence.current.clear();
        padSequence.current.dispose();
        padSequence.current = null;
    }
    Tone.Transport.stop();
    Tone.Transport.cancel();
  }, []);

  const setupAudio = useCallback(async () => {
    if (!audioInitialized.current) {
        await Tone.start();
        audioInitialized.current = true;
    }
    
    stopAllAudio();

    if (!isSoundOn) return;

    if (soundType === 'wind') {
      windSynth.current = new Tone.NoiseSynth({ noise: { type: 'pink' }, volume: -20, envelope: { attack: 0.5, decay: 0.1, sustain: 0.3, release: 0.5 } }).toDestination();
      windFilter.current = new Tone.AutoFilter("4n").toDestination().start();
      windSynth.current.connect(windFilter.current);

      if (theme === 'theme-misty') {
        windFilter.current.baseFrequency = 200;
        windFilter.current.depth.value = 0.3;
      } else { // sunlit
        windFilter.current.baseFrequency = 800;
        windFilter.current.depth.value = 0.6;
      }
      windSynth.current.triggerAttack();

    } else if (soundType === 'rain') {
        rainSynth.current = new Tone.NoiseSynth({
          noise: { type: "brown" },
          volume: -12,
          envelope: { attack: 0.005, decay: 0.1, sustain: 1 }
        }).toDestination();
        rainSynth.current.triggerAttack();
    } else if (soundType === 'pad') {
        padSynth.current = new Tone.PolySynth(Tone.FMSynth, {
            volume: -18,
            envelope: {
                attack: 1.5,
                decay: 0.5,
                sustain: 0.5,
                release: 4,
            },
            harmonicity: 1.01,
            modulationIndex: 1.5,
        }).toDestination();

        const chords = [
            { time: "0:0", notes: ["C3", "G3", "E4"] },
            { time: "0:2", notes: ["G3", "B3", "D4"] },
            { time: "1:0", notes: ["A3", "C4", "E4"] },
            { time: "1:2", notes: ["F3", "A3", "C4"] },
        ];
        
        padSequence.current = new Tone.Sequence((time, { notes }) => {
            padSynth.current?.triggerAttackRelease(notes, "2m", time);
        }, chords, "1m").start(0);

        Tone.Transport.bpm.value = 40;
        Tone.Transport.start();
    }
  }, [soundType, theme, stopAllAudio, isSoundOn]);

  useEffect(() => {
    setupAudio();

    return () => {
      stopAllAudio();
    };
  }, [isSoundOn, soundType, theme, setupAudio, stopAllAudio]);


  const handleUpdateAmbiance = useCallback(async (content: string) => {
    setAmbianceLoading(true);
    try {
      const result = await setGardenAmbiance({ latestPostContent: content });
      setAmbiance(result.ambianceDescription);
    } catch (error) {
      console.error("Failed to set ambiance:", error);
       toast({
        title: "AI Error",
        description: "Could not update ambiance.",
        variant: "destructive"
      });
      setAmbiance("The garden is peaceful and still, bathed in the gentle warmth of a sunlit meadow.");
    } finally {
      setAmbianceLoading(false);
    }
  }, [toast]);
  
  useEffect(() => {
    // Set initial ambiance
    const lastPost = posts[posts.length - 1];
    if (lastPost) {
        handleUpdateAmbiance(lastPost.content);
    } else {
        setAmbiance("The garden is quiet. Plant a new seed to begin.");
        setAmbianceLoading(false);
    }
  }, []);


  const handleSavePost = (data: { title: string; content: string }) => {
    if (editingPost) {
      const updatedPosts = posts.map(p => p.id === editingPost.id ? { ...p, ...data } : p);
      setPosts(updatedPosts);
      handleUpdateAmbiance(data.content);
    } else {
      const plantTypes: PlantType[] = ['flower', 'tree', 'vine', 'bonsai', 'wildflower', 'mushroom'];
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
  
  const handleToggleSound = useCallback(() => {
      const turnOn = !isSoundOn;
      setIsSoundOn(turnOn);
      if (turnOn && !audioInitialized.current) {
          Tone.start().then(() => {
              audioInitialized.current = true;
          });
      }
  }, [isSoundOn]);
  
  const handleDragStart = (postId: number, event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    setDraggingPostId(postId);
    setHasDragged(false);
  };

  const handleDragMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (draggingPostId === null || !gardenRef.current) return;

    setHasDragged(true);
    const gardenRect = gardenRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    let x = ((clientX - gardenRect.left) / gardenRect.width) * 100;
    let y = ((clientY - gardenRect.top) / gardenRect.height) * 100;

    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));

    setPosts(prevPosts => prevPosts.map(p => p.id === draggingPostId ? { ...p, position: { x, y } } : p));
  }, [draggingPostId]);

  const handleDragEnd = useCallback(() => {
    if (draggingPostId !== null && !hasDragged) {
      const post = posts.find(p => p.id === draggingPostId);
      if (post) {
        setSelectedPost(post);
      }
    }
    setDraggingPostId(null);
    setHasDragged(false);
  }, [draggingPostId, hasDragged, posts]);

  useEffect(() => {
    const moveHandler = (event: MouseEvent | TouchEvent) => handleDragMove(event);
    const endHandler = () => handleDragEnd();

    if (draggingPostId !== null) {
      document.addEventListener('mousemove', moveHandler);
      document.addEventListener('touchmove', moveHandler);
      document.addEventListener('mouseup', endHandler);
      document.addEventListener('touchend', endHandler);
    }

    return () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('touchmove', moveHandler);
      document.removeEventListener('mouseup', endHandler);
      document.removeEventListener('touchend', endHandler);
    };
  }, [draggingPostId, handleDragMove, handleDragEnd]);


  const renderPlant = (post: Post) => {
    const PlantComponent = {
      flower: FlowerIcon,
      tree: TreeIcon,
      vine: VineIcon,
      bonsai: BonsaiIcon,
      wildflower: WildflowerIcon,
      mushroom: MushroomIcon,
    }[post.type];

    const isComposting = post.id === compostingPostId;
    const isDragging = post.id === draggingPostId;

    return (
      <div
        key={post.id}
        className={`plant-icon-wrapper group/plant absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-300 ${isComposting ? 'plant-composting' : ''} ${isDragging ? 'cursor-grabbing scale-110' : 'cursor-grab'}`}
        style={{ left: `${post.position.x}%`, top: `${post.position.y}%` }}
        onMouseDown={(e) => !isComposting && handleDragStart(post.id, e)}
        onTouchStart={(e) => !isComposting && handleDragStart(post.id, e)}
        onKeyDown={(e) => e.key === 'Enter' && !isComposting && setSelectedPost(post)}
        role="button"
        tabIndex={0}
        aria-label={`Open post: ${post.title}`}
      >
        <PlantComponent growth={post.growth} />
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-background/70 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover/plant:opacity-100 transition-opacity">
          {post.title}
        </span>
      </div>
    );
  };

  return (
    <div className={`garden-container min-h-screen w-full font-body ${theme}`}>
      <Header />
      
      <main ref={gardenRef} className="relative w-full h-screen overflow-hidden group">
        {posts.map(renderPlant)}
      </main>

      <Card className="fixed bottom-4 right-4 z-20 bg-background/80 backdrop-blur-sm max-w-xs">
        <CardContent className="p-4">
          <p className="text-sm font-semibold mb-2">Current Ambiance</p>
          {ambianceLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ) : (
            <p className="text-xs text-foreground/80">{ambiance}</p>
          )}
        </CardContent>
      </Card>

      <GardenControls
        onPlantNew={() => setIsCreatingNew(true)}
        isSoundOn={isSoundOn}
        onToggleSound={handleToggleSound}
        soundType={soundType}
        onSoundTypeChange={(newSound) => {
          setSoundType(newSound as SoundType);
        }}
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
