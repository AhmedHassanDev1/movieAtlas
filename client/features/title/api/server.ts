import { TitleDetails, ViewType } from "../types/title";

export async function getTitleView(id: string): Promise<ViewType | null> {
    const res = await fetch(
        `${process.env.API_URL}/title/${id}/view`,
        { next: { revalidate: 3600 } }
    );

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }

    return res.json();
}


export async function getTitle(id: string): Promise<TitleDetails | null> {
    const res = await fetch(
        `${process.env.API_URL}/title/${id}`,
        { cache: "no-store" }
    );

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }

    return res.json();
}



export async function getTitleSimilars(id: string): Promise<TitleDetails[] | null> {
    const res = await fetch(
        `${process.env.API_URL}/title/${id}/similar`,
        { cache: "no-store" }
    );

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }

    return res.json();
}