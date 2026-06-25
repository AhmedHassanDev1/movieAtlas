import { GenreType } from "../types";


export const discoverGenres = async (page = 1, limit = 20): Promise<{ data: GenreType[] } | undefined> => {
   const url = new URL("/api/discover/genres", process.env.API_URL)
   url.searchParams.append("limit", String(limit))
   url.searchParams.append("page", String(page))
   try {
      const res = await fetch(url.href, {
         cache: "force-cache"
      })
      const data = await res.json()
      return data
   } catch (error) {

   }

}



export const getGenreById = async (
   genreId: string
): Promise<GenreType | null> => {
 
  
   const url = `${process.env.API_URL}/interests/genre/${genreId}`;

   const res = await fetch(url, {
     next: { revalidate: 3600 }
   });
  const data=await res.json()
 
  
   if (res.status === 404) {
      return null;
   }

   if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
   }
 
   return data
};


