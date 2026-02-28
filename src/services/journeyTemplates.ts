export type JourneyStepType = 'breathwork' | 'music' | 'journal' | 'affirmation' | 'body-scan';

export interface JourneyStep {
  type: JourneyStepType;
  title: string;
  instruction: string;
  duration: number; // seconds
  videoId?: string;
  journalPrompt?: string;
  breathPattern?: { inhale: number; hold: number; exhale: number };
}

export interface GuidedJourney {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  duration: string;
  color: string;
  thumb: string;
  steps: JourneyStep[];
}

export const JOURNEYS: GuidedJourney[] = [
  {
    id: 'morning-energize',
    title: 'Morning Energize',
    subtitle: 'Wake up your mind and body',
    emoji: '🌅',
    duration: '12 min',
    color: '#f59e0b',
    thumb: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop',
    steps: [
      {
        type: 'breathwork',
        title: 'Energizing Breath',
        instruction: 'Quick, rhythmic breathing to help energize your morning',
        duration: 120,
        breathPattern: { inhale: 2, hold: 1, exhale: 2 },
      },
      {
        type: 'affirmation',
        title: 'Morning Intention',
        instruction: 'Repeat: "I am energized, focused, and ready for whatever today brings."',
        duration: 30,
      },
      {
        type: 'music',
        title: 'Upbeat Warm-Up',
        instruction: 'Let this beat lift your energy. Move your body if you can.',
        duration: 240,
        videoId: '5qap5aO4i9A',
      },
      {
        type: 'journal',
        title: 'Set Your Intention',
        instruction: 'Write down your focus for today',
        duration: 120,
        journalPrompt: "What's your #1 goal today? What energy do you want to carry?",
      },
      {
        type: 'music',
        title: 'Power Playlist',
        instruction: 'Your curated morning energy playlist starts now',
        duration: 180,
        videoId: 'DWcJFNfaw9c',
      },
    ],
  },
  {
    id: 'anger-release',
    title: 'Anger Release',
    subtitle: 'Transform rage into power',
    emoji: '⚡',
    duration: '15 min',
    color: '#ef4444',
    thumb: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop',
    steps: [
      {
        type: 'body-scan',
        title: 'Locate the Tension',
        instruction: 'Close your eyes. Scan from head to toe. Where does the anger live in your body?',
        duration: 90,
      },
      {
        type: 'breathwork',
        title: 'Lion\'s Breath',
        instruction: 'Deep inhale through nose, forceful exhale through mouth. Release the heat.',
        duration: 120,
        breathPattern: { inhale: 4, hold: 2, exhale: 6 },
      },
      {
        type: 'music',
        title: 'Controlled Burn',
        instruction: 'Heavy beats to match your energy. Let it flow through, not stay trapped.',
        duration: 240,
        videoId: 'DWcJFNfaw9c',
      },
      {
        type: 'journal',
        title: 'Name It to Tame It',
        instruction: 'Write freely about what triggered this',
        duration: 180,
        journalPrompt: 'What triggered this feeling? What boundary was crossed? What do you actually need?',
      },
      {
        type: 'breathwork',
        title: 'Cool Down',
        instruction: 'Slow, deep breaths. Feel the intensity soften with each exhale.',
        duration: 120,
        breathPattern: { inhale: 4, hold: 4, exhale: 8 },
      },
      {
        type: 'music',
        title: 'Resolve',
        instruction: 'Calmer beats now. You\'ve processed it. Strength remains, anger dissolves.',
        duration: 180,
        videoId: 'jfKfPfyJRdk',
      },
    ],
  },
  {
    id: 'sleep-wind-down',
    title: 'Sleep Wind-Down',
    subtitle: 'Prepare your mind for deep rest',
    emoji: '🌙',
    duration: '18 min',
    color: '#8b5cf6',
    thumb: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=300&fit=crop',
    steps: [
      {
        type: 'affirmation',
        title: 'Permission to Rest',
        instruction: '"I release today\'s worries. Tomorrow will take care of itself. Right now, I rest."',
        duration: 30,
      },
      {
        type: 'body-scan',
        title: 'Progressive Relaxation',
        instruction: 'Starting from your toes, consciously relax each muscle group upward.',
        duration: 180,
      },
      {
        type: 'breathwork',
        title: '4-7-8 Sleep Breath',
        instruction: 'A calming breath pattern to help ease into sleep',
        duration: 180,
        breathPattern: { inhale: 4, hold: 7, exhale: 8 },
      },
      {
        type: 'journal',
        title: 'Gratitude Close',
        instruction: 'End the day with gratitude',
        duration: 120,
        journalPrompt: 'Name 3 things from today you\'re grateful for, no matter how small.',
      },
      {
        type: 'music',
        title: 'Dream Drift',
        instruction: 'Let these sounds carry you into sleep. No need to stay awake.',
        duration: 600,
        videoId: '1ZYbU82GVz4',
      },
    ],
  },
  {
    id: 'anxiety-ground',
    title: 'Anxiety Grounding',
    subtitle: 'Come back to the present moment',
    emoji: '🌿',
    duration: '10 min',
    color: '#0ea5e9',
    thumb: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    steps: [
      {
        type: 'breathwork',
        title: 'Box Breathing',
        instruction: 'Equal parts inhale-hold-exhale-hold. A calming rhythm to help ease tension.',
        duration: 120,
        breathPattern: { inhale: 4, hold: 4, exhale: 4 },
      },
      {
        type: 'body-scan',
        title: '5-4-3-2-1 Grounding',
        instruction: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.',
        duration: 120,
      },
      {
        type: 'music',
        title: 'Safe Space Sounds',
        instruction: 'Gentle ambient music to hold you. Nothing to do, nowhere to be.',
        duration: 180,
        videoId: '6LuEK7FgecE',
      },
      {
        type: 'journal',
        title: 'Reality Check',
        instruction: 'Separate facts from fears',
        duration: 120,
        journalPrompt: 'What\'s the worry? Is it happening right now? What\'s one small thing you can control?',
      },
      {
        type: 'affirmation',
        title: 'Safety Anchor',
        instruction: '"I am safe in this moment. My body is here. My breath is here. I am okay."',
        duration: 30,
      },
    ],
  },
  {
    id: 'creative-flow',
    title: 'Creative Flow State',
    subtitle: 'Unlock your creative potential',
    emoji: '✨',
    duration: '14 min',
    color: '#d946ef',
    thumb: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
    steps: [
      {
        type: 'breathwork',
        title: 'Alternate Nostril',
        instruction: 'A focused breathing technique that may help enhance creative thinking.',
        duration: 120,
        breathPattern: { inhale: 4, hold: 2, exhale: 4 },
      },
      {
        type: 'music',
        title: 'Neural Activation',
        instruction: 'Ambient beats designed to help you focus and enter a creative state.',
        duration: 240,
        videoId: '5qap5aO4i9A',
      },
      {
        type: 'journal',
        title: 'Stream of Consciousness',
        instruction: 'Write without stopping or editing',
        duration: 180,
        journalPrompt: 'Write whatever comes to mind for 3 minutes. No judgment, no editing, just flow.',
      },
      {
        type: 'music',
        title: 'Deep Creative Session',
        instruction: 'You\'re in the zone now. Let the music fuel your creation.',
        duration: 300,
        videoId: 'jfKfPfyJRdk',
      },
    ],
  },
];
