

export const genImageUrl = (url: string | null, type: "avatar" | "poster" | "backdrop" | "person"|"small-poster") => {
    switch (type) {
        case "avatar":
            return url ? process.env.NEXT_PUBLIC_AVATAR_URL + url : null;
        case "poster":
            return url ? process.env.NEXT_PUBLIC_POSTER_URL + url : null;
        case "person":
            return url ? process.env.NEXT_PUBLIC_PERSON_URL + url : null;
        case "small-poster":
            return url ? process.env.NEXT_PUBLIC_SMALL_POSTER_URL + url : null;

        case "backdrop":
            return url ? process.env.NEXT_PUBLIC_BACKDROP_URL + url : null;

    }

}

export const getYouTubeEmbed = (key: string) =>
  `https://www.youtube.com/embed/${key}`;


export function getYoutubeThumbnail(url: string, quality: "max" | "hq" | "mq" = "max") {

    const videoId = new URL(url).searchParams.get("v");

    if (!videoId) return null;

    const map = {
        max: "maxresdefault.jpg",
        hq: "hqdefault.jpg",
        mq: "mqdefault.jpg",
    };

    return `https://img.youtube.com/vi/${videoId}/${map[quality]}`;
}


export function getYoutubeFrame(
  url: string,
  
) {
  const videoId = new URL(url).searchParams.get("v");

  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
}

