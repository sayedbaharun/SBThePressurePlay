// TikTok API Integration using TikAPI.io
// API Documentation: https://tikapi.io/documentation

const TIKAPI_BASE_URL = "https://api.tikapi.io";
const TIKAPI_KEY = process.env.TIKAPI_KEY || "tp_722e9d6c7d28483fa2ccdeb46c2b7785";

export interface TikTokVideo {
  id: string;
  desc: string;
  createTime: number;
  video: {
    cover: string;
    playAddr: string;
    downloadAddr: string;
    duration: number;
  };
  author: {
    uniqueId: string;
    nickname: string;
    avatarThumb: string;
  };
  stats: {
    diggCount: number;
    shareCount: number;
    commentCount: number;
    playCount: number;
  };
  webVideoUrl?: string;
}

export interface TikTokProfile {
  user: {
    id: string;
    uniqueId: string;
    nickname: string;
    avatarLarger: string;
    signature: string;
    verified: boolean;
    followerCount: number;
    followingCount: number;
    heartCount: number;
    videoCount: number;
  };
}

interface TikAPIResponse<T> {
  status: string;
  message?: string;
  data?: T;
}

async function tikApiRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
  try {
    const url = new URL(`${TIKAPI_BASE_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-API-KEY": TIKAPI_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`TikAPI Error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("TikAPI Request Error:", error);
    return null;
  }
}

// Get user profile information
export async function getTikTokProfile(username: string): Promise<TikTokProfile | null> {
  const response = await tikApiRequest<any>("/public/check", { username });

  if (!response || response.status === "error") {
    return null;
  }

  return response;
}

// Get user's videos/posts
export async function getTikTokVideos(username: string, count: number = 10): Promise<TikTokVideo[]> {
  const response = await tikApiRequest<any>("/public/posts", {
    secUid: username,
    count: count.toString()
  });

  if (!response || !response.itemList) {
    // Return mock data for development/demo
    return getMockTikTokVideos();
  }

  return response.itemList.map((item: any) => ({
    id: item.id,
    desc: item.desc,
    createTime: item.createTime,
    video: {
      cover: item.video?.cover || "",
      playAddr: item.video?.playAddr || "",
      downloadAddr: item.video?.downloadAddr || "",
      duration: item.video?.duration || 0,
    },
    author: {
      uniqueId: item.author?.uniqueId || username,
      nickname: item.author?.nickname || "The Pressure Play",
      avatarThumb: item.author?.avatarThumb || "",
    },
    stats: {
      diggCount: item.stats?.diggCount || 0,
      shareCount: item.stats?.shareCount || 0,
      commentCount: item.stats?.commentCount || 0,
      playCount: item.stats?.playCount || 0,
    },
    webVideoUrl: `https://www.tiktok.com/@${item.author?.uniqueId || username}/video/${item.id}`,
  }));
}

// Get trending videos by hashtag
export async function getTikTokByHashtag(hashtag: string, count: number = 10): Promise<TikTokVideo[]> {
  const response = await tikApiRequest<any>("/public/hashtag", {
    name: hashtag,
    count: count.toString()
  });

  if (!response || !response.itemList) {
    return [];
  }

  return response.itemList.map((item: any) => ({
    id: item.id,
    desc: item.desc,
    createTime: item.createTime,
    video: {
      cover: item.video?.cover || "",
      playAddr: item.video?.playAddr || "",
      downloadAddr: item.video?.downloadAddr || "",
      duration: item.video?.duration || 0,
    },
    author: {
      uniqueId: item.author?.uniqueId || "",
      nickname: item.author?.nickname || "",
      avatarThumb: item.author?.avatarThumb || "",
    },
    stats: {
      diggCount: item.stats?.diggCount || 0,
      shareCount: item.stats?.shareCount || 0,
      commentCount: item.stats?.commentCount || 0,
      playCount: item.stats?.playCount || 0,
    },
    webVideoUrl: `https://www.tiktok.com/@${item.author?.uniqueId}/video/${item.id}`,
  }));
}

// Mock data for development/demo purposes
function getMockTikTokVideos(): TikTokVideo[] {
  return [
    {
      id: "1",
      desc: "Championship mindset secrets from the locker room 🏆 #pressureplay #motivation",
      createTime: Date.now() / 1000 - 86400,
      video: {
        cover: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
        playAddr: "",
        downloadAddr: "",
        duration: 45,
      },
      author: {
        uniqueId: "thepressureplay",
        nickname: "The Pressure Play",
        avatarThumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      },
      stats: {
        diggCount: 125000,
        shareCount: 8500,
        commentCount: 3200,
        playCount: 2500000,
      },
      webVideoUrl: "https://www.tiktok.com/@thepressureplay",
    },
    {
      id: "2",
      desc: "What Patrice Evra taught me about handling pressure in business 💼⚽",
      createTime: Date.now() / 1000 - 172800,
      video: {
        cover: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400",
        playAddr: "",
        downloadAddr: "",
        duration: 60,
      },
      author: {
        uniqueId: "thepressureplay",
        nickname: "The Pressure Play",
        avatarThumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      },
      stats: {
        diggCount: 89000,
        shareCount: 5200,
        commentCount: 1800,
        playCount: 1800000,
      },
      webVideoUrl: "https://www.tiktok.com/@thepressureplay",
    },
    {
      id: "3",
      desc: "3 lessons from elite athletes that changed my business game 📈 #success",
      createTime: Date.now() / 1000 - 259200,
      video: {
        cover: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400",
        playAddr: "",
        downloadAddr: "",
        duration: 35,
      },
      author: {
        uniqueId: "thepressureplay",
        nickname: "The Pressure Play",
        avatarThumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      },
      stats: {
        diggCount: 156000,
        shareCount: 12000,
        commentCount: 4500,
        playCount: 3200000,
      },
      webVideoUrl: "https://www.tiktok.com/@thepressureplay",
    },
    {
      id: "4",
      desc: "The morning routine that champions swear by ☀️🏆 #morningroutine #champion",
      createTime: Date.now() / 1000 - 345600,
      video: {
        cover: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
        playAddr: "",
        downloadAddr: "",
        duration: 55,
      },
      author: {
        uniqueId: "thepressureplay",
        nickname: "The Pressure Play",
        avatarThumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      },
      stats: {
        diggCount: 98000,
        shareCount: 7800,
        commentCount: 2100,
        playCount: 2100000,
      },
      webVideoUrl: "https://www.tiktok.com/@thepressureplay",
    },
  ];
}

// Format numbers for display (e.g., 1500000 -> "1.5M")
export function formatTikTokCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return count.toString();
}
